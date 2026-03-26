# ハンズオン03: 既存Storybookコンポーネントを活用したAI駆動開発

## 目的

このハンズオンでは、既存のコンポーネントライブラリ（Storybook）をClaude Codeに認識させ、新しい画面を効率的に構築する方法を学びます。

**学習のゴール:**
- Claude Codeが既存コンポーネントを理解し、適切に活用してコードを生成できることを体験する
- CLAUDE.md によるプロジェクトルールの設定方法を理解する
- コンポーネント再利用率を最大化するプロンプトの書き方を習得する

## 前提知識

- React / TypeScript の基礎知識
- Storybook の基本的な使い方
- Claude Code の基本操作

## Storybook MCP について

Storybook MCP は、StorybookのコンポーネントカタログをClaude Codeから直接参照可能にするMCPサーバーです。これにより、Claude Codeはコンポーネントのインターフェース、バリアント、使用例をリアルタイムで把握し、より正確なコード生成が可能になります。

**主な利点:**
- コンポーネントのProps定義を自動的に把握
- ストーリーから実際の使い方パターンを学習
- バリアント（variant, sizeなど）の正確な指定

> 本ハンズオンでは Storybook MCP の有無にかかわらず実施できます。MCP を設定しない場合でも、CLAUDE.md と既存コードの参照によりClaude Codeはコンポーネントを活用できます。

## 事前準備

### 1. 依存パッケージのインストール

```bash
cd handson-03-storybook-components
npm install
```

### 2. Storybookの起動確認

```bash
npm run storybook
```

ブラウザで http://localhost:6006 にアクセスし、コンポーネントカタログが表示されることを確認してください。

### 3. プロジェクト構成の確認

```
handson-03-storybook-components/
├── CLAUDE.md                  ← Claude Code用のプロジェクト設定
├── src/
│   ├── components/           ← FinUIコンポーネントライブラリ
│   │   ├── Button/
│   │   ├── DataTable/
│   │   ├── KPICard/
│   │   ├── StatusBadge/
│   │   ├── Modal/
│   │   ├── LineChart/
│   │   ├── PieChart/
│   │   ├── SearchInput/
│   │   ├── Tabs/
│   │   ├── FormField/
│   │   ├── Sidebar/
│   │   ├── NotificationBell/
│   │   ├── CurrencyDisplay/
│   │   ├── Timeline/
│   │   ├── AlertBanner/
│   │   └── index.ts           ← 一括エクスポート
│   └── index.css
├── exercises/                 ← 演習課題
│   ├── exercise-01.md
│   ├── exercise-02.md
│   └── exercise-03.md
├── .storybook/
│   ├── main.ts
│   └── preview.ts
└── package.json
```

---

## Step 1: Storybookを起動してコンポーネントを確認

Storybookを起動し、FinUIデザインシステムに含まれるコンポーネントを確認しましょう。

```bash
npm run storybook
```

以下のコンポーネントが用意されています。各コンポーネントのストーリーを確認し、Props やバリアントを把握してください。

| カテゴリ | コンポーネント | 主な用途 |
|---|---|---|
| 基本UI | Button, FormField, SearchInput | フォーム、アクション |
| データ表示 | DataTable, KPICard, CurrencyDisplay | 一覧、指標、金額 |
| チャート | LineChart, PieChart | グラフ、構成比 |
| ステータス | StatusBadge, AlertBanner | 状態表示、通知 |
| レイアウト | Sidebar, Tabs, Modal | ナビ、タブ、ダイアログ |
| ワークフロー | Timeline, NotificationBell | 承認フロー、通知 |

---

## Step 2: CLAUDE.md の内容を確認

プロジェクトルートの `CLAUDE.md` を確認してください。このファイルがClaude Codeにプロジェクトの規約を伝えます。

```bash
cat CLAUDE.md
```

**CLAUDE.md の重要なポイント:**

1. **コンポーネント一覧と用途** - 各コンポーネントのパスと役割が明記されている
2. **必須ルール** - 「新規画面を作成する際は、必ず既存コンポーネントを使用すること」
3. **import パス規約** - `@/components/ComponentName` 形式
4. **スタイリング規約** - Tailwind CSS の `fin-*` カスタムカラー
5. **金融ドメインの表示規約** - 金額はCurrencyDisplay、ステータスはStatusBadge

