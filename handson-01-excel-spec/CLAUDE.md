# 融資管理システム (LoanFlow) - プロジェクト設定

## プロジェクト概要

金融機関向けの融資管理システム。融資申請から承認・実行・返済管理までの一連のプロセスをカバーする。

## 技術スタック

- **フロントエンド**: Angular 17+ (standalone components) + TypeScript 5.x
- **UIライブラリ**: Tailwind CSS 3.x + Angular Material
- **バックエンド**: NestJS 10+ + TypeScript 5.x
- **ORM**: Prisma 5.x
- **データベース**: PostgreSQL 16
- **認証**: Passport + JWT (NestJS Guard)
- **テスト**: Jest + Testing Library + Cypress (E2E)

## ディレクトリ構成方針

```
loanflow/
  frontend/                  # Angular アプリケーション
    src/
      app/
        core/                # シングルトンサービス・ガード・インターセプター
          guards/            # AuthGuard, RoleGuard 等
          interceptors/      # HTTP インターセプター（認証ヘッダ付与等）
          services/          # AuthService 等のコアサービス
        shared/              # 共有コンポーネント・パイプ・ディレクティブ
          components/        # 汎用UIコンポーネント（ボタン、テーブル等）
          pipes/             # カスタムパイプ（金額フォーマット等）
          directives/        # カスタムディレクティブ
        features/            # 機能モジュール（lazy loaded）
          auth/              # ログイン・認証関連
          dashboard/         # ダッシュボード
          loan-applications/ # 融資申請（一覧・詳細・新規作成）
          customers/         # 顧客管理
          collaterals/       # 担保管理
          repayments/        # 返済管理
        models/              # インターフェース・型定義
      environments/          # 環境設定ファイル
    angular.json
    tailwind.config.js
  backend/                   # NestJS アプリケーション
    src/
      modules/
        auth/                # 認証モジュール（Passport + JWT）
        loan-applications/   # 融資申請モジュール
        customers/           # 顧客モジュール
        collaterals/         # 担保モジュール
        repayments/          # 返済モジュール
        loan-products/       # 融資商品モジュール
      common/
        decorators/          # カスタムデコレーター
        filters/             # 例外フィルター
        guards/              # 認証・認可ガード
        interceptors/        # レスポンス変換等
        validators/          # カスタムバリデーター（class-validator）
      prisma/                # PrismaService（NestJS ラッパー）
    prisma/
      schema.prisma          # Prisma スキーマ
      migrations/            # マイグレーションファイル
      seed.ts                # シードデータ
```

## コーディング規約

- ファイル名はケバブケース（Angular CLI 標準: `loan-application-list.component.ts`）
- クラス名はパスカルケース（`LoanApplicationListComponent`）
- 変数名・関数名・プロパティ名はキャメルケース（TypeScript 標準）
- DBカラム名はスネークケース（Prismaの `@map` で対応）
- Angular コンポーネントは standalone component として作成する（`standalone: true`）
- サービスは `@Injectable({ providedIn: 'root' })` または機能モジュール内で提供
- NestJS のコントローラー・サービス・モジュールは NestJS CLI の命名規約に従う
- APIレスポンスはキャメルケースに変換して返す
- バリデーションは NestJS 側で `class-validator` + `class-transformer` を使用
- Angular 側のフォームバリデーションは Reactive Forms で実装
- エラーハンドリングは NestJS の Exception Filter パターンを使用
- 金額は整数（円単位）で扱い、表示時にパイプでフォーマットする

## AI への指示方針

- 仕様書（Excel）に記載されたテーブル定義・API仕様・ビジネスルールに厳密に従うこと
- 仕様書に記載のないカラムやAPIを勝手に追加しないこと
- 不明点がある場合は実装前に質問すること
- バリデーションルールは仕様書の「バリデーション定義」シートに準拠すること
- 権限チェックは「権限マトリクス」シートに従って実装すること
- ビジネスルールの計算式は「ビジネスルール」シートの記載を正確に実装すること
- テストコードも同時に生成すること（ユニットテスト必須）

## 仕様書の場所

`specs/融資管理システム仕様書.xlsx` に全仕様が記載されている。

### シート構成

1. **システム概要** - 技術スタック・機能一覧
2. **テーブル定義** - 全テーブルのカラム定義・制約
3. **API仕様** - RESTful API エンドポイント一覧
4. **画面仕様** - 画面構成・操作・バリデーション
5. **ビジネスルール** - 与信計算・承認フロー等のロジック
6. **バリデーション定義** - 入力項目ごとのバリデーションルール
7. **権限マトリクス** - ロール別の操作権限

## 注意事項

- 金融システムのため、計算の正確性は最重要。特に金利計算・返済額計算は小数点以下の丸め処理に注意
- 監査ログは全操作に必須
- 論理削除を採用（物理削除は行わない）
- タイムゾーンは Asia/Tokyo を前提
