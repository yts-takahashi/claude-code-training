// アプリケーションエントリーポイント（Agent Teams 練習用）
const { initPool } = require('./db');
const { verifyToken, rateLimit } = require('./middleware/auth');
const users = require('./routes/users');
const products = require('./routes/products');

// 問題: エラーハンドリングなしで起動
initPool();

// モックExpressアプリ（実際のExpressは不要）
const app = {
  routes: {},
  use(path, ...middlewares) {
    console.log(`Registered middleware for ${path}`);
  },
  get(path, ...handlers) {
    this.routes[`GET ${path}`] = handlers;
  },
  post(path, ...handlers) {
    this.routes[`POST ${path}`] = handlers;
  },
  put(path, ...handlers) {
    this.routes[`PUT ${path}`] = handlers;
  },
  delete(path, ...handlers) {
    this.routes[`DELETE ${path}`] = handlers;
  }
};

// ミドルウェア登録
app.use('*', rateLimit);
app.use('/api/*', verifyToken);

// ユーザーAPI
app.get('/api/users', users.listUsers);
app.get('/api/users/:id', users.getUser);
app.put('/api/users/:id', users.updateUser);
app.get('/api/users/search', users.searchUsers);
app.delete('/api/users/:id', users.deleteUser);

// 商品API
app.get('/api/products', products.listProducts);
app.get('/api/products/:id', products.getProduct);
app.post('/api/products', products.createProduct);
app.put('/api/products/:id/inventory', products.updateInventory);
app.get('/api/products/search', products.searchProducts);

// 問題: 認証エンドポイントに verifyToken が適用されていない
app.post('/auth/login', require('./user-auth').login);
app.post('/auth/reset-password', require('./user-auth').resetPassword);

module.exports = app;
