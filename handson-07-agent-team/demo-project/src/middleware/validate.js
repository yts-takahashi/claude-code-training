// 入力バリデーションミドルウェア（Agent Teams 練習用）
// このファイルには意図的な問題が含まれています

// メールアドレス検証
function validateEmail(email) {
  // 問題: 不完全な正規表現（example@.comが通る）
  return /^[^\s@]+@[^\s@]+$/.test(email);
}

// パスワード強度チェック
function validatePassword(password) {
  // 問題: 最小長チェックのみ。大文字・小文字・数字・記号の要件なし
  return password && password.length >= 6;
}

// ユーザー登録の入力検証
function validateUserCreate(req, res, next) {
  const { name, email, password } = req.body;

  const errors = [];

  // 問題: name の最大長チェックなし（DBカラム制限を超えうる）
  if (!name || name.trim() === '') {
    errors.push('name is required');
  }

  if (!validateEmail(email)) {
    errors.push('Invalid email format');
  }

  if (!validatePassword(password)) {
    errors.push('Password must be at least 6 characters');
  }

  if (errors.length > 0) {
    // 問題: 全エラーを返すのは良いが、フォーマットが統一されていない
    return res.status(400).send(errors.join(', '));
  }

  next();
}

// 商品作成の入力検証
function validateProductCreate(req, res, next) {
  const { name, price } = req.body;

  // 問題: price の型チェックが甘い（文字列の数字も通過）
  if (!name) {
    return res.status(400).json({ error: 'name required' });
  }

  if (price === undefined) {
    return res.status(400).json({ error: 'price required' });
  }

  // 問題: XSS対策なし（nameにHTMLタグが入れられる）
  req.body.name = name; // sanitize すべき
  next();
}

// ページネーションパラメータの検証
function validatePagination(req, res, next) {
  let { page, limit } = req.query;

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 20;

  // 問題: limitの上限なし（limit=999999 で全件取得できる）
  if (page < 1) page = 1;

  req.pagination = { page, limit, offset: (page - 1) * limit };
  next();
}

module.exports = { validateEmail, validatePassword, validateUserCreate, validateProductCreate, validatePagination };
