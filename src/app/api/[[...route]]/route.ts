import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";


const app = new Hono().basePath("/api")
app.use("*", logger());
app.use("*", cors());

app.get("/", (c) => c.text("Hello World"))

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)
