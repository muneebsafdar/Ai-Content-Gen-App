import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema"; // ⬅ ADD THIS

const connectionString = process.env.DB_URL!;

const client = postgres(connectionString);

export const db = drizzle(client, {
  schema,   // ⬅ REQUIRED so db.query.users works
});
