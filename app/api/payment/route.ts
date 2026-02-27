import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";

export async function POST(request: NextRequest) {
  try {
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!convexUrl) {
      return NextResponse.json(
        { error: "Server configuration error - convex URL not set" },
        { status: 500 }
      );
    }

    const convex = new ConvexHttpClient(convexUrl);

    const body = await request.json();
    const { email, plan } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    if (!["starter", "pro", "scale"].includes(plan)) {
      return NextResponse.json(
        { error: "Invalid plan. Must be starter, pro, or scale" },
        { status: 400 }
      );
    }

    const result = await convex.mutation("users:upsertPaymentByEmail" as any, {
      email: email.trim().toLowerCase(),
      plan,
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Payment API error:", error);
    return NextResponse.json(
      { error: "Failed to process payment" },
      { status: 500 }
    );
  }
}
