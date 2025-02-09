import { drizzle } from "drizzle-orm/postgres-js";

const connectionString = process.env.POSTGRES_URL;
export const db = drizzle(connectionString);

export default db;
