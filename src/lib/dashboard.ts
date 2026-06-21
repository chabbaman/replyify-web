import { cookies } from "next/headers";
import { getSession } from "./session";
import * as store from "./store";

export type DashboardContext = {
  session: NonNullable<Awaited<ReturnType<typeof getSession>>>;
  user: store.User;
  accounts: store.YouTubeAccount[];
  selectedId: string | null;
  selectedAccount: store.YouTubeAccount | null;
};

export async function getDashboardContext(): Promise<DashboardContext | null> {
  const session = await getSession();
  if (!session) return null;

  const user = await store.users.getUserById(session.userId);
  if (!user) return null;

  const accounts = await store.youtubeAccounts.getAccountsByUserId(session.userId);
  const cookieStore = await cookies();
  const selectedCookie = cookieStore.get("selectedAccount")?.value;

  const validIds = accounts.map(a => a.id);
  const selectedId = selectedCookie && validIds.includes(selectedCookie)
    ? selectedCookie
    : accounts[0]?.id ?? null;

  const selectedAccount = accounts.find(a => a.id === selectedId) ?? null;

  return { session, user, accounts, selectedId, selectedAccount };
}
