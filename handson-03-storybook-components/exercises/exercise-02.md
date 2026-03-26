# 演習2: 融資審査ダッシュボードの作成

## 概要

融資審査部門のマネージャーが使用するダッシュボード画面を、既存のFinUIコンポーネントを組み合わせて作成してください。KPI指標、チャート、案件一覧を1つの画面に集約します。

## 使用コンポーネント

- `KPICardComponent` (`fin-kpi-card`) - 主要KPI指標の表示
- `LineChartComponent` (`fin-line-chart`) - 月次推移チャート
- `PieChartComponent` (`fin-pie-chart`) - 構成比チャート
- `DataTableComponent` (`fin-data-table`) - 最新案件一覧
- `AlertBannerComponent` (`fin-alert-banner`) - 重要な通知表示
- `StatusBadgeComponent` (`fin-status-badge`) - 案件ステータス表示
- `CurrencyDisplayComponent` (`fin-currency-display`) - 金額表示
- `TabsComponent` (`fin-tabs`) - ビュー切替

## 画面要件

### ファイル配置

```
src/pages/review-dashboard.component.ts
```

### コンポーネント定義

```typescript
@Component({
  selector: 'app-review-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    KPICardComponent,
    LineChartComponent,
    PieChartComponent,
    DataTableComponent,
    AlertBannerComponent,
    StatusBadgeComponent,
    CurrencyDisplayComponent,
    TabsComponent,
  ],
  template: `...`,
})
export class ReviewDashboardComponent { }
```

### アラートエリア（上部）

ページ上部にアラートバナーを表示:
- 「5件の案件が承認期限を3日以内に迎えます」（warning タイプ、アクションボタン「確認する」付き）
- 閉じるボタン付き

### KPIエリア

4つの `fin-kpi-card` を横並びに配置（グリッドレイアウト: 4列）:

1. **融資残高** - 値: `¥12,345,678,900` / 前月比: `+3.2%`
2. **新規申請件数** - 値: `142件` / 前月比: `+12.5%`
3. **延滞率** - 値: `1.23%` / 前月比: `-0.15%`
4. **承認率** - 値: `87.5%` / 前月比: `+2.1%`

### チャートエリア

`fin-tabs` で切り替え可能な2つのビュー:

#### タブ1: 月次推移
- 左: `fin-line-chart` - 融資残高推移（12ヶ月分）
- 右: `fin-pie-chart` - 審査結果の内訳（ドーナツチャート）

#### タブ2: 業種別分析
- 左: `fin-pie-chart` - 業種別融資残高（ドーナツチャート）
- 右: `fin-line-chart` - 業種別延滞率推移

### 案件一覧エリア

`fin-data-table` で直近の案件を表示（5件、ページネーションなし）

### レイアウト仕様

```
+---------------------------------------------+
| [!] 5件の案件が承認期限を...    [確認] x     |
+---------------------------------------------+
| 融資審査ダッシュボード                       |
+----------+----------+----------+------------+
| 融資残高  | 新規申請  | 延滞率   | 承認率     |
| ¥123億   | 142件    | 1.23%   | 87.5%      |
+----------+----------+----------+------------+
| [月次推移] [業種別分析]                      |
+---------------------+-----------------------+
|   折れ線グラフ        |   円グラフ            |
+---------------------+-----------------------+
| 最新案件一覧                                 |
+---------------------------------------------+
| No. | 申請者 | 金額 | ステータス | 日付      |
+---------------------------------------------+
```

## Claude Code への指示例

```
src/pages/review-dashboard.component.ts を作成してください。

exercises/exercise-02.md の要件に従い、融資審査ダッシュボード画面を実装してください。
必ず既存の FinUI コンポーネント（KPICardComponent, LineChartComponent, PieChartComponent, DataTableComponent, AlertBannerComponent, StatusBadgeComponent, CurrencyDisplayComponent, TabsComponent）を使用してください。

KPIは4つ横並び、チャートはタブで切り替え、下部に最新案件の一覧を表示してください。
サンプルデータは12ヶ月分の月次データを用意してください。
```

## 完成後の確認ポイント

- [ ] 使用すべきコンポーネントがすべてimportsに含まれているか
- [ ] KPIカードが4つ横並びでレスポンシブか
- [ ] チャートがTabsで切り替えられるか
- [ ] LineChartに複数系列が表示されているか
- [ ] PieChartがドーナツモードで表示されているか
- [ ] AlertBannerが上部に表示され、閉じられるか
- [ ] DataTableに最新案件が表示されているか
- [ ] 金額が fin-currency-display で表示されているか
- [ ] ステータスが fin-status-badge で表示されているか
- [ ] 自前でチャートやカードを実装していないか
