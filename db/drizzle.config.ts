import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, '../.env')  // <-- adjust relative to this file
});

export default defineConfig({
  dialect: "postgresql",
  schema: "./schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url:"postgresql://postgres:M8eD8X4RbZou@db.xhgmckethgausppcgnpf.supabase.co:5432/postgres"
  },
});
