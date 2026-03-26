# FinScope - 金融ダッシュボード

## 技術スタック
- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript (strict mode)
- **スタイリング**: Tailwind CSS 3.4
- **チャートライブラリ**: Recharts
- **アイコン**: Lucide React
- **ユーティリティ**: clsx, tailwind-merge

## コーディング規約

### ファイル構成
- `app/` - Next.js App Router のページ・レイアウト
- `components/` - 再利用可能なUIコンポーネント
  - `components/ui/` - 汎用UIコンポーネント（Button, Card, Table, Badge 等）
  - `components/charts/` - チャートコンポーネント
  - `components/layout/` - レイアウトコンポーネント（Sidebar, Header 等）
- `lib/` - ユーティリティ関数、定数、型定義
- `types/` - TypeScript 型定義ファイル

### 命名規則
- コンポーネント: PascalCase (`DashboardCard.tsx`)
- ユーティリティ: camelCase (`formatCurrency.ts`)
- 型定義: PascalCase with 接尾辞 (`type TradeOrder`, `interface PortfolioItem`)
- CSS クラス: Tailwind CSS のユーティリティクラスを使用（カスタムCSSは最小限）

### コンポーネント設計
- Server Components をデフォルトとし、必要な場合のみ `"use client"` を使用
- Props は interface で型定義する
- 共通UIは `components/ui/` に切り出す
- 日本語テキストはコンポーネント内に直接記述（i18n不要）

### スタイリング
- Tailwind CSS のユーティリティクラスを優先的に使用
- カスタムカラーは `tailwind.config.ts` で定義済みの `navy` と `accent` を使用
- レスポンシブ対応: モバイルファーストで記述
- ダークテーマ非対応（ライトテーマのみ）

### データ
- APIは未実装のため、ダミーデータを `lib/data/` に配置
- 金額フォーマット: `Intl.NumberFormat('ja-JP')` を使用
- 日付フォーマット: `Intl.DateTimeFormat('ja-JP')` を使用

### 使うべきライブラリ
- チャート描画: `recharts` (Chart.js ではなく)
- アイコン: `lucide-react`
- クラス結合: `clsx` + `tailwind-merge` の組み合わせ（`cn()` ヘルパー関数を `lib/utils.ts` に定義）
- 日付操作が必要な場合: ネイティブ Date API（外部ライブラリ不要）

### 使ってはいけないもの
- CSS Modules
- styled-components / Emotion
- Material UI / Chakra UI（Tailwind CSS で統一）
- moment.js / dayjs（ネイティブAPIで十分）
