/**
 * コメント管理モジュール
 * TaskTracker API — Agent Teams ハンズオン用サンプル
 *
 * 意図的な問題を含んでいます。Agent Teams で調査してください。
 */

const db = require('./db');

// コメント一覧（N+1 + XSS）
async function listComments(req, res) {
  const { issueId } = req.params;

  // 問題A: SQLインジェクション
  const comments = await db.query(`SELECT * FROM comments WHERE issue_id=${issueId} ORDER BY created_at ASC`);

  // 問題B: N+1クエリ。各コメントの投稿者を個別取得
  const result = [];
  for (const comment of comments.rows) {
    const author = await db.query(`SELECT id, username, email FROM users WHERE id=${comment.author_id}`);
    result.push({ ...comment, author: author.rows[0] });
  }

  // 問題C: ページネーションなし。コメントが1000件あっても全部返す
  res.json(result);
}

// コメント作成（XSS・レート制限なし）
async function createComment(req, res) {
  const { issueId } = req.params;
  const { content } = req.body;
  const authorId = req.user?.id;

  if (!content || content.trim() === '') {
    return res.status(400).json({ error: 'Comment cannot be empty' });
  }

  // 問題D: XSS対策なし（<script>タグが保存・返却される）
  // 問題E: レート制限なし（同じユーザーが大量コメントを送れる）
  // 問題A継続: SQLインジェクション
  const result = await db.query(
    `INSERT INTO comments (issue_id, author_id, content)
     VALUES (${issueId}, ${authorId}, '${content}')
     RETURNING *`
  );

  // 問題F: 親Issue の updated_at を更新していない
  res.status(201).json(result.rows[0]);
}

// コメント更新
async function updateComment(req, res) {
  const { id } = req.params;
  const { content } = req.body;
  const requesterId = req.user?.id;

  // 問題G: 認可チェックなし（投稿者以外も編集できる）
  // 問題H: 編集履歴を残していない（誰がいつ変更したか不明）
  await db.query(`UPDATE comments SET content='${content}', updated_at=NOW() WHERE id=${id}`);
  res.json({ message: 'Comment updated' });
}

// コメント削除
async function deleteComment(req, res) {
  const { id } = req.params;
  const requesterId = req.user?.id;

  // 問題G継続: 認可チェックなし（物理削除 + 誰でも可能）
  await db.query(`DELETE FROM comments WHERE id=${id}`);
  res.json({ message: 'Comment deleted' });
}

// コメント検索
async function searchComments(req, res) {
  const { keyword, issueId } = req.query;

  // 問題A継続: SQLインジェクション + インデックスなしの全文検索
  let sql = 'SELECT * FROM comments WHERE 1=1';
  if (keyword) sql += ` AND content LIKE '%${keyword}%'`;
  if (issueId) sql += ` AND issue_id=${issueId}`;

  const result = await db.query(sql);
  res.json(result.rows);
}

// コメントへのリアクション（非効率な実装）
async function addReaction(req, res) {
  const { id } = req.params;
  const { emoji } = req.body;
  const userId = req.user?.id;

  // 問題I: 既存リアクションを取得→更新という非アトミックな操作（競合状態）
  const existing = await db.query(
    `SELECT * FROM comment_reactions WHERE comment_id=${id} AND user_id=${userId} AND emoji='${emoji}'`
  );

  if (existing.rows.length > 0) {
    await db.query(`DELETE FROM comment_reactions WHERE id=${existing.rows[0].id}`);
    res.json({ action: 'removed' });
  } else {
    await db.query(
      `INSERT INTO comment_reactions (comment_id, user_id, emoji) VALUES (${id}, ${userId}, '${emoji}')`
    );
    res.json({ action: 'added' });
  }
}

module.exports = { listComments, createComment, updateComment, deleteComment, searchComments, addReaction };
