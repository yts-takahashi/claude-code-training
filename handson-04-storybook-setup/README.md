# ハンズオン04: Angular プロジェクトに Storybook を導入する

## 目的

既存のAngularプロジェクトにStorybookを導入し、コンポーネントカタログを構築する一連の流れをClaude Codeを使って体験します。

このハンズオンを通じて、以下を習得します:

- Storybook の基本概念と Angular プロジェクトへの導入方法
- Claude Code を使った Storybook の自動セットアップ
- コンポーネントのストーリー（.stories.ts）の書き方
- Controls / Args / Decorators など Storybook の主要機能
- 効率的なストーリー生成のためのプロンプトテクニック

## 前提条件

### 環境

- Claude Code インストール済み
- Node.js 18以上
- Angular CLI インストール済み

### 事前準備

```bash
cd handson-04-storybook-setup/project
npm install
```

### ファイル構成

```
handson-04-storybook-setup/
├── CLAUDE.md
├── README.md
├── slides.html
└── project/                          # スターターAngularプロジェクト
    ├── src/
    │   └── app/
    │       └── components/
    │           ├── Button/           # ボタンコンポーネント
    │           ├── Card/             # カードコンポーネント
    │           ├── Badge/            # バッジコンポーネント
    │           ├── SearchInput/      # 検索入力コンポーネント
    │           ├── Avatar/           # アバターコンポーネント
    │           └── ProgressBar/      # プログレスバーコンポーネント
    ├── angular.json
    ├── package.json
    └── tailwind.config.js
```

---

## Step 0: プロジェクト確認（5分）

まず、スターターAngularプロジェクトの状態を確認します。6つのコンポーネントがすでに用意されていますが、Storybookはまだ導入されていません。

```bash
cd handson-04-storybook-setup/project
npm start
```

ブラウザで `http://localhost:4200` にアクセスし、アプリが正常に起動することを確認してください。

確認すべきポイント:
- `src/app/components/` にある6つのコンポーネント（Button, Card, Badge, SearchInput, Avatar, ProgressBar）を確認する
- 各コンポーネントの `@Input` / `@Output` を把握する
- 使用可能なバリアント（variant, size など）を確認する

#### 検証チェックポイント

- [ ] `npm start` でアプリが正常に起動するか
- [ ] `src/app/components/` に6つのコンポーネントディレクトリがあるか
- [ ] 各コンポーネントの `@Input` / `@Output` を確認したか

---

## Step 1: Claude Code で Storybook を導入する（10分）

Claude Code に Storybook のセットアップを依頼します。Storybook 8 + Angular の組み合わせで、Tailwind CSS も Storybook 内で動作するように設定します。

#### プロンプト例

```
このAngularプロジェクトに Storybook 8 を導入してください。

以下の要件で設定してください:
- @storybook/angular を使用
- .storybook/ ディレクトリに設定ファイルを配置
- Tailwind CSS が Storybook 内でも適用されるように設定
- package.json に storybook と build-storybook スクリプトを追加
- preview.ts で Angular の基本的なデコレーターを設定
```

#### 検証チェックポイント

- [ ] `.storybook/` ディレクトリが作成されているか
- [ ] `.storybook/main.ts` に正しい設定があるか（`framework: '@storybook/angular'`）
- [ ] `.storybook/preview.ts` が作成されているか
- [ ] `package.json` に `@storybook/angular` 等の依存関係が追加されているか
- [ ] `npm run storybook` で Storybook が起動するか（http://localhost:6006）
- [ ] Tailwind CSS のスタイルが Storybook 内で適用されているか

---

## Step 2: 最初のストーリーを作成する -- Button（10分）

最初のストーリーファイルとして、Button コンポーネントを対象にします。Claude Code にコンポーネントの実装を読ませた上でストーリーを生成させることで、正確な `@Input` / `@Output` を反映したストーリーが得られます。

#### プロンプト例

```
src/app/components/Button/button.component.ts を読んで、
このコンポーネントの Storybook ストーリーファイル
（src/app/components/Button/button.stories.ts）を作成してください。

以下を含めてください:
- デフォルトストーリー（Default）
- 全バリアント一覧（AllVariants）: primary, secondary, danger, ghost を横並び
- 全サイズ一覧（AllSizes）: sm, md, lg を横並び
- ローディング状態（Loading）
- 無効状態（Disabled）
- Controls で variant, size, disabled, loading を操作できるようにすること
- Meta の title は 'Components/Button' とする
```

