import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Ensure the DATABASE_URL is properly decoded
const connectionString = process.env.DB_URL!;

const client = postgres(connectionString);
export const db = drizzle(client);