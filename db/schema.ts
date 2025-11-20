import { pgTable, text, uuid, serial, integer, timestamp } from "drizzle-orm/pg-core";

// Users
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: text("clerk_id").notNull().unique(),
  email: text("email"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Credits
export const credits = pgTable("credits", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  balance: integer("balance").default(0),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// History table
export const history = pgTable("history", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  serviceSlug: text("service_slug"),
  prompt: text("prompt"),
  responseHtml: text("response_html"),
  responseText: text("response_text"),
  creditsConsumed: integer("credits_consumed"),
  tokens: integer("tokens"),
  createdAt: timestamp("created_at").defaultNow(),
});
