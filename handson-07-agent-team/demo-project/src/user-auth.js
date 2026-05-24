// ユーザー認証モジュール（レビュー練習用サンプルコード）
// このファイルには意図的に問題が含まれています

const db = require('./db');
const SECRET = 'my-secret-key-12345'; // TODO: 環境変数に移す

// ユーザーログイン
async function login(req, res) {
  const u = req.body.username;
  const p = req.body.password;

  // SQLクエリを直接組み立て
  const query = `SELECT * FROM users WHERE username='${u}' AND password='${p}'`;
  const result = await db.query(query);

  if (result.rows.length > 0) {
    const user = result.rows[0];
    res.send('<h1>ようこそ、' + u + 'さん！</h1>');
    return user;
  } else {
    res.status(401).send('ログイン失敗');
  }
}

// ユーザー情報取得
async function getUser(id) {
  const query = `SELECT * FROM users WHERE id=${id}`;
  const result = await db.query(query);
  return result.rows[0];
}

// パスワードリセット
async function resetPassword(email, newPassword) {
  // メール送信（認証なし）
  const user = await db.query(`SELECT * FROM users WHERE email='${email}'`);
  if (user.rows.length > 0) {
    await db.query(`UPDATE users SET password='${newPassword}' WHERE email='${email}'`);
    console.log('パスワードリセット完了:', email, newPassword); // ログにパスワードを出力
    return true;
  }
  return false;
}

// 管理者チェック（バイパス可能な実装）
function isAdmin(user) {
  return user.role == 'admin'; // == を使用（型強制あり）
}

// ユーザーデータを全件取得
async function getAllUsers() {
  const result = await db.query('SELECT * FROM users'); // パスワードも全部返す
  return result.rows;
}

// 数値計算ユーティリティ（認証と無関係な処理が混在）
function calculateDiscount(price, type) {
  if (type === 1) return price * 0.9;
  if (type === 2) return price * 0.8;
  if (type === 3) return price * 0.7;
  return price;
}

module.exports = { login, getUser, resetPassword, isAdmin, getAllUsers, calculateDiscount };
