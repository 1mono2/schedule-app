import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  // クライアント側で使用するsession（useSessionから取得するオブジェクト）にプロパティを追加します。
  interface Session {
    user: DefaultSession["user"];
  }
  interface User {}
}

declare module "next-auth/jwt" {
  // "jwt"コールバックのtokenパラメータに任意のプロパティを追加します。
  interface JWT {}
}