/**
 * データベース接続モジュール
 * TaskTracker API — Agent Teams ハンズオン用サンプル
 */

// 接続プール（競合状態・リークあり）
let pool = Array.from({ length: 10 }, (_, i) => ({ id: i, inUse: false }));
let queryLog = []; // 問題: 上限なし→メモリリーク

async function getConnection() {
  const free = pool.find(c => !c.inUse); // 競合状態
  if (!free) throw new Error('Connection pool exhausted');
  free.inUse = true;
  return free;
}

async function releaseConnection(conn) {
  const c = pool.find(c => c.id === conn.id);
  if (c) c.inUse = false;
}

async function query(sql, params = []) {
  queryLog.push({ sql, timestamp: Date.now() }); // メモリリーク
  const conn = await getConnection();
  try {
    console.log('[DB]', sql);
    // モック: 実際のSQLは実行しない。行を返す必要がある場合は空配列
    return { rows: [], rowCount: 0 };
  } catch (err) {
    // リリースなし → リーク
    throw err;
  } finally {
    await releaseConnection(conn);
  }
}

module.exports = { query };
