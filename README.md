# スケジュールアプリ

## 概要
Google・Microsoft認証、カレンダー統合、複数組織メンバーシップ、複雑なスケジューリング条件設定、API・Webhook統合機能を備えたスケジューリングアプリケーションです。

## はじめに

### 前提条件

1. パッケージマネージャーとして [Bun](https://bun.sh) をインストール
2. Node.js 18.0.0 以上が必要
3. Supabaseローカル開発用のDocker Desktop
4. OAuth設定用のGoogle Cloud Consoleアカウント
5. OAuth設定用のMicrosoft Azureアカウント（オプション）

### 初期設定

1. **Supabase・Docker セットアップ**
   - Docker Desktopを https://www.docker.com/products/docker-desktop からインストール
   - Supabase CLIをインストール:
     ```bash
     bun install supabase --global
     ```
     
     その他のインストール方法については[こちらのリンク](https://supabase.com/docs/guides/local-development/cli/getting-started?queryGroups=platform&platform=macos&queryGroups=access-method&access-method=postgres)をご確認ください
   - Supabaseサービスを開始:
     ```bash
     supabase start
     ```
   - 注意：これによりSupabaseを通じてローカルPostgreSQLデータベースが設定されます

   - データベースマイグレーションを実行:
     ```bash
     # drizzle-kitによって作成される新しいマイグレーションファイルを作成
     bun run db:generate

     # 保留中のマイグレーションをすべて適用
     supabase migration up
     ```
   - 注意：マイグレーションファイルは `supabase/migrations` ディレクトリに保存されます

2. **認証設定**
   - Google Cloud Consoleにアクセス
   - 新しいプロジェクトを作成
   - Google+ APIを有効化
   - OAuth 2.0認証情報を作成（Webアプリケーションタイプ）
   - 認証済みのJavaScript生成元に `http://localhost:3000` を追加
   - 認証済みのリダイレクトURIに `http://localhost:3000/api/auth/callback/google` を追加
   - Google OAuth クライアントIDとクライアントシークレットを保存

3. **環境設定**
   - サンプル環境ファイルをコピー:
     ```bash
     cp .env.sample .env.local
     ```
   - AUTH_SECRETを生成:
     ```bash
     bunx auth secret
     ```
   - `.env.local`で以下を更新:
     - `NODE_ENV`: "development"に設定
     - `PORT`: デフォルトは3000
     - `AUTH_SECRET`: `bunx auth secret`で生成されたシークレットを貼り付け
     - `AUTH_GOOGLE_ID`: あなたのGoogle OAuth クライアントID
     - `AUTH_GOOGLE_SECRET`: あなたのGoogle OAuth クライアントシークレット
     - `AUTH_MICROSOFT_ID`: （オプション）あなたのMicrosoft Azure アプリケーションID
     - `AUTH_MICROSOFT_SECRET`: （オプション）あなたのMicrosoft Azure クライアントシークレット

### インストールと開発

1. 依存関係をインストール:
```bash
bun install
```

2. 開発サーバーを起動:
```bash
bun dev  # より高速な開発のためturbopackを使用
```

3. ブラウザで [http://localhost:3000](http://localhost:3000) を開く

### 利用可能なコマンド

```bash
bun dev          # turbopackで開発サーバーを開始
bun run build    # 本番ビルドを作成
bun start        # 本番サーバーを開始
bun run lint     # Biome.jsでコードリンティングを実行
bun run format   # Biome.jsでコードリンティング・フォーマットを実行
```

### プロジェクト構造

```
schedule-app/
├── app/                # Next.js appディレクトリ（ページとコンポーネント）
├── components/         # shadcn/ui コンポーネント
├── docs/               # LLM（AIエージェント）用プロジェクトドキュメント
│   └── guidelines/     # LLM（AIエージェント）用ガイドライン（コーディング規約、ベストプラクティスなど）
│   └── requirements/   # 要件
└──  public/            # 静的ファイル
```

### 技術スタック

- **フロントエンド**: shadcn/uiコンポーネント付きNext.js
- **データベース**: Supabase（PostgreSQL）
- **認証**: Google・Microsoft OAuthを使用したSupabase Auth
- **ランタイム**: Bun
- **API**: Honoサーバーレス関数