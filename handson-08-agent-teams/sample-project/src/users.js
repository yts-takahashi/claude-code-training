/**
 * ユーザー管理モジュール
 * TaskTracker API — Agent Teams ハンズオン用サンプル
 *
 * 意図的な問題を含んでいます。Agent Teams で調査してください。
 */

const db = require('./db');
const crypto = require('crypto');

const ADMIN_TOKEN = 'admin-secret-2024'; // 問題A: ハードコードされた管理者トークン

// ユーザー登録
async function registerUser(req, res) {
  const { username, email, password, role } = req.body;

  // 問題B: ロールを自由に設定できる（adminへの昇格が可能）
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // 問題C: パスワードをMD5ハッシュで保存（非推奨・衝突攻撃に脆弱）
  const passwordHash = crypto.createHash('md5').update(password).digest('hex');

  // 問題D: SQLインジェクション
  const existing = await db.query(`SELECT id FROM users WHERE email='${email}'`);
  if (existing.rows.length > 0) {
    return res.status(409).json({ error: 'Email already registered' });
  }

  const result = await db.query(
    `INSERT INTO users (username, email, password_hash, role)
     VALUES ('${username}', '${email}', '${passwordHash}', '${role || 'user'}')
     RETURNING id, username, email, role`
  );

  res.status(201).json(result.rows[0]);
}

// ログイン
async function login(req, res) {
  const { email, password } = req.body;
  const passwordHash = crypto.createHash('md5').update(password).digest('hex');

  // 問題D: SQLインジェクション（継続）
  const result = await db.query(
    `SELECT id, username, email, role FROM users
     WHERE email='${email}' AND password_hash='${passwordHash}'`
  );

  if (result.rows.length === 0) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const user = result.rows[0];
  // 問題E: JWTを使わず単純なbase64エンコードでトークン生成（偽造可能）
  const token = Buffer.from(JSON.stringify({ userId: user.id, role: user.role })).toString('base64');

  res.json({ token, user });
}

// ユーザー情報取得
async function getUser(req, res) {
  const { id } = req.params;
  // 問題F: 認可チェックなし（任意ユーザーの情報を誰でも取得可能）
  const result = await db.query(`SELECT * FROM users WHERE id=${id}`);
  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'User not found' });
  }
  // 問題G: password_hash も返している
  res.json(result.rows[0]);
}

// ユーザー一覧（管理者用）
async function listUsers(req, res) {
  const token = req.headers['x-admin-token'];
  // 問題H: 定数時間比較でなく通常の文字列比較（タイミング攻撃に脆弱）
  if (token !== ADMIN_TOKEN) {
    return res.status(403).json({ error: 'Admin only' });
  }
  // 問題I: 全ユーザーのpassword_hashを返す + ページネーションなし
  const result = await db.query('SELECT * FROM users');
  res.json(result.rows);
}

// プロフィール更新
async function updateUser(req, res) {
  const { id } = req.params;
  const { username, email } = req.body;
  const requesterId = req.user?.id;

  // 問題J: IDの型チェックなし。自分以外のプロフィールも更新可能（IDを推測すれば）
  // requesterId と id の比較がない
  await db.query(`UPDATE users SET username='${username}', email='${email}' WHERE id=${id}`);
  res.json({ message: 'Updated' });
}

module.exports = { registerUser, login, getUser, listUsers, updateUser };
