import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getAccountById } from "@/lib/store/youtube-accounts";
import { runAutoReply } from "@/lib/auto-reply";
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

  const result = await runAutoReply(selectedId);
  return NextResponse.json(result);
}
