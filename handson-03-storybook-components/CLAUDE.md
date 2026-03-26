# FinUI デザインシステム

## プロジェクト概要

FinUI は金融系業務アプリケーション向けのReactコンポーネントライブラリです。
融資管理、審査ワークフロー、ダッシュボードなどの画面構築に必要なUIコンポーネントを提供します。

## 技術スタック

- **フレームワーク**: React 18 + TypeScript
- **スタイリング**: Tailwind CSS（`fin-*` カスタムカラーパレット使用）
- **コンポーネントカタログ**: Storybook 8
- **チャートライブラリ**: Recharts
- **日付処理**: date-fns
- **ユーティリティ**: clsx（クラス名結合）

## コンポーネント一覧

| コンポーネント | パス | 用途 |
|---|---|---|
| Button | `src/components/Button` | アクションボタン（承認、却下、申請など） |
| DataTable | `src/components/DataTable` | データ一覧表示（ソート、ページネーション、行選択対応） |
| KPICard | `src/components/KPICard` | KPI指標カード（融資残高、延滞率など） |
| StatusBadge | `src/components/StatusBadge` | ステータス表示バッジ（承認済、審査中、却下など） |
| Modal | `src/components/Modal` | モーダルダイアログ（確認ダイアログ対応） |
| LineChart | `src/components/LineChart` | 折れ線グラフ（時系列データ、Rechartsベース） |
| PieChart | `src/components/PieChart` | 円グラフ/ドーナツチャート（構成比、Rechartsベース） |
| SearchInput | `src/components/SearchInput` | 検索入力（デバウンス対応） |
| Tabs | `src/components/Tabs` | タブ切替（バッジ、アイコン対応） |
| FormField | `src/components/FormField` | フォーム入力（バリデーションエラー表示対応） |
| Sidebar | `src/components/Sidebar` | サイドバーナビゲーション（折りたたみ、サブメニュー対応） |
| NotificationBell | `src/components/NotificationBell` | 通知ベル（未読バッジ、ドロップダウン） |
| CurrencyDisplay | `src/components/CurrencyDisplay` | 通貨表示（フォーマット、色分け、変動率） |
| Timeline | `src/components/Timeline` | タイムライン（承認フローのステップ表示） |
| AlertBanner | `src/components/AlertBanner` | アラートバナー（info/success/warning/error） |

## コンポーネント使用規約

### 必須ルール

1. **新規画面を作成する際は、必ず既存コンポーネントを使用すること**
   - 同等の機能を持つUIを自前で実装してはいけません
   - 既存コンポーネントでカバーできない場合のみ、新規コンポーネントの作成を検討してください

2. **import パス規約**
   ```tsx
   // 推奨: 個別インポート（バンドルサイズ最適化）
   import { Button } from '@/components/Button';
   import { DataTable } from '@/components/DataTable';
   import { StatusBadge } from '@/components/StatusBadge';

   // 許可: バレルエクスポートからのインポート
   import { Button, DataTable, StatusBadge } from '@/components';
   ```

3. **型のインポート**
   ```tsx
   import { DataTable, type Column, type DataTableProps } from '@/components/DataTable';
   ```

### スタイリング規約

- Tailwind CSS のユーティリティクラスを使用する
- カスタムカラーは `fin-*` プレフィックスを使用（例: `text-fin-primary`, `bg-fin-danger`）
- コンポーネント外のレイアウトには Tailwind の Flex / Grid を使用する
- インラインスタイルは原則禁止

### 金融ドメインの表示規約

- 金額表示には `CurrencyDisplay` コンポーネントを使用する
- ステータス表示には `StatusBadge` コンポーネントを使用する
- 承認フローの表示には `Timeline` コンポーネントを使用する

## Storybook の確認方法

```bash
# Storybook の起動
npm run storybook

# ブラウザで http://localhost:6006 にアクセス
```

各コンポーネントの Storybook には以下が含まれます:
- デフォルトのストーリー
- 全バリアントの一覧
- インタラクション例
- 金融ドメインに即したサンプルデータ

## 新規画面の作成手順

1. 要件を確認し、使用するコンポーネントを特定する
2. Storybook で各コンポーネントの Props と使い方を確認する
3. コンポーネントを組み合わせて画面を構築する
4. レイアウトは Tailwind CSS の Grid / Flex を使用する
5. 画面固有のロジック（データフェッチ、状態管理）を実装する

## ビルドコマンド

```bash
npm run dev           # 開発サーバー起動
npm run build         # プロダクションビルド
npm run storybook     # Storybook 起動
npm run type-check    # 型チェック
npm run lint          # ESLint 実行
```
