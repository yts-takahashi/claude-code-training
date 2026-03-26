# FinScope - 金融ダッシュボード

## 技術スタック
- **フレームワーク**: Angular 17+ (standalone components)
- **言語**: TypeScript (strict mode)
- **スタイリング**: Tailwind CSS 3.4
- **チャートライブラリ**: Chart.js + ng2-charts
- **アイコン**: Lucide Angular
- **ルーティング**: Angular Router

## コーディング規約

### ファイル構成
- `src/app/` - アプリケーションのルート（app.component.ts, app.routes.ts）
- `src/app/pages/` - 各画面のページコンポーネント
  - `src/app/pages/dashboard/` - ダッシュボード画面
  - `src/app/pages/portfolio/` - ポートフォリオ管理画面
  - `src/app/pages/trade/` - 取引入力画面
  - `src/app/pages/risk/` - リスク分析画面
  - `src/app/pages/clients/` - 顧客詳細画面
  - `src/app/pages/compliance/` - コンプライアンス画面
- `src/app/components/` - 再利用可能なUIコンポーネント
  - `src/app/components/ui/` - 汎用UIコンポーネント（Card, Table, Badge 等）
  - `src/app/components/charts/` - チャートコンポーネント
  - `src/app/components/layout/` - レイアウトコンポーネント（Sidebar, Header 等）
- `src/app/lib/` - ユーティリティ関数、定数
- `src/app/types/` - TypeScript 型定義ファイル
- `src/app/data/` - ダミーデータ

### 命名規則
- コンポーネント: ケバブケース（Angular CLI 規約）（`kpi-card.component.ts`）
- クラス名: PascalCase (`KpiCardComponent`)
- ユーティリティ: camelCase (`format-currency.ts`)
- 型定義: PascalCase with 接尾辞 (`type TradeOrder`, `interface PortfolioItem`)
- CSS クラス: Tailwind CSS のユーティリティクラスを使用（カスタムCSSは最小限）

### コンポーネント設計
- **Standalone components** を使用（NgModule は使わない）
- Props は `@Input()` デコレーターで定義し、interface で型定義する
- イベントは `@Output()` + `EventEmitter` で定義
- 共通UIは `src/app/components/ui/` に切り出す
- 日本語テキストはテンプレート内に直接記述（i18n不要）
- テンプレートはインラインテンプレート（`template:`）を推奨（小規模コンポーネント）、大きい場合は外部ファイル

### スタイリング
- Tailwind CSS のユーティリティクラスを優先的に使用
- カスタムカラーは `tailwind.config.js` で定義済みの `navy` と `accent` を使用
- レスポンシブ対応: モバイルファーストで記述
- ダークテーマ非対応（ライトテーマのみ）

### データ
- APIは未実装のため、ダミーデータを `src/app/data/` に配置
- 金額フォーマット: `Intl.NumberFormat('ja-JP')` を使用
- 日付フォーマット: `Intl.DateTimeFormat('ja-JP')` を使用

### 使うべきライブラリ
- チャート描画: `chart.js` + `ng2-charts` (Recharts ではなく)
- アイコン: `lucide-angular`
- ルーティング: `@angular/router` (RouterLink, RouterLinkActive, RouterOutlet)
- 日付操作が必要な場合: ネイティブ Date API（外部ライブラリ不要）

### 使ってはいけないもの
- NgModule（standalone components を使うこと）
- Angular Material / PrimeNG（Tailwind CSS で統一）
- moment.js / dayjs（ネイティブAPIで十分）
- RxJS の過度な使用（シンプルなケースでは signals や直接的なアプローチを優先）