#### 検証チェックポイント

- [ ] `button.stories.ts` が作成されているか
- [ ] Storybook でストーリーが表示されるか
- [ ] Controls パネルで variant / size / disabled / loading を変更できるか
- [ ] 各バリアントの色が正しく表示されるか
- [ ] AllVariants ストーリーで全バリアントが横並びで確認できるか
- [ ] clicked イベントが Actions パネルに表示されるか

---

## Step 3: 残り5コンポーネントのストーリーを一括生成（15分）

Button のストーリーが完成したら、残りの5コンポーネント（Card, Badge, SearchInput, Avatar, ProgressBar）のストーリーを一括で生成します。先に作成した Button のストーリーをフォーマットの参考として指定することで、統一されたスタイルのストーリーが生成されます。

#### プロンプト例

```
src/app/components/ にある残り5つのコンポーネント（Card, Badge, SearchInput, Avatar, ProgressBar）の
ストーリーファイルを一括で作成してください。

各ストーリーには以下を含めてください:
- Default ストーリー
- 主要なバリエーションを網羅するストーリー
- Controls で全ての @Input を操作できるようにする
- @Output がある場合は Actions に表示する
- Meta の title は 'Components/[コンポーネント名]' 形式

参考: 先ほど作成した Button のストーリー（src/app/components/Button/button.stories.ts）の
フォーマットに合わせてください。
```

#### 検証チェックポイント

**Card:**
- [ ] Default / Bordered / Hoverable / WithSubtitle ストーリーがあるか
- [ ] title, subtitle, bordered, hoverable が Controls で操作できるか

**Badge:**
- [ ] Default / AllVariants / AllSizes ストーリーがあるか
- [ ] variant, size が Controls で操作できるか

**SearchInput:**
- [ ] Default ストーリーがあるか
- [ ] searchChange イベントが Actions に表示されるか
- [ ] debounceMs が Controls で変更できるか

**Avatar:**
- [ ] Default / WithImage / AllSizes / Initials ストーリーがあるか
- [ ] name, imageUrl, size が Controls で操作できるか

**ProgressBar:**
- [ ] Default / AllColors / Complete / WithCustomLabel ストーリーがあるか
- [ ] value をスライダーで操作できるか

---

## Step 4: ストーリーをカスタマイズする（15分）

このステップでは、Storybook の高度な機能（Decorator, play function, グローバル設定）を学びます。Claude Code にカスタマイズを依頼し、より実践的なストーリーに仕上げます。

#### プロンプト例

```
以下の Storybook カスタマイズを行ってください:

1. Button ストーリーに Decorator を追加して、全ストーリーに余白（padding: 24px）を付ける
2. Card ストーリーに、実際のコンテンツ（リスト項目やテキスト）を含むストーリー（RealWorldExample）を追加する
3. SearchInput ストーリーに、play function を使った自動テスト（文字入力してイベント発火を確認）を追加する
4. .storybook/preview.ts にグローバルデコレーターを追加して、全コンポーネントの背景色をカスタマイズ可能にする
5. 各コンポーネントのストーリーに JSDoc コメントで説明を追加する
```

#### 検証チェックポイント

- [ ] Decorator による余白が適用されているか
- [ ] RealWorldExample が実際のユースケースを示しているか
- [ ] play function のテストが Interactions パネルで確認できるか
- [ ] Toolbar で背景色を変更できるか
- [ ] Docs ページにコンポーネントの説明が表示されるか

---

## Step 5: 新しいコンポーネントをストーリーと一緒に作成する（15分）

ここまでの知識を応用して、新しいコンポーネントをストーリー付きで最初から作成します。コンポーネントの仕様とストーリーの構成を同時に指示することで、Claude Code がコンポーネントとストーリーをセットで生成します。

#### プロンプト例

