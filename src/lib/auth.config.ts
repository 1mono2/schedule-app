import { DrizzleAdapter } from "@auth/drizzle-adapter"
import db from "@/db"
import Google from "next-auth/providers/google"
import { NextAuthConfig } from "next-auth"


/**
 * NextAuthのオプション等はここで設定する
 * callbackUrlは http://localhost:11000/api/auth/providers を叩いて確認し、GCPに設定する
 */
export const authConfig: NextAuthConfig = {
  adapter: DrizzleAdapter(db),
  providers: [Google({
    authorization: {
      params: {
        prompt: "consent",
        // アプリケーションでアクセストークンを更新する必要がある場合は、値を offline に設定します。
        // ユーザーがブラウザにアクセスしていないとき。これはアクセスを更新する方法です。 トークンを使用します。この値は、 サーバーが更新トークンとアクセス トークンを返すようリクエストします。 認証コードをトークンと交換します。
        access_type: "offline", // https://developers.google.com/identity/protocols/oauth2/web-server#offline
        response_type: "code",
        scope: [
          // CHECK ME https://developers.google.com/identity/protocols/oauth2/scopes?hl=ja
          "openid", // OpenID だとエラーでるのでlower case
          "profile", // Name等
          "email", // Email
          "https://www.googleapis.com/auth/calendar.events", // カレンダーの編集
        ].join(" "), // V5系はstring[]
      },
    },
  })],
  callbacks: {
    async authorized({ auth }) {
      return !!auth;
    },
    async jwt({ token, user }) {
      return token;
    },
    async session({ session, token, user }) {
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 300
  },
}