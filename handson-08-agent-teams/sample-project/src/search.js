/**
 * 検索モジュール
 * TaskTracker API — Agent Teams ハンズオン用サンプル
 *
 * 意図的な問題を含んでいます。Agent Teams で調査してください。
 */

const db = require('./db');

// 全文検索（重大なパフォーマンス問題）
async function globalSearch(req, res) {
  const { q, type, projectId } = req.query;

  if (!q || q.trim().length === 0) {
    return res.status(400).json({ error: 'Search query required' });
  }

  // 問題A: SQLインジェクション
  // 問題B: インデックスなしのLIKE検索。データ量が増えると極端に遅くなる
  // 問題C: 3つのテーブルを個別にフルスキャン
  const issues = await db.query(
    `SELECT 'issue' as type, id, title as text, created_at
     FROM issues
     WHERE title LIKE '%${q}%' OR description LIKE '%${q}%'
     ${projectId ? `AND project_id=${projectId}` : ''}`
  );

  const comments = await db.query(
    `SELECT 'comment' as type, id, content as text, created_at
     FROM comments
     WHERE content LIKE '%${q}%'`
  );

  const users = await db.query(
    `SELECT 'user' as type, id, username as text, created_at
     FROM users
     WHERE username LIKE '%${q}%' OR email LIKE '%${q}%'`
  );

  // 問題D: メモリ上で結合・ソート（大量データで OOM の可能性）
  const allResults = [
    ...issues.rows,
    ...comments.rows,
    ...users.rows
  ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  // 問題E: 結果件数の上限なし（数万件返す可能性）
  // typeフィルタを使っても全テーブルを先にスキャンしてからフィルタ
  const filtered = type ? allResults.filter(r => r.type === type) : allResults;

  res.json({
    query: q,
    count: filtered.length,
    results: filtered
  });
}

// Issue検索（サジェスト用・重い）
async function suggestIssues(req, res) {
  const { q, limit } = req.query;
  const maxLimit = parseInt(limit) || 10;

  // 問題F: limitの上限チェックなし（limit=999999 が通る）
  // 問題B継続: インデックスなしLIKE
  const result = await db.query(
    `SELECT id, title, status FROM issues
     WHERE title LIKE '%${q}%'
     LIMIT ${maxLimit}`
  );
  res.json(result.rows);
}

// 高度な絞り込み検索
async function advancedSearch(req, res) {
  const { title, status, priority, assignee, dateFrom, dateTo, labels } = req.query;

  // 問題G: 動的SQL組み立て（複数のSQLインジェクション箇所）
  let sql = 'SELECT i.*, u.username as assignee_name FROM issues i LEFT JOIN users u ON i.assignee_id=u.id WHERE 1=1';
  const conditions = [];

  if (title)    conditions.push(`i.title LIKE '%${title}%'`);
  if (status)   conditions.push(`i.status='${status}'`);
  if (priority) conditions.push(`i.priority='${priority}'`);
  if (assignee) conditions.push(`i.assignee_id=${assignee}`);
  if (dateFrom) conditions.push(`i.created_at >= '${dateFrom}'`);
  if (dateTo)   conditions.push(`i.created_at <= '${dateTo}'`);

  if (conditions.length > 0) {
    sql += ' AND ' + conditions.join(' AND ');
  }

  const result = await db.query(sql);

  // 問題H: ラベルフィルタは別途アプリ層で処理（DBで絞り込まない）
  let filtered = result.rows;
  if (labels) {
    const labelList = labels.split(',');
    // 問題I: ラベルをメモリで逐次取得してフィルタ（N+1の変形）
    filtered = [];
    for (const issue of result.rows) {
      const issueLabels = await db.query(`SELECT name FROM labels WHERE issue_id=${issue.id}`);
      const labelNames = issueLabels.rows.map(l => l.name);
      if (labelList.every(l => labelNames.includes(l))) {
        filtered.push(issue);
      }
    }
  }

  res.json({ count: filtered.length, results: filtered });
}

// 人気のあるIssueランキング（重い集計）
async function getPopularIssues(req, res) {
  // 問題J: 毎リクエスト重い集計クエリ（キャッシュなし）
  const result = await db.query(`
    SELECT i.*,
           COUNT(DISTINCT c.id) as comment_count,
           COUNT(DISTINCT r.id) as reaction_count,
           COUNT(DISTINCT v.id) as view_count
    FROM issues i
    LEFT JOIN comments c ON c.issue_id = i.id
    LEFT JOIN comment_reactions r ON r.comment_id = c.id
    LEFT JOIN issue_views v ON v.issue_id = i.id
    GROUP BY i.id
    ORDER BY (COUNT(DISTINCT c.id) * 2 + COUNT(DISTINCT r.id) + COUNT(DISTINCT v.id)) DESC
    LIMIT 20
  `);
  res.json(result.rows);
}

module.exports = { globalSearch, suggestIssues, advancedSearch, getPopularIssues };
