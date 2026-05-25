/**
 * Issue（タスク）管理モジュール
 * TaskTracker API — Agent Teams ハンズオン用サンプル
 *
 * 意図的な問題を含んでいます。Agent Teams で調査してください。
 */

const db = require('./db');

// Issue一覧（ページネーションなし + N+1問題）
async function listIssues(req, res) {
  const { projectId, status, assignee } = req.query;

  let sql = 'SELECT * FROM issues WHERE 1=1';
  // 問題A: SQLインジェクション（クエリパラメータをそのまま埋め込み）
  if (projectId) sql += ` AND project_id=${projectId}`;
  if (status)    sql += ` AND status='${status}'`;
  if (assignee)  sql += ` AND assignee_id=${assignee}`;

  const issues = await db.query(sql);

  // 問題B: N+1クエリ。Issueごとにアサイニーとコメント数を個別取得
  const result = [];
  for (const issue of issues.rows) {
    const assigneeInfo = await db.query(`SELECT username, email FROM users WHERE id=${issue.assignee_id}`);
    const commentCount = await db.query(`SELECT COUNT(*) FROM comments WHERE issue_id=${issue.id}`);
    const labels = await db.query(`SELECT * FROM labels WHERE issue_id=${issue.id}`);
    result.push({
      ...issue,
      assignee: assigneeInfo.rows[0],
      commentCount: parseInt(commentCount.rows[0].count),
      labels: labels.rows
    });
  }
  // 問題C: ページネーションなし。Issueが増えると全件返す

  res.json(result);
}

// Issue詳細
async function getIssue(req, res) {
  const { id } = req.params;
  // 問題A継続: idのバリデーションなし
  const issue = await db.query(`SELECT * FROM issues WHERE id=${id}`);
  if (issue.rows.length === 0) {
    return res.status(404).json({ error: 'Issue not found' });
  }

  // 問題B継続: コメントを全件取得（ページネーションなし）
  const comments = await db.query(`SELECT * FROM comments WHERE issue_id=${id} ORDER BY created_at ASC`);

  res.json({ ...issue.rows[0], comments: comments.rows });
}

// Issue作成
async function createIssue(req, res) {
  const { title, description, projectId, assigneeId, priority } = req.body;
  const creatorId = req.user?.id;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  // 問題D: XSS対策なし（titleやdescriptionにHTMLスクリプトが入れられる）
  // 問題A継続: SQLインジェクション
  const result = await db.query(
    `INSERT INTO issues (title, description, project_id, assignee_id, creator_id, priority, status)
     VALUES ('${title}', '${description}', ${projectId}, ${assigneeId}, ${creatorId}, '${priority || 'medium'}', 'open')
     RETURNING *`
  );

  res.status(201).json(result.rows[0]);
}

// Issueステータス更新（競合状態あり）
async function updateIssueStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;
  const requesterId = req.user?.id;

  // 問題E: 認可チェックなし。誰でも任意のIssueのステータスを変更できる
  const validStatuses = ['open', 'in_progress', 'resolved', 'closed'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  // 問題F: 競合状態。同時リクエストで状態が不整合になる可能性
  // トランザクションや楽観的ロックを使うべき
  await db.query(`UPDATE issues SET status='${status}', updated_at=NOW() WHERE id=${id}`);
  res.json({ message: 'Status updated' });
}

// Issue削除
async function deleteIssue(req, res) {
  const { id } = req.params;
  const requesterId = req.user?.id;

  // 問題G: 物理削除 + 関連するコメント・ラベルが残る（参照整合性）
  // 問題E継続: 認可チェックなし
  await db.query(`DELETE FROM issues WHERE id=${id}`);
  res.json({ message: 'Deleted' });
}

// Issue統計（重い集計）
async function getStats(req, res) {
  const { projectId } = req.query;
  // 問題H: インデックスなしでの集計クエリ。大量データで非常に遅い
  const stats = await db.query(`
    SELECT
      status,
      COUNT(*) as count,
      AVG(EXTRACT(EPOCH FROM (updated_at - created_at))/3600) as avg_hours_to_update
    FROM issues
    WHERE project_id=${projectId}
    GROUP BY status
  `);
  res.json(stats.rows);
}

module.exports = { listIssues, getIssue, createIssue, updateIssueStatus, deleteIssue, getStats };
