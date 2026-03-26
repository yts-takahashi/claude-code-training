# FinUI デザインシステム

## プロジェクト概要

FinUI は金融系業務アプリケーション向けのAngularコンポーネントライブラリです。
融資管理、審査ワークフロー、ダッシュボードなどの画面構築に必要なUIコンポーネントを提供します。

## 技術スタック

- **フレームワーク**: Angular 17+ (standalone components) + TypeScript
- **スタイリング**: Tailwind CSS（`fin-*` カスタムカラーパレット使用）
- **コンポーネントカタログ**: Storybook 8 for Angular
- **チャートライブラリ**: Chart.js + ng2-charts
- **日付処理**: date-fns
- **テンプレート構文**: Angular 17+ 新制御フロー構文（@if, @for, @switch）

## コンポーネント一覧

| コンポーネント | セレクタ | パス | 用途 |
|---|---|---|---|
| ButtonComponent | `fin-button` | `src/components/Button` | アクションボタン（承認、却下、申請など） |
| DataTableComponent | `fin-data-table` | `src/components/DataTable` | データ一覧表示（ソート、ページネーション、行選択対応） |
| KPICardComponent | `fin-kpi-card` | `src/components/KPICard` | KPI指標カード（融資残高、延滞率など） |
| StatusBadgeComponent | `fin-status-badge` | `src/components/StatusBadge` | ステータス表示バッジ（承認済、審査中、却下など） |
| ModalComponent | `fin-modal` | `src/components/Modal` | モーダルダイアログ（確認ダイアログ対応） |
| LineChartComponent | `fin-line-chart` | `src/components/LineChart` | 折れ線グラフ（時系列データ、Chart.js + ng2-chartsベース） |
| PieChartComponent | `fin-pie-chart` | `src/components/PieChart` | 円グラフ/ドーナツチャート（構成比、Chart.js + ng2-chartsベース） |
| SearchInputComponent | `fin-search-input` | `src/components/SearchInput` | 検索入力（デバウンス対応） |
| TabsComponent | `fin-tabs` | `src/components/Tabs` | タブ切替（バッジ対応） |
| FormFieldComponent | `fin-form-field` | `src/components/FormField` | フォーム入力（バリデーションエラー表示対応） |
| SidebarComponent | `fin-sidebar` | `src/components/Sidebar` | サイドバーナビゲーション（折りたたみ、サブメニュー対応） |
| NotificationBellComponent | `fin-notification-bell` | `src/components/NotificationBell` | 通知ベル（未読バッジ、ドロップダウン） |
| CurrencyDisplayComponent | `fin-currency-display` | `src/components/CurrencyDisplay` | 通貨表示（フォーマット、色分け、変動率） |
| TimelineComponent | `fin-timeline` | `src/components/Timeline` | タイムライン（承認フローのステップ表示） |
| AlertBannerComponent | `fin-alert-banner` | `src/components/AlertBanner` | アラートバナー（info/success/warning/error） |

## コンポーネント使用規約

### 必須ルール

1. **新規画面を作成する際は、必ず既存コンポーネントを使用すること**
   - 同等の機能を持つUIを自前で実装してはいけません
   - 既存コンポーネントでカバーできない場合のみ、新規コンポーネントの作成を検討してください

2. **import パス規約**
   ```typescript
   // 推奨: 個別インポート（バンドルサイズ最適化）
   import { ButtonComponent } from '@/components/Button';
   import { DataTableComponent } from '@/components/DataTable';
   import { StatusBadgeComponent } from '@/components/StatusBadge';

   // 許可: バレルエクスポートからのインポート
   import { ButtonComponent, DataTableComponent, StatusBadgeComponent } from '@/components';
   ```

3. **standalone component として使用**
   ```typescript
   @Component({
     selector: 'app-my-page',
     standalone: true,
     imports: [ButtonComponent, DataTableComponent, StatusBadgeComponent],
     template: `...`,
   })
   export class MyPageComponent { }
   ```

### スタイリング規約

- Tailwind CSS のユーティリティクラスを使用する
- カスタムカラーは `fin-*` プレフィックスを使用（例: `text-fin-primary`, `bg-fin-danger`）
- コンポーネント外のレイアウトには Tailwind の Flex / Grid を使用する
- インラインスタイルは原則禁止

### 金融ドメインの表示規約

- 金額表示には `fin-currency-display` コンポーネントを使用する
- ステータス表示には `fin-status-badge` コンポーネントを使用する
- 承認フローの表示には `fin-timeline` コンポーネントを使用する

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
2. Storybook で各コンポーネントの @Input / @Output と使い方を確認する
3. standalone component としてコンポーネントを組み合わせて画面を構築する
4. レイアウトは Tailwind CSS の Grid / Flex を使用する
5. 画面固有のロジック（データフェッチ、状態管理）を実装する

## ビルドコマンド

```bash
npm start             # 開発サーバー起動
npm run build         # プロダクションビルド
npm run storybook     # Storybook 起動
npm run type-check    # 型チェック
npm run lint          # lint 実行
```
