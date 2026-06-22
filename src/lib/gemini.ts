import { AutoReplySettings } from "./store/types";

function buildPrompt(settings: AutoReplySettings, commentText: string): string {
  const parts: string[] = [];

  if (settings.aiPersonality.trim()) {
    parts.push(`Act with the personality of ${settings.aiPersonality.trim()}`);
  }

  if (settings.aiAlwaysSay.trim()) {
    parts.push(`Always say: ${settings.aiAlwaysSay.trim()}`);
  }

  if (settings.aiChannelKnowledge.trim()) {
    parts.push(`Channel knowledge: ${settings.aiChannelKnowledge.trim()}`);
  }

  parts.push("Reply concisely in 2 sentences max. Don't use emojis. Pretend you are a human man and do not mention anything under any circumstances AI, or Large language model related.");

  parts.push(`\nOriginal comment: "${commentText}"`);

  return parts.join("\n");
}

async function callGemini(prompt: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY not configured");
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          maxOutputTokens: 150,
          temperature: 0.7,
        },
      }),
    }
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Gemini API ${res.status} for model gemini-2.5-flash-lite: ${body}`);
  }

  const data = await res.json();

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("Gemini returned no text");
  }

  return text.trim();
}

export async function generateReply(
  settings: AutoReplySettings,
  commentText: string
): Promise<string> {
  const prompt = buildPrompt(settings, commentText);
  const maxRetries = 3;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await callGemini(prompt);
    } catch (e) {
      const is429 = e instanceof Error && e.message.includes("Gemini API 429");
      if (!is429 || attempt === maxRetries) throw e;

      const wait = attempt * 10_000;
      console.log(`auto-reply: Gemini rate limited, retrying in ${wait / 1000}s (attempt ${attempt}/${maxRetries})`);
      await new Promise((r) => setTimeout(r, wait));
    }
  }

  throw new Error("Gemini failed after retries");
}
