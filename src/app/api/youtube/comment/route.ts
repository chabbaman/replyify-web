import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { postComment } from "@/lib/youtube";

export async function POST(request: NextRequest) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { videoId, text } = body;

    if (!videoId || !text) {
      return NextResponse.json(
        { error: "Missing videoId or text" },
        { status: 400 }
      );
    }

    const result = await postComment(
      session.accessToken,
      session.refreshToken,
      videoId,
      text
    );
    return NextResponse.json({ success: true, comment: result });
  } catch (error) {
    console.error("Comment error:", error);
    return NextResponse.json(
      { error: "Failed to post comment" },
      { status: 500 }
    );
  }
}
