import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js"

const connectionString = process.env.POSTGRES_URL!
const db = drizzle(connectionString)

export default db