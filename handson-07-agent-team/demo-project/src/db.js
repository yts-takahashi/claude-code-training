// データベース接続モジュール（Agent Teams 練習用）
// このファイルには意図的な問題が含まれています

const MAX_CONNECTIONS = 10;
let pool = [];
let connectionCount = 0;

// 接続プールの初期化（問題あり）
async function initPool() {
  for (let i = 0; i < MAX_CONNECTIONS; i++) {
    pool.push({
      id: i,
      inUse: false,
      lastUsed: null,
      connection: null // 実際の接続オブジェクトなし（モック）
    });
  }
  console.log('Connection pool initialized');
}

// 接続を取得（競合状態の問題あり）
async function getConnection() {
  // 空きコネクションを探す（競合状態: 非同期で同時アクセスすると重複取得される）
  const free = pool.find(c => !c.inUse);
  if (!free) {
    throw new Error('No free connections available');
  }
  free.inUse = true;
  free.lastUsed = Date.now();
  connectionCount++;
  return free;
}

// 接続を解放（タイムアウト未実装）
async function releaseConnection(conn) {
  const target = pool.find(c => c.id === conn.id);
  if (target) {
    target.inUse = false;
    connectionCount--;
  }
  // 問題: リリースが忘れられてもタイムアウトがない
}

// クエリ実行（エラー時にコネクションがリークする）
async function query(sql, params = []) {
  const conn = await getConnection();
  try {
    // モック: 実際のSQLは実行しない
    console.log('Executing query:', sql, params);
    const result = { rows: [], rowCount: 0 };
    // 問題: conn.releaseConnection() を finally で呼ぶべきだが呼んでいない
    return result;
  } catch (err) {
    // 問題: エラー時にコネクションが返されない → リーク
    throw err;
  }
}

// 統計情報（グローバル変数への直接依存）
function getStats() {
  return {
    totalConnections: MAX_CONNECTIONS,
    activeConnections: connectionCount,
    freeConnections: MAX_CONNECTIONS - connectionCount
  };
}

module.exports = { initPool, getConnection, releaseConnection, query, getStats };
