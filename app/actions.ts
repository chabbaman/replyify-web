"use server";

import { ConvexHttpClient } from "convex/browser";
import { makeFunctionReference } from "convex/server";

const syncUserFromWorkOS = makeFunctionReference<
  "mutation",
  { externalUserId: string; email: string },
  { userId: string; email: string }
>("users:syncUserFromWorkOS");

export async function syncWorkOSUser(externalUserId: string, email: string) {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!convexUrl) {
    throw new Error("Missing NEXT_PUBLIC_CONVEX_URL");
  }

  const convex = new ConvexHttpClient(convexUrl);
  
  try {
    const result = await convex.mutation(syncUserFromWorkOS, {
      externalUserId,
      email,
    });
    return result;
  } catch (error) {
    console.error("Failed to sync user:", error);
    throw error;
  }
}
