import { getSession } from "@/lib/session";
import { getSettings } from "@/lib/store";
import { runAutoReply } from "@/lib/auto-reply";
import { revalidatePath } from "next/cache";

export default async function AutoReplyPage() {
  const session = await getSession();

  const settings = await getSettings(session!.googleId);

  return (
    <div className="max-w-2xl mx-auto px-8 py-12">
      <h1 className="text-2xl font-bold text-black dark:text-white mb-2">
        Auto-Reply
      </h1>
      <p className="text-zinc-500 dark:text-zinc-400 mb-8">
        Automatically reply to comments on your YouTube videos.
      </p>

      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-black dark:text-white">
              Automatic Replies
            </h2>
            <p className="text-sm text-zinc-500 mt-1">
              {settings.enabled
                ? "Replying to new comments automatically"
                : "Auto-reply is turned off"}
            </p>
          </div>
          <form
            action={async () => {
              "use server";
              const { getSettings, saveSettings } = await import("@/lib/store");
              const current = await getSettings(session!.googleId);
              await saveSettings(session!.googleId, {
                ...current,
                enabled: !current.enabled,
              });
              revalidatePath("/dashboard");
            }}
          >
            <button
              type="submit"
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                settings.enabled
                  ? "bg-blue-600"
                  : "bg-zinc-300 dark:bg-zinc-700"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  settings.enabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </form>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 mb-6">
        <h2 className="text-lg font-medium text-black dark:text-white mb-2">
          Reply Message
        </h2>
        <p className="text-sm text-zinc-500 mb-4">
          This message will be posted as a reply to every new comment.
        </p>
        <form
          action={async (formData: FormData) => {
            "use server";
            const message = formData.get("message") as string;
            const { getSettings, saveSettings } = await import("@/lib/store");
            const current = await getSettings(session!.googleId);
            await saveSettings(session!.googleId, {
              ...current,
              message,
            });
            revalidatePath("/dashboard");
          }}
        >
          <textarea
            name="message"
            rows={3}
            defaultValue={settings.message}
            className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-3"
          />
          <div className="flex gap-3">
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Save Message
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
        <h2 className="text-lg font-medium text-black dark:text-white mb-2">
          Manual Trigger
        </h2>
        <p className="text-sm text-zinc-500 mb-4">
          Check your recent videos and reply to any unaddressed comments now.
        </p>
        <form
          action={async () => {
            "use server";
            await runAutoReply(
              session!.accessToken,
              session!.refreshToken,
              session!.googleId
            );
            revalidatePath("/dashboard");
          }}
        >
          <button
            type="submit"
            className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Run Now
          </button>
        </form>
      </div>
    </div>
  );
}
