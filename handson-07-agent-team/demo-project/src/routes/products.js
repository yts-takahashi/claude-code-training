// 商品APIルート（Agent Teams 練習用）
// このファイルには意図的な問題が含まれています

const db = require('../db');

// 商品一覧（ページネーションなし + 全カラム取得）
async function listProducts(req, res) {
  // 問題: LIMIT なし。商品数が増えると全件返してメモリ・ネットワークを圧迫
  const result = await db.query('SELECT * FROM products');
  res.json(result.rows);
}

// 商品詳細
async function getProduct(req, res) {
  const { id } = req.params;

  // 問題: id のバリデーションなし（数値以外を渡すとSQLエラー）
  const product = await db.query(`SELECT * FROM products WHERE id = ${id}`);
  if (product.rows.length === 0) {
    return res.status(404).send('Not found');
  }

  // 関連データを逐次取得（N+1の変形）
  const reviews = await db.query(`SELECT * FROM reviews WHERE product_id = ${id}`);
  const inventory = await db.query(`SELECT * FROM inventory WHERE product_id = ${id}`);

  res.json({ ...product.rows[0], reviews: reviews.rows, inventory: inventory.rows[0] });
}

// 商品作成（入力検証なし）
async function createProduct(req, res) {
  const { name, price, category, description } = req.body;

  // 問題: price が負数でも通る。必須チェックなし
  // 問題: SQLインジェクション
  const result = await db.query(
    `INSERT INTO products (name, price, category, description)
     VALUES ('${name}', ${price}, '${category}', '${description}')
     RETURNING id`
  );

  res.status(201).json({ id: result.rows[0].id });
}

// 在庫更新（排他制御なし）
async function updateInventory(req, res) {
  const { id } = req.params;
  const { quantity } = req.body;

  // 問題: 排他制御なし。同時リクエストで在庫がマイナスになりうる
  const current = await db.query(`SELECT quantity FROM inventory WHERE product_id = ${id}`);
  const newQty = current.rows[0].quantity + quantity;

  if (newQty < 0) {
    return res.status(400).json({ error: 'Insufficient inventory' });
  }

  await db.query(`UPDATE inventory SET quantity = ${newQty} WHERE product_id = ${id}`);
  res.json({ quantity: newQty });
}

// 商品検索（全文スキャン）
async function searchProducts(req, res) {
  const { keyword, minPrice, maxPrice, category } = req.query;

  // 問題: インデックスなしのLIKE検索 + 動的なWHERE句の組み立て（SQLi）
  let sql = 'SELECT * FROM products WHERE 1=1';
  if (keyword) sql += ` AND (name LIKE '%${keyword}%' OR description LIKE '%${keyword}%')`;
  if (minPrice) sql += ` AND price >= ${minPrice}`;
  if (maxPrice) sql += ` AND price <= ${maxPrice}`;
  if (category) sql += ` AND category = '${category}'`;

  const result = await db.query(sql);
  res.json(result.rows);
}

module.exports = { listProducts, getProduct, createProduct, updateInventory, searchProducts };