> これらの規約により、Claude Codeは自前のUIを作らず、既存コンポーネントを優先的に使用するようになります。

---

## Step 3: Exercise 1を実行 - 融資申請一覧画面

### 演習の内容

`exercises/exercise-01.md` を確認してください。融資申請の一覧画面を、DataTable, StatusBadge, SearchInput, Button, CurrencyDisplay を使って構築します。

### Claude Codeへのプロンプト例

Claude Codeを起動し、以下のようにプロンプトを入力してください:

```
src/pages/LoanApplicationList.tsx を作成してください。

exercises/exercise-01.md の要件に従い、融資申請一覧画面を実装してください。
必ず既存の FinUI コンポーネント（DataTable, StatusBadge, SearchInput, Button, CurrencyDisplay）を使用してください。

サンプルデータは15件以上用意し、検索・フィルター・ソート・ページネーションの機能を実装してください。
```

### 実行のポイント

- Claude Code は CLAUDE.md を読んでコンポーネントの存在を認識します
- 具体的に「既存コンポーネントを使用してください」と指示することで再利用率が上がります
- 使用するコンポーネント名を明示的に列挙すると、より確実に使用されます

---

## Step 4: 生成されたコードの検証

Claude Codeが生成したコードを確認し、以下のチェックリストで検証してください。

### 検証チェックリスト

```
□ 既存コンポーネントが import されているか
  → import { DataTable } from '@/components/DataTable'
  → import { StatusBadge } from '@/components/StatusBadge'
  → import { SearchInput } from '@/components/SearchInput'
  → import { Button } from '@/components/Button'
  → import { CurrencyDisplay } from '@/components/CurrencyDisplay'

□ 自前のテーブルやバッジが作られていないか
  → <table> タグの直接使用がないこと
  → ステータスの色分けを自前で実装していないこと

□ コンポーネントのPropsが正しく使われているか
  → DataTable の columns, pagination, selectable
  → StatusBadge の status prop
  → SearchInput の debounceMs
  → Button の variant, size, iconLeft

□ Tailwind CSS のレイアウトクラスが使われているか
  → flex, grid, gap, p-, m- など
```

### よくある問題と対処法

**問題: テーブルが自前実装されている**
```
「DataTable コンポーネントを使ってテーブルを書き直してください。
src/components/DataTable/DataTable.tsx の Column 型定義と render prop を使ってください。」
```

**問題: ステータスの色分けが自前実装されている**
```
「StatusBadge コンポーネントを使ってステータスを表示してください。
status prop に 'approved' | 'pending' | 'rejected' | 'processing' | 'expired' を渡せます。」
```

---

## Step 5: Exercise 2, 3を実行

### Exercise 2: 融資審査ダッシュボード

`exercises/exercise-02.md` を確認し、KPICard, LineChart, PieChart, DataTable, AlertBanner, Tabs を組み合わせたダッシュボードを構築してください。

```
src/pages/ReviewDashboard.tsx を作成してください。

exercises/exercise-02.md の要件に従い、融資審査ダッシュボード画面を実装してください。
必ず既存の FinUI コンポーネント（KPICard, LineChart, PieChart, DataTable, AlertBanner, StatusBadge, CurrencyDisplay, Tabs）を使用してください。
```

### Exercise 3: 承認ワークフロー画面

`exercises/exercise-03.md` を確認し、Timeline, Modal, Button, StatusBadge, FormField, Tabs を組み合わせた承認画面を構築してください。

```
src/pages/ApprovalWorkflow.tsx を作成してください。

exercises/exercise-03.md の要件に従い、承認ワークフロー画面を実装してください。
必ず既存の FinUI コンポーネント（Timeline, Modal, Button, StatusBadge, FormField, Tabs, CurrencyDisplay, AlertBanner, DataTable）を使用してください。
```

---

## コンポーネント再利用率を上げるコツ

### 1. CLAUDE.md に明確なルールを書く

効果が高い記述:
- 「新規画面を作成する際は、必ず既存コンポーネントを使用すること」
- コンポーネントの一覧表（パス、用途）
- import パスの規約
- ドメイン固有の表示規約（金額はCurrencyDisplay、ステータスはStatusBadge）

