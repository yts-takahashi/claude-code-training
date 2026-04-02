# TaskBoard — タスク管理UIコンポーネント

## プロジェクト概要

タスク管理アプリケーション向けのAngular UIコンポーネント集。
Storybookの導入を学ぶためのスターターAngularプロジェクト。

## 技術スタック

- **フレームワーク**: Angular 17+ (standalone components) + TypeScript
- **スタイリング**: Tailwind CSS 3.4
- **コンポーネントカタログ**: Storybook 8 for Angular（導入予定）
- **テンプレート構文**: Angular 17+ 新制御フロー構文（@if, @for, @switch）

## コンポーネント一覧

| コンポーネント | セレクタ | パス | 用途 |
|---|---|---|---|
| ButtonComponent | `app-button` | `src/app/components/Button` | アクションボタン（4バリアント × 3サイズ） |
| CardComponent | `app-card` | `src/app/components/Card` | コンテンツカード（ボーダー・ホバー対応） |
| BadgeComponent | `app-badge` | `src/app/components/Badge` | ステータスバッジ（5色バリアント） |
| SearchInputComponent | `app-search-input` | `src/app/components/SearchInput` | 検索入力（デバウンス対応） |
| AvatarComponent | `app-avatar` | `src/app/components/Avatar` | ユーザーアバター（画像/イニシャル） |
| ProgressBarComponent | `app-progress-bar` | `src/app/components/ProgressBar` | 進捗バー（4色、ラベル対応） |

## ディレクトリ構成

```
project/
  src/
    app/
      app.component.ts          # ルートコンポーネント
      app.routes.ts             # ルーティング設定
      components/               # UIコンポーネント
        Button/
          button.component.ts
          button.stories.ts     # ← Storybook導入後に作成
          index.ts
        Card/
          card.component.ts
          card.stories.ts       # ← Storybook導入後に作成
          index.ts
        Badge/
        SearchInput/
        Avatar/
        ProgressBar/
  .storybook/                   # ← Storybook導入後に作成
    main.ts
    preview.ts
  angular.json
  package.json
  tailwind.config.js
```

## コーディング規約

- ファイル名はケバブケース（`button.component.ts`、`button.stories.ts`）
- クラス名はパスカルケース（`ButtonComponent`）
- Angular コンポーネントは standalone component として作成する（`standalone: true`）
- テンプレートはインラインテンプレート（`template: \`...\``）を使用
- スタイリングは Tailwind CSS のユーティリティクラスを使用
- コンポーネントは `src/app/components/[ComponentName]/` に配置
- export は各コンポーネントディレクトリの `index.ts` からバレルエクスポート
- import パスは `@components/[ComponentName]` 形式を使用

## Storybook 規約（導入後）

- ストーリーファイルはコンポーネントと同じディレクトリに配置（`*.stories.ts`）
- Meta の title は `'Components/[コンポーネント名]'` 形式
- 各コンポーネントに最低限以下のストーリーを作成:
  - Default: デフォルトの @Input でのレンダリング
  - AllVariants / AllSizes: バリエーションの一覧（該当する場合）
  - 特殊状態: disabled, loading, error 等（該当する場合）
- Controls で全ての @Input を操作可能にする
- @Output がある場合は Actions に表示する
- Decorator でコンポーネントに適切な余白を追加する

## ビルドコマンド

```bash
npm start             # 開発サーバー起動
npm run build         # プロダクションビルド
npm run storybook     # Storybook 起動（導入後）
npm run build-storybook  # Storybook ビルド（導入後）
npm run lint          # lint 実行
```
