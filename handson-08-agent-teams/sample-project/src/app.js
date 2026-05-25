/**
 * TaskTracker API — メインアプリ
 * Agent Teams ハンズオン用サンプルプロジェクト
 *
 * このプロジェクトはセキュリティ・パフォーマンス・設計の問題を
 * 意図的に含んでいます。Agent Teams を使って調査・修正してください。
 *
 * モジュール構成:
 *   src/users.js    — ユーザー管理（認証・認可）
 *   src/issues.js   — Issue管理（CRUD・ステータス）
 *   src/comments.js — コメント管理（投稿・リアクション）
 *   src/search.js   — 全文検索・絞り込み
 *   src/db.js       — DB接続プール
 */

const users   = require('./users');
const issues  = require('./issues');
const comments = require('./comments');
const search  = require('./search');

// ルーティング定義（Expressライクなモック）
const routes = {
  'POST /auth/register':              users.registerUser,
  'POST /auth/login':                 users.login,
  'GET  /users/:id':                  users.getUser,
  'GET  /users':                      users.listUsers,
  'PUT  /users/:id':                  users.updateUser,

  'GET  /issues':                     issues.listIssues,
  'GET  /issues/:id':                 issues.getIssue,
  'POST /issues':                     issues.createIssue,
  'PATCH /issues/:id/status':         issues.updateIssueStatus,
  'DELETE /issues/:id':               issues.deleteIssue,
  'GET  /issues/stats':               issues.getStats,

  'GET  /issues/:issueId/comments':   comments.listComments,
  'POST /issues/:issueId/comments':   comments.createComment,
  'PUT  /comments/:id':               comments.updateComment,
  'DELETE /comments/:id':             comments.deleteComment,
  'GET  /comments/search':            comments.searchComments,
  'POST /comments/:id/reactions':     comments.addReaction,

  'GET  /search':                     search.globalSearch,
  'GET  /search/suggest':             search.suggestIssues,
  'GET  /search/advanced':            search.advancedSearch,
  'GET  /search/popular':             search.getPopularIssues,
};

console.log('TaskTracker API routes registered:', Object.keys(routes).length);
module.exports = routes;
