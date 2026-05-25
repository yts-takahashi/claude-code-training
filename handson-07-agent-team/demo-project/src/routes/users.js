// ユーザーAPIルート（Agent Teams 練習用）
// このファイルには意図的な問題が含まれています

const db = require('../db');
const auth = require('../middleware/auth');

// ユーザー一覧取得（N+1クエリ問題あり）
async function listUsers(req, res) {
  try {
    const users = await db.query('SELECT id, name, email FROM users');

    // 問題: N+1クエリ — ユーザーごとにロール情報を個別取得
    const result = [];
    for (const user of users.rows) {
      const role = await db.query(`SELECT * FROM roles WHERE user_id = ${user.id}`);
      const orders = await db.query(`SELECT COUNT(*) FROM orders WHERE user_id = ${user.id}`);
      result.push({ ...user, role: role.rows[0], orderCount: orders.rows[0].count });
    }

    res.json(result);
  } catch (err) {
    // 問題: 内部エラーをそのままクライアントに返している
    res.status(500).json({ error: err.message, stack: err.stack });
  }
}

// ユーザー詳細取得（認可チェックなし）
async function getUser(req, res) {
  const { id } = req.params;
  // 問題: 認可チェックなし。誰でも任意のユーザー情報を取得できる
  const result = await db.query(`SELECT * FROM users WHERE id = ${id}`);
  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'User not found' });
  }
  // 問題: パスワードハッシュも返している
  res.json(result.rows[0]);
}

// ユーザー更新
async function updateUser(req, res) {
  const { id } = req.params;
  const { name, email, role } = req.body;

  // 問題: ロール変更に権限チェックなし（一般ユーザーがadminになれる）
  await db.query(
    `UPDATE users SET name='${name}', email='${email}', role='${role}' WHERE id=${id}`
  );

  res.json({ message: 'Updated successfully' });
}

// ユーザー検索
async function searchUsers(req, res) {
  const q = req.query.q;
  // 問題: SQLインジェクション
  const result = await db.query(`SELECT * FROM users WHERE name LIKE '%${q}%' OR email LIKE '%${q}%'`);
  res.json(result.rows);
}

// ユーザー削除（物理削除・復元不可）
async function deleteUser(req, res) {
  const { id } = req.params;
  // 問題: ソフトデリートでなく物理削除 + 関連データの整合性チェックなし
  await db.query(`DELETE FROM users WHERE id = ${id}`);
  await db.query(`DELETE FROM orders WHERE user_id = ${id}`); // 順序は正しいが関連全削除
  res.json({ message: 'Deleted' });
}

module.exports = { listUsers, getUser, updateUser, searchUsers, deleteUser };
