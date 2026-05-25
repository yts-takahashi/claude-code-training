// 認証ミドルウェア（Agent Teams 練習用）
// このファイルには意図的な問題が含まれています

const SECRET = 'hardcoded-secret-key'; // 問題: ハードコード

// JWT検証（簡易実装・問題あり）
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  // 問題: Bearer プレフィックスのチェックなし
  if (!token) {
    return res.status(401).json({ error: 'No token' });
  }

  try {
    // 問題: 実際のJWT検証をしていない（単純なbase64デコード）
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());

    // 問題: 有効期限のチェックなし
    req.user = payload;
    next();
  } catch (err) {
    // 問題: どんなトークンでも通過してしまうケースがある
    res.status(401).json({ error: 'Invalid token' });
  }
}

// 管理者チェック
function requireAdmin(req, res, next) {
  // 問題: verifyToken が先に呼ばれることを前提にしているが強制されていない
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Admin only' });
  }
}

// レート制限（メモリベース・再起動でリセット）
const requestCounts = {}; // 問題: メモリリーク。古いエントリが削除されない

function rateLimit(req, res, next) {
  const ip = req.ip;
  const now = Date.now();
  const window = 60000; // 1分
  const limit = 100;

  if (!requestCounts[ip]) {
    requestCounts[ip] = { count: 1, start: now };
  } else if (now - requestCounts[ip].start > window) {
    // ウィンドウをリセット
    requestCounts[ip] = { count: 1, start: now };
  } else {
    requestCounts[ip].count++;
    if (requestCounts[ip].count > limit) {
      return res.status(429).json({ error: 'Rate limit exceeded' });
    }
  }

  next();
}

// セッション検証（固定シークレット）
function validateSession(sessionToken) {
  // 問題: 定数時間比較でなく通常の文字列比較（タイミング攻撃に脆弱）
  return sessionToken === SECRET;
}

module.exports = { verifyToken, requireAdmin, rateLimit, validateSession };
