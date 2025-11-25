import { pgTable, text, uuid, integer, timestamp } from "drizzle-orm/pg-core";

// Users table with credits merged
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: text("clerk_id").notNull().unique(),
  email: text("email").unique(),
  credits: integer("credits").default(1000), // user's credit balance
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// History table linked to users
export const history = pgTable("history", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(), // FK reference to users.id
  serviceSlug: text("service_slug"),
  responseHtml: text("response_html"),
  responseText: text("response_text"),
  creditsConsumed: integer("credits_consumed"),
  createdAt: timestamp("created_at").defaultNow(),
});
