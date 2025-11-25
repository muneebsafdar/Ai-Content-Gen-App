import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { history, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    // Clerk authentication
    const { userId } = await auth();
    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get full Clerk user to extract email
    const clerkUser = await currentUser();
    const email = clerkUser?.emailAddresses?.[0]?.emailAddress;

    if (!email) {
      return Response.json({ error: "Email not found in Clerk" }, { status: 400 });
    }

    // Read request body
    const body = await req.json();
    const { responseHtml, responseText, serviceSlug, creditsConsumed } = body;

    if (!serviceSlug || !creditsConsumed) {
      return Response.json(
        { error: "Missing required fields: serviceSlug or creditsConsumed" },
        { status: 400 }
      );
    }

    // Find user from DB using Clerk email
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      return Response.json(
        { error: "User not found in database" },
        { status: 404 }
      );
    }

    // Insert history record
    await db.insert(history).values({
      userId: user.id,
      serviceSlug,
      responseText: responseText || null,
      creditsConsumed,
    });

    return Response.json(
      { message: "History saved successfully" },
      { status: 200 }
    );

  } catch (err) {
    console.error("Error saving history:", err);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
