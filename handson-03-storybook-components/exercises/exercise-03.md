# 演習3: 承認ワークフロー画面の作成

## 概要

融資申請の承認ワークフロー画面を作成してください。承認フローの進捗表示、承認・差戻しアクション、コメント入力を1つの画面で行える画面です。

## 使用コンポーネント

- `TimelineComponent` (`fin-timeline`) - 承認フローのステップ表示
- `ModalComponent` (`fin-modal`) - 承認/差戻し確認ダイアログ
- `ButtonComponent` (`fin-button`) - アクションボタン
- `StatusBadgeComponent` (`fin-status-badge`) - 現在のステータス表示
- `FormFieldComponent` (`fin-form-field`) - コメント入力、差戻し理由選択
- `TabsComponent` (`fin-tabs`) - 申請情報の表示切替
- `CurrencyDisplayComponent` (`fin-currency-display`) - 融資金額表示
- `AlertBannerComponent` (`fin-alert-banner`) - 注意事項の表示
- `DataTableComponent` (`fin-data-table`) - 過去の承認履歴表示

## 画面要件

### ファイル配置

```
src/pages/approval-workflow.component.ts
```

### コンポーネント定義

```typescript
@Component({
  selector: 'app-approval-workflow',
  standalone: true,
  imports: [
    CommonModule,
    TimelineComponent,
    ModalComponent,
    ButtonComponent,
    StatusBadgeComponent,
    FormFieldComponent,
    TabsComponent,
    CurrencyDisplayComponent,
    AlertBannerComponent,
    DataTableComponent,
  ],
  template: `...`,
})
export class ApprovalWorkflowComponent { }
```

### 画面構成

2カラムレイアウト（左: メインコンテンツ 2/3幅、右: サイドバー 1/3幅）

### 左カラム: メインコンテンツ

#### 案件ヘッダー
- 申請番号: `LA-2024-003`
- 申請者名: `鈴木一郎`
- 現在のステータス: `fin-status-badge` で表示（processing）

#### 注意事項バナー
`fin-alert-banner` (warning): 「本案件は融資金額が1億円を超えるため、支店長の最終承認が必要です。」

#### 案件詳細タブ
`fin-tabs` で以下を切替表示:

**タブ1: 基本情報** - 融資金額（`fin-currency-display`）、融資種別、期間、金利など
**タブ2: 審査情報**（バッジ: 2） - 信用スコア、財務健全性、担保評価額など
**タブ3: 承認履歴**（バッジ: 3） - `fin-data-table` で過去の承認アクション表示

#### アクションエリア
- コメント入力: `fin-form-field` (textarea)
- ボタン: 「承認する」(primary)、「差戻し」(danger)、「保留にする」(ghost)

### 右カラム: サイドバー

`fin-timeline` で承認フローのステップ表示（completed/current/upcoming）

### モーダル

#### 承認確認モーダル
`fin-modal` (confirmMode) - タイトル: 「融資承認の確認」

#### 差戻しモーダル
`fin-modal` - 差戻し理由の `fin-form-field` (select + textarea)

### レイアウト仕様

```
+-----------------------------------------------------+
| LA-2024-003  鈴木一郎         [処理中]               |
+-----------------------------------------------------+
| [!] 本案件は融資金額が1億円を超えるため...            |
+-------------------------------+---------------------+
| [基本情報] [審査情報] [承認履歴]|  承認フロー          |
|                               |                     |
|  申請者: 鈴木一郎              |  v 申請受付          |
|  融資金額: ¥100,000,000       |  v 一次審査          |
|  種別: 設備投資                |  * 担保評価 <-今ここ  |
|                               |  o 二次審査          |
|                               |  o 最終承認          |
+-------------------------------+  o 融資実行          |
| [審査コメントを入力...]        |                     |
| [承認する] [差戻し] [保留]     |                     |
+-------------------------------+---------------------+
```

## Claude Code への指示例

```
src/pages/approval-workflow.component.ts を作成してください。

exercises/exercise-03.md の要件に従い、承認ワークフロー画面を実装してください。
必ず既存の FinUI コンポーネント（TimelineComponent, ModalComponent, ButtonComponent, StatusBadgeComponent, FormFieldComponent, TabsComponent, CurrencyDisplayComponent, AlertBannerComponent, DataTableComponent）を使用してください。

2カラムレイアウトで、左にタブ切替の案件詳細と承認アクション、右に承認フローのTimelineを表示してください。
承認・差戻しはそれぞれModalで確認ダイアログを表示してください。
```

## 完成後の確認ポイント

- [ ] 使用すべきコンポーネントがすべてimportsに含まれているか
- [ ] 2カラムレイアウトになっているか
- [ ] Timelineが正しくステップ表示されているか（completed/current/upcoming）
- [ ] Tabsで基本情報/審査情報/承認履歴が切り替わるか
- [ ] 「承認する」ボタンで確認Modalが表示されるか
- [ ] 「差戻し」ボタンで差戻しModalが表示されるか
- [ ] 差戻しModal内にFormField（select + textarea）があるか
- [ ] コメント入力がFormFieldで実装されているか
- [ ] AlertBannerが注意事項として表示されているか
- [ ] 金額がCurrencyDisplayで表示されているか
- [ ] 自前でタイムラインやモーダルを実装していないか
