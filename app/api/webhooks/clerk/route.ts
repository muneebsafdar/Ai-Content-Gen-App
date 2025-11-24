import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";

export async function POST(req: Request) {
  const payload = await req.text();

  const headerList = await headers();

  const svix_id = headerList.get("svix-id");
  const svix_timestamp = headerList.get("svix-timestamp");
  const svix_signature = headerList.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  let evt: any;
  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);

    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as any;

    console.log("✅ Webhook verified:", evt.type);
  } catch (err) {
    console.error("❌ Webhook verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  if (evt.type === "user.created") {
    const { data } = evt;

    try {
      await db.insert(users).values({
        clerkId: data.id,
        email: data.email_addresses[0].email_address,
        credits: 1000,
      });
      
      console.log("✅ User created successfully:", data.id);
    } catch (dbError) {
      console.error("❌ Database error:", dbError);
      // Return 200 to prevent Clerk from retrying
      // (since the webhook was valid, just DB connection failed)
      return NextResponse.json({ 
        success: false, 
        error: "Database connection error" 
      }, { status: 200 });
    }
  }

  return NextResponse.json({ success: true });
}