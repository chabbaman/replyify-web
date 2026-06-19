import { getSession } from "@/lib/session";
import { getSettings } from "@/lib/store";
import { runAutoReply } from "@/lib/auto-reply";
import { revalidatePath } from "next/cache";

export default async function AutoReplyPage() {
  const session = await getSession();
  const settings = await getSettings(session!.googleId);

  return (
    <div className="max-w-xl mx-auto px-6 py-12 sm:py-16">
      <h1 className="text-2xl font-bold tracking-tight text-black dark:text-white">
        Auto-Reply
      </h1>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        Automatically reply to comments on your videos.
      </p>

      <div className="mt-8 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-black dark:text-white">
              Automatic replies
            </p>
            <p className="mt-1 text-xs text-neutral-500">
              {settings.enabled
                ? "Active — replying to new comments"
                : "Inactive"}
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
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:focus:ring-white dark:focus:ring-offset-black ${
                settings.enabled
                  ? "border-black bg-black dark:border-white dark:bg-white"
                  : "border-neutral-300 bg-transparent dark:border-neutral-700"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform dark:bg-black ${
                  settings.enabled
                    ? "translate-x-[1.35rem] bg-white dark:bg-black"
                    : "translate-x-[0.2rem] bg-black dark:bg-white"
                }`}
              />
            </button>
          </form>
        </div>
      </div>

      <div className="mt-4 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
        <p className="text-sm font-medium text-black dark:text-white">
          Reply message
        </p>
        <p className="mt-1 text-xs text-neutral-500">
          Posted as a reply to every new comment.
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
          className="mt-4"
        >
          <textarea
            name="message"
            rows={3}
            defaultValue={settings.message}
            className="w-full resize-none rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black px-4 py-3 text-sm text-black dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          />
          <button
            type="submit"
            className="mt-3 px-5 py-2 text-sm font-medium text-white bg-black rounded-full hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors"
          >
            Save
          </button>
        </form>
      </div>

      <div className="mt-4 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
        <p className="text-sm font-medium text-black dark:text-white">
          Manual trigger
        </p>
        <p className="mt-1 text-xs text-neutral-500">
          Scan your recent videos and reply to unaddressed comments now.
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
          className="mt-4"
        >
          <button
            type="submit"
            className="px-5 py-2 text-sm font-medium text-white bg-black rounded-full hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors"
          >
            Run Now
          </button>
        </form>
      </div>
    </div>
  );
}