### 2. プロンプトでコンポーネント名を明示する

```
# 効果が低い
「融資一覧画面を作ってください」

# 効果が高い
「DataTable, StatusBadge, SearchInput, Button, CurrencyDisplay を使って
融資一覧画面を作ってください」
```

### 3. 要件定義にコンポーネントのマッピングを含める

```
# 効果が高い
「融資金額カラムは CurrencyDisplay コンポーネントで表示してください。
ステータスカラムは StatusBadge コンポーネントを使い、
status prop には 'approved' | 'pending' | 'rejected' を渡してください。」
```

### 4. Storybook のストーリーを参照させる

```
「src/components/DataTable/DataTable.stories.tsx のサンプルデータ構造を参考に、
同じパターンでページを作成してください。」
```

### 5. 段階的に構築する

一度にすべてを生成するよりも、セクションごとに確認しながら進める方が再利用率が高くなります:
1. まずヘッダーとKPIカードを生成
2. 次にチャートエリアを追加
3. 最後にテーブルを追加

---

## AIが既存コンポーネントを無視するとき - トラブルシューティング

### 症状1: 自前の `<table>` タグでテーブルを実装してしまう

**原因:** DataTable コンポーネントの存在を認識していない、または要件がDataTableの機能を超えていると判断している

**対処法:**
```
「<table> タグの直接使用ではなく、src/components/DataTable/DataTable.tsx の
DataTable コンポーネントを使ってください。
Column 型の render prop でカスタムセルレンダリングができます。
DataTable.stories.tsx を参考にしてください。」
```

### 症状2: ステータスの色分けを独自CSSで実装してしまう

**原因:** StatusBadge の存在を知らない

**対処法:**
```
「ステータスの表示には StatusBadge コンポーネントを使ってください。
import { StatusBadge } from '@/components/StatusBadge' でインポートし、
<StatusBadge status="approved" /> のように使います。」
```

### 症状3: CSS-in-JS やインラインスタイルを使ってしまう

**原因:** CLAUDE.md のスタイリング規約を読んでいない

**対処法:**
```
「CLAUDE.md のスタイリング規約に従い、Tailwind CSS のユーティリティクラスのみを使用してください。
インラインスタイルや CSS-in-JS は使わないでください。
金融系カスタムカラーは fin-primary, fin-danger, fin-success を使用してください。」
```

### 症状4: コンポーネントの Props を間違えて使う

**原因:** Props 定義を正確に把握していない

**対処法:**
```
「src/components/DataTable/DataTable.tsx の型定義を確認して、
正しい Props で DataTable を使ってください。
特に columns の Column<T> 型定義と、render prop の使い方を確認してください。」
```

### 症状5: import パスが規約と異なる

**原因:** 相対パスで import してしまう

**対処法:**
```
「import パスは '@/components/ComponentName' の形式にしてください。
例: import { Button } from '@/components/Button'
相対パスではなくエイリアスパスを使用してください。」
```

### 一般的な予防策

1. **CLAUDE.md を充実させる** - コンポーネント一覧、使用規約、importパス規約を明記
2. **プロンプトで明示する** - 使用すべきコンポーネントを列挙
3. **ストーリーを参照させる** - 「xxx.stories.tsx を参考に」と指示
4. **生成後にレビューする** - チェックリストで確認し、修正を依頼
5. **段階的に構築する** - 一度に全部作らず、セクションごとに確認

---

## まとめ

このハンズオンで学んだこと:

1. **CLAUDE.md の重要性** - プロジェクトルールをAIに伝える最も効果的な方法
2. **明示的な指示の効果** - コンポーネント名を列挙することで再利用率が大幅に向上
3. **Storybook との連携** - ストーリーがAIのコード生成の参考資料として機能する
4. **検証の重要性** - 生成されたコードが規約に準拠しているかの確認が不可欠
5. **トラブルシューティング** - AIが既存コンポーネントを無視する場合の具体的な対処法

エンジニアリングマネージャーとして、チームにこのプラクティスを展開する際のポイント:
- CLAUDE.md をチームの共有資産として管理する
- コンポーネントライブラリの Storybook を常に最新に保つ
- コード生成後のレビュー基準（コンポーネント再利用率）を設ける
- プロンプトテンプレートをチーム内で共有する
