import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { getTokensFromCode, getUserInfo } from "@/lib/youtube";
import { createSession } from "@/lib/session";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return new Response("Missing authorization code", { status: 400 });
  }

  let tokens;
  try {
    tokens = await getTokensFromCode(code);
  } catch (error) {
    console.error("Token exchange failed:", error);
    return new Response(
      "Failed to authenticate with Google. Make sure the YouTube Data API is enabled in your Google Cloud project and the redirect URI is configured correctly.",
      { status: 500 }
    );
  }

  if (!tokens.access_token) {
    return new Response("Failed to get access token", { status: 400 });
  }

  let userInfo;
  try {
    userInfo = await getUserInfo(tokens.access_token);
  } catch (error) {
    console.error("Failed to get user info:", error);
    return new Response("Failed to get user profile", { status: 500 });
  }

  await createSession({
    googleId: userInfo.id ?? "",
    email: userInfo.email ?? "",
    name: userInfo.name ?? "",
    picture: userInfo.picture ?? "",
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token ?? "",
  });

  redirect("/dashboard");
}