```
新しいコンポーネント「Tooltip」を作成してください。
コンポーネントとストーリーを同時に作成してください。

コンポーネント仕様:
- selector: app-tooltip
- @Input: text (string) - ツールチップのテキスト
- @Input: position ('top' | 'bottom' | 'left' | 'right') - 表示位置（デフォルト: 'top'）
- @Input: delay (number) - 表示までの遅延ms（デフォルト: 200）
- ng-content でトリガー要素を受け取る
- ホバー時にツールチップを表示、離れると非表示
- Tailwind CSS でスタイリング
- standalone: true

ストーリー:
- Default: ボタンにツールチップを付けた基本例
- AllPositions: 上下左右の表示位置を一覧
- WithDelay: 遅延表示の例
- Controls で text, position, delay を操作可能

配置先: src/app/components/Tooltip/
```

#### 検証チェックポイント

- [ ] `tooltip.component.ts` と `tooltip.stories.ts` の両方が作成されているか
- [ ] ホバーでツールチップが表示されるか
- [ ] 4方向の position が正しく機能するか
- [ ] delay が適用されているか
- [ ] ストーリーが Storybook に表示されるか
- [ ] Controls で操作できるか

---

## Storybook活用のコツ

### 効率的なストーリー生成のプロンプトパターン

**悪い例:**
```
Storybookのストーリーを作って
```
→ どのコンポーネントか不明。最低限のストーリーしか生成されない。

**良い例:**
```
src/app/components/Button/button.component.ts を読んで、
ストーリーファイルを作成してください。
全バリアントと全サイズの組み合わせを網羅してください。
```
→ コンポーネントの実装を読ませることで、正確な `@Input` / `@Output` を把握させられる。

**より良い例:**
```
src/app/components/Button/button.component.ts を読んで、
以下の構成でストーリーを作成してください:
- Default: variant='primary', size='md'
- AllVariants: primary/secondary/danger/ghost を横並び表示
- AllSizes: sm/md/lg を横並び表示
- Loading: loading=true の状態
- Disabled: disabled=true の状態
Controls で variant, size, disabled, loading を操作可能にしてください。
Meta title は 'Components/Button' としてください。
```
→ 具体的なストーリー名と構成を明示。期待する出力が明確。

### ストーリー作成のベストプラクティス

1. **コンポーネントごとに最低限 Default + AllVariants を作る** -- バリエーションを一目で確認できるようにする
2. **`@Input` の全組み合わせをストーリーで網羅する** -- テスト漏れを防ぐ
3. **`@Output` は Actions パネルで確認できるようにする** -- イベント発火を視覚的に確認
4. **実際のユースケースに近いデータでストーリーを書く** -- ダミーデータではなく現実的なデータを使う
5. **play function でインタラクションテストを追加する** -- 手動テストを自動化できる

---

## 所要時間の目安

| ステップ | 所要時間 |
|---------|---------|
| Step 0: プロジェクト確認 | 5分 |
| Step 1: Storybook導入 | 10分 |
| Step 2: 最初のストーリー（Button） | 10分 |
| Step 3: 残り5コンポーネントの一括生成 | 15分 |
| Step 4: ストーリーのカスタマイズ | 15分 |
| Step 5: 新コンポーネント＋ストーリー同時作成 | 15分 |
| **合計** | **約70分** |

---

## トラブルシューティング

### Storybook が起動しない場合

```bash
# キャッシュをクリアして再起動
npx storybook@latest doctor
rm -rf node_modules/.cache/storybook
npm run storybook
```

### Tailwind CSS が Storybook 内で適用されない場合

`.storybook/preview.ts` に `styles.css` のインポートを追加してください:

```typescript
import '../src/styles.css';
```

### コンポーネントが Storybook に表示されない場合

- `stories.ts` ファイルのパスが `.storybook/main.ts` の `stories` パターンに一致しているか確認する
- `Meta` の `component` プロパティに正しいコンポーネントクラスが指定されているか確認する

### Angular のエラーが出る場合

Claude Code にエラーメッセージをそのまま貼り付けて修正を依頼してください:

```
このエラーを修正してください: [エラーメッセージを貼り付け]
```

### ストーリーで @Output イベントが表示されない場合

- `argTypes` で action を定義しているか確認する
- `@storybook/addon-essentials` がインストールされているか確認する
