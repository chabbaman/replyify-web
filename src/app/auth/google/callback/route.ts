import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { randomUUID } from "crypto";
import { errorPage } from "@/lib/error-page";
import { getTokensFromCode, getUserInfo, getMyChannel } from "@/lib/youtube";
import { getSession } from "@/lib/session";
import * as store from "@/lib/store";

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) redirect("/login");

  const error = request.nextUrl.searchParams.get("error");
  if (error) {
    redirect("/dashboard");
  }

  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return errorPage("Missing Code", "No authorization code was provided.", 400);
  }

  let tokens;
  try {
    tokens = await getTokensFromCode(code);
  } catch (error) {
    console.error("Token exchange failed:", error);
    return errorPage(
      "Authentication Failed",
      "Failed to authenticate with Google. Make sure the YouTube Data API is enabled in your Google Cloud project and the redirect URI is configured correctly.",
      500
    );
  }

  if (!tokens.access_token) {
    return errorPage("No Access Token", "Failed to get access token from Google.", 400);
  }

  let userInfo;
  try {
    userInfo = await getUserInfo(tokens.access_token);
  } catch (error) {
    console.error("Failed to get user info:", error);
    return errorPage("Profile Error", "Failed to get user profile from Google.", 500);
  }

  const googleId = userInfo.id ?? "";
  const existing = await store.youtubeAccounts.getAccountByGoogleId(googleId);
  if (existing) {
    return errorPage(
      "Account Already Linked",
      "This YouTube account is already linked to another user.",
      409
    );
  }

  let channelId = "";
  try {
    const channel = await getMyChannel(tokens.access_token, tokens.refresh_token ?? "");
    if (channel?.id) channelId = channel.id;
  } catch {
    // Channel fetch is best-effort; can be updated later
  }

  const account: store.YouTubeAccount = {
    id: randomUUID(),
    userId: session.userId,
    googleId,
    email: userInfo.email ?? "",
    name: userInfo.name ?? "",
    picture: userInfo.picture ?? "",
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token ?? "",
    channelId,
    linkedAt: new Date().toISOString(),
  };

  await store.youtubeAccounts.createYouTubeAccount(account);

  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  cookieStore.set("selectedAccount", account.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  redirect("/dashboard");
}
