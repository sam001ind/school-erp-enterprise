import { NextResponse } from "next/server";

// This endpoint receives webhooks from Meta (Facebook/Instagram) Lead Ads
export async function POST(request: Request) {
  try {
    const payload = await request.json();
    
    // Detailed logging for incoming Meta Lead payload
    console.log("Received Meta Webhook Payload:", JSON.stringify(payload, null, 2));

    // Meta Webhook structure usually looks like:
    // { "object": "page", "entry": [ { "changes": [ { "value": { "form_id": "...", "leadgen_id": "..." } } ] } ] }
    // We would extract the leadgen_id and fetch lead details from Graph API.
    // For this boilerplate, we'll simulate the successful parsing and storing.

    // 1. Extract Lead Gen ID
    // 2. Fetch Lead Details from Meta Graph API using the Lead Gen ID and our Page Access Token
    // 3. Map Meta fields (full_name, email, phone_number) to our internal Lead model
    // 4. Save to Database (e.g. Prisma or Supabase)

    return NextResponse.json({ success: true, message: "Lead processed successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error processing Meta webhook:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

// Meta requires a GET endpoint for webhook verification (hub.challenge)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const VERIFY_TOKEN = process.env.META_WEBHOOK_VERIFY_TOKEN || "my_institution_secret_token";

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      return new NextResponse(challenge, { status: 200 });
    } else {
      return new NextResponse("Forbidden", { status: 403 });
    }
  }
  return new NextResponse("Bad Request", { status: 400 });
}
