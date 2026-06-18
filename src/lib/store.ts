import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const SETTINGS_FILE = path.join(DATA_DIR, "auto-reply.json");

export type AutoReplySettings = {
  enabled: boolean;
  message: string;
};

export async function getSettings(
  googleId: string
): Promise<AutoReplySettings> {
  try {
    const raw = await fs.readFile(SETTINGS_FILE, "utf-8");
    const all = JSON.parse(raw);
    return (
      all[googleId] ?? { enabled: false, message: "Thanks for the comment!" }
    );
  } catch {
    return { enabled: false, message: "Thanks for the comment!" };
  }
}

export async function saveSettings(
  googleId: string,
  settings: AutoReplySettings
) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  let all: Record<string, AutoReplySettings> = {};
  try {
    const raw = await fs.readFile(SETTINGS_FILE, "utf-8");
    all = JSON.parse(raw);
  } catch {}
  all[googleId] = settings;
  await fs.writeFile(SETTINGS_FILE, JSON.stringify(all, null, 2));
}
