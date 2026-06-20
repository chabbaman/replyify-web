import { promises as fs } from "fs";
import path from "path";
import { YouTubeAccount } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const ACCOUNTS_FILE = path.join(DATA_DIR, "youtube-accounts.json");

async function readAccounts(): Promise<Record<string, YouTubeAccount>> {
  try {
    const raw = await fs.readFile(ACCOUNTS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function writeAccounts(accounts: Record<string, YouTubeAccount>) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(ACCOUNTS_FILE, JSON.stringify(accounts, null, 2));
}

export async function createYouTubeAccount(account: YouTubeAccount): Promise<void> {
  const accounts = await readAccounts();
  accounts[account.id] = account;
  await writeAccounts(accounts);
}

export async function getAccountsByUserId(userId: string): Promise<YouTubeAccount[]> {
  const accounts = await readAccounts();
  return Object.values(accounts).filter(a => a.userId === userId);
}

export async function getAccountById(id: string): Promise<YouTubeAccount | null> {
  const accounts = await readAccounts();
  return accounts[id] ?? null;
}

export async function deleteAccount(id: string): Promise<void> {
  const accounts = await readAccounts();
  delete accounts[id];
  await writeAccounts(accounts);
}

export async function getAccountByGoogleId(googleId: string): Promise<YouTubeAccount | null> {
  const accounts = await readAccounts();
  for (const a of Object.values(accounts)) {
    if (a.googleId === googleId) return a;
  }
  return null;
}

export async function updateYouTubeAccount(account: YouTubeAccount): Promise<void> {
  const accounts = await readAccounts();
  accounts[account.id] = account;
  await writeAccounts(accounts);
}
