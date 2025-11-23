import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db"; // your Drizzle DB
import { users } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Only react to user creation events
    if (body.type === "user.created") {
      const clerkId = body.data.id;
      const email = body.data.email_addresses[0].email_address;

      // Insert the user in your DB
      await db.insert(users).values({
        clerkId,
        email,
        credits: 1000, // initial credits
      });
    }

    return NextResponse.json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
