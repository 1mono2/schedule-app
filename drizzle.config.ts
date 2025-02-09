import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
	dialect: "postgresql",
	migrations: {
		prefix: "supabase",
	},
	schema: "./src/db/schema.ts",
	out: "./supabase/migrations",
	dbCredentials: {
		url: process.env.POSTGRES_URL,
		ssl: false,
	},
	introspect: {
		casing: "camel",
	},
	// Print all statements
	verbose: true,
	// Always ask for confirmation
	strict: true,
} satisfies Config;
