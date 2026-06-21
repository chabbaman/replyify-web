import { promises as fs } from "fs";
import path from "path";
import { User } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");

async function readUsers(): Promise<Record<string, User>> {
  try {
    const raw = await fs.readFile(USERS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function writeUsers(users: Record<string, User>) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

export async function createUser(user: User): Promise<void> {
  const users = await readUsers();
  users[user.id] = user;
  await writeUsers(users);
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const users = await readUsers();
  for (const user of Object.values(users)) {
    if (user.email === email) return user;
  }
  return null;
}

export async function getUserById(id: string): Promise<User | null> {
  const users = await readUsers();
  return users[id] ?? null;
}

export async function updateUser(id: string, updates: Partial<User>): Promise<void> {
  const users = await readUsers();
  if (!users[id]) throw new Error("User not found");
  users[id] = { ...users[id], ...updates };
  await writeUsers(users);
}
