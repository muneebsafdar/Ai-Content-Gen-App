// /app/api/credits/deduct/route.ts

import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    // 1. Check Clerk session
    const { userId } = await auth();
    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    // 2. Get full Clerk user to access email
    const clerkUser = await currentUser();
    const email = clerkUser?.emailAddresses?.[0]?.emailAddress;

    if (!email) {
      return new Response(JSON.stringify({ error: "Email not found" }), { status: 400 });
    }

    // 3. Read credits to deduct from request body
    const { creditsToDeduct } = await req.json();

    if (!creditsToDeduct || creditsToDeduct <= 0) {
      return new Response(JSON.stringify({ error: "Invalid credit amount" }), { status: 400 });
    }

    // 4. Find user in database by email
    const user :any = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found in database" }), { status: 404 });
    }

    // 5. Check if user has enough credits
    if (user.credits < creditsToDeduct) {
      return new Response(
        JSON.stringify({ error: "Not enough credits", currentCredits: user.credits }),
        { status: 400 }
      );
    }

    // 6. Deduct credits
    const newBalance = user.credits - creditsToDeduct;

    await db
      .update(users)
      .set({ credits: newBalance, updatedAt: new Date() })
      .where(eq(users.id, user.id));

    return new Response(
      JSON.stringify({
        success: true,
        message: "Credits deducted successfully",
        newBalance,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Server Error" }), { status: 500 });
  }
}
