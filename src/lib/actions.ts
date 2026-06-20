"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { randomUUID } from "crypto";
import { createSession, getSession } from "./session";
import { hashPassword, verifyPassword } from "./password";
import * as store from "./store";

export type AuthState = { error?: string } | undefined;

export async function signUp(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!name || !email || !password) {
    return { error: "All fields are required" };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters" };
  }

  const existing = await store.users.getUserByEmail(email);
  if (existing) {
    return { error: "An account with this email already exists" };
  }

  const passwordHash = await hashPassword(password);
  const user: store.User = {
    id: randomUUID(),
    email,
    passwordHash,
    name,
    createdAt: new Date().toISOString(),
  };

  await store.users.createUser(user);
  await createSession({ userId: user.id, email: user.email, name: user.name });
  redirect("/dashboard");
}

export async function login(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const user = await store.users.getUserByEmail(email);
  if (!user) {
    return { error: "Invalid email or password" };
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    return { error: "Invalid email or password" };
  }

  await createSession({ userId: user.id, email: user.email, name: user.name });
  redirect("/dashboard");
}

export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  cookieStore.delete("selectedAccount");
  redirect("/");
}

export async function switchAccount(youtubeAccountId: string) {
  const cookieStore = await cookies();
  cookieStore.set("selectedAccount", youtubeAccountId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
}

export async function removeYouTubeAccount(formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated");

  const youtubeAccountId = formData.get("accountId") as string;
  if (!youtubeAccountId) throw new Error("Missing account ID");

  const account = await store.youtubeAccounts.getAccountById(youtubeAccountId);
  if (!account || account.userId !== session.userId) {
    throw new Error("Account not found");
  }

  await store.youtubeAccounts.deleteAccount(youtubeAccountId);

  const cookieStore = await cookies();
  const currentSelected = cookieStore.get("selectedAccount")?.value;
  if (currentSelected === youtubeAccountId) {
    const remaining = await store.youtubeAccounts.getAccountsByUserId(session.userId);
    if (remaining.length > 0) {
      cookieStore.set("selectedAccount", remaining[0].id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
      });
    } else {
      cookieStore.delete("selectedAccount");
    }
  }

  redirect("/dashboard/settings");
}

type ContactFields = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function sendContactMessage(data: ContactFields) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    return { error: "Webhook not configured" };
  }

  const embed = {
    title: `New Contact Form Submission: ${data.subject}`,
    color: 0x000000,
    fields: [
      { name: "Name", value: data.name, inline: true },
      { name: "Email", value: data.email, inline: true },
      { name: "Message", value: data.message },
    ],
    timestamp: new Date().toISOString(),
  };

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ embeds: [embed] }),
  });

  if (!res.ok) {
    return { error: "Failed to send message" };
  }

  return { success: true };
}
