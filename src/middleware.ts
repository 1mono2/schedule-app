import { auth } from "@/lib/auth";

export default auth((request) => {
	const { nextUrl } = request;
	const isLoggedIn = !!request.auth;
	const isAuthRoute = ["/login"].includes(nextUrl.pathname);

	if (!isLoggedIn && !isAuthRoute) {
		return Response.redirect(new URL("/login", nextUrl));
	}

	return;
});

// 以下のパスへルーティングする前に middleware を発火させる
export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|.*\\.png$|.*\\.svg$|.*\\.ico$|.*\\.mp3$).*)",
	],
};
