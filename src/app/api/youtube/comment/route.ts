import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getAccountById } from "@/lib/store/youtube-accounts";
import { postComment } from "@/lib/youtube";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const cookieStore = await cookies();
  const selectedId = cookieStore.get("selectedAccount")?.value;
  if (!selectedId) {
    return NextResponse.json({ error: "No YouTube account selected" }, { status: 400 });
  }

  const account = await getAccountById(selectedId);
  if (!account || account.userId !== session.userId) {
    return NextResponse.json({ error: "YouTube account not found" }, { status: 404 });
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
      account.accessToken,
      account.refreshToken,
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
