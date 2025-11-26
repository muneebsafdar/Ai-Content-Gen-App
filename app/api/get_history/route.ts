// /app/api/history/route.ts

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db/index";
import { history, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    // 1. Get Clerk user
    const { userId } = await auth();

    if (!userId) {
      return Response.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // 2. Find database user by clerkId
    const dbUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId))
      .limit(1);

    if (dbUser.length === 0) {
      return Response.json(
        { error: "User not found in database" },
        { status: 404 }
      );
    }

    // 3. Fetch user history
    const userHistory = await db
      .select()
      .from(history)
      .where(eq(history.userId, dbUser[0].id))
      .orderBy(history.createdAt);

    return Response.json({ history: userHistory });
  } catch (error) {
    console.error("Error fetching history:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
