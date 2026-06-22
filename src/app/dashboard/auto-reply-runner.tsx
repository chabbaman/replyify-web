"use client";

import { useState, useRef, useEffect } from "react";

export default function AutoReplyButton({
  accountId,
  enabled,
}: {
  accountId: string;
  enabled: boolean;
}) {
  const [result, setResult] = useState<string | null>(null);
  const [details, setDetails] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const ran = useRef(false);

  useEffect(() => {
    if (!enabled || ran.current) return;
    ran.current = true;
    run();
  }, [enabled, accountId]);

  async function run() {
    setRunning(true);
    setResult(null);
    setDetails([]);
    try {
      const res = await fetch("/api/auto-reply", { method: "POST" });
      const data = await res.json();
      if (data.replied > 0) {
        setResult(`Replied to ${data.replied} comment${data.replied > 1 ? "s" : ""}`);
      } else if (data.details?.length > 0) {
        setResult("No replies made");
        setDetails(data.details);
      } else {
        setResult(data.message ?? "Done — no replies needed");
      }
    } catch {
      setResult("Error — check console");
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="mt-4 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 bg-white dark:bg-black">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-black dark:text-white">
            Run auto-reply
          </p>
          <p className="mt-0.5 text-xs text-neutral-500">
            Check recent videos and reply to new comments
          </p>
        </div>
        <button
          onClick={run}
          disabled={running || !enabled}
          className="px-5 py-2 text-sm font-medium text-white bg-black rounded-full hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors"
        >
          {running ? "Running..." : "Run Now"}
        </button>
      </div>
      {result && (
        <p className="mt-3 text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {result}
        </p>
      )}
      {details.length > 0 && (
        <ul className="mt-2 space-y-1">
          {details.map((d, i) => (
            <li key={i} className="text-xs text-red-500">
              {d}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
