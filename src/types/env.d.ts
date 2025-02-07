declare namespace NodeJS {
	interface ProcessEnv {
		POSTGRES_URL: string;
		AUTH_SECRET: string;
		AUTH_GOOGLE_ID: string;
		AUTH_GOOGLE_SECRET: string;
		MICROSOFT_CLIENT_ID: string;
		MICROSOFT_CLIENT_SECRET: string;
	}
}
