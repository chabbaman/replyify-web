import { promises as fs } from "fs";
import path from "path";
import { AutoReplySettings, ReplyRecord } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const SETTINGS_FILE = path.join(DATA_DIR, "auto-reply.json");
const HISTORY_FILE = path.join(DATA_DIR, "reply-history.json");

const DEFAULT_SETTINGS: AutoReplySettings = {
  enabled: false,
  message: "Thanks for the comment!",
  aiPersonality: "",
  aiAlwaysSay: "",
  aiChannelKnowledge: "",
};

export async function getSettings(youtubeAccountId: string): Promise<AutoReplySettings> {
  try {
    const raw = await fs.readFile(SETTINGS_FILE, "utf-8");
    const all = JSON.parse(raw);
    const stored = all[youtubeAccountId];
    if (stored) {
      return { ...DEFAULT_SETTINGS, ...stored };
    }
    return { ...DEFAULT_SETTINGS };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export async function saveSettings(youtubeAccountId: string, settings: AutoReplySettings) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  let all: Record<string, AutoReplySettings> = {};
  try {
    const raw = await fs.readFile(SETTINGS_FILE, "utf-8");
    all = JSON.parse(raw);
  } catch {}
  all[youtubeAccountId] = settings;
  await fs.writeFile(SETTINGS_FILE, JSON.stringify(all, null, 2));
}

export async function addReplyRecord(youtubeAccountId: string, record: ReplyRecord) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  let all: Record<string, ReplyRecord[]> = {};
  try {
    const raw = await fs.readFile(HISTORY_FILE, "utf-8");
    all = JSON.parse(raw);
  } catch {}
  if (!all[youtubeAccountId]) all[youtubeAccountId] = [];
  all[youtubeAccountId].unshift(record);
  await fs.writeFile(HISTORY_FILE, JSON.stringify(all, null, 2));
}

export async function getReplyHistory(youtubeAccountId: string): Promise<ReplyRecord[]> {
  try {
    const raw = await fs.readFile(HISTORY_FILE, "utf-8");
    const all = JSON.parse(raw);
    return all[youtubeAccountId] ?? [];
  } catch {
    return [];
  }
}
