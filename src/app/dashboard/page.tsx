import { getDashboardContext } from "@/lib/dashboard";
import { getSettings } from "@/lib/store/auto-reply";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export default async function AutoReplyPage() {
  const ctx = await getDashboardContext();

  if (!ctx || !ctx.selectedAccount) {
    return (
      <div className="max-w-xl mx-auto px-6 py-12 sm:py-16">
        <h1 className="text-2xl font-bold tracking-tight text-black dark:text-white">
          Auto-Reply
        </h1>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          Link a YouTube account to get started.
        </p>
        {ctx && ctx.accounts.length === 0 && (
          <div className="mt-8 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 text-center py-12">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              No YouTube accounts linked yet.
            </p>
            <a
              href="/auth/google"
              className="mt-4 inline-block px-6 py-2.5 text-sm font-medium text-white bg-black rounded-full hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors"
            >
              Link your first YouTube account
            </a>
          </div>
        )}
      </div>
    );
  }

  const settings = await getSettings(ctx.selectedAccount.id);

  return (
    <div className="max-w-xl mx-auto px-6 py-12 sm:py-16">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-black dark:text-white">
          Auto-Reply
        </h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Automatically reply to comments on your videos.
        </p>
      </div>

      <div className="mt-8 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-black dark:text-white">
              Automatic replies
            </p>
            <p className="mt-1 text-xs text-neutral-500">
              Customizing reply behavior for{" "}
              <span className="font-medium text-black dark:text-white">
                {ctx.selectedAccount.name}
              </span>
            </p>
            <p className="mt-0.5 text-xs text-neutral-500">
              {settings.enabled
                ? "Active — replying to new comments"
                : "Inactive"}
            </p>
          </div>
          <form
            action={async () => {
              "use server";
              const cookieStore = await cookies();
              const selectedId = cookieStore.get("selectedAccount")?.value;
              if (!selectedId) return;
              const { getSettings, saveSettings } = await import("@/lib/store/auto-reply");
              const current = await getSettings(selectedId);
              await saveSettings(selectedId, {
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
          AI Customizer
        </p>
        <p className="mt-1 text-xs text-neutral-500">
          Configure how your AI replies to comments. Settings are saved per
          channel.
        </p>
        <form
          action={async (formData: FormData) => {
            "use server";
            const accountId = formData.get("youtubeAccountId") as string;
            if (!accountId) return;
            const { getSettings, saveSettings } = await import("@/lib/store/auto-reply");
            const current = await getSettings(accountId);
            await saveSettings(accountId, {
              ...current,
              aiPersonality: (formData.get("aiPersonality") as string).slice(0, 30),
              aiAlwaysSay: (formData.get("aiAlwaysSay") as string).slice(0, 30),
              aiChannelKnowledge: (formData.get("aiChannelKnowledge") as string).slice(0, 50),
            });
            revalidatePath("/dashboard");
          }}
          className="mt-4 space-y-4"
        >
          <input type="hidden" name="youtubeAccountId" value={ctx.selectedAccount.id} />

          <div>
            <label
              htmlFor="aiPersonality"
              className="block text-sm text-neutral-700 dark:text-neutral-300 mb-1.5"
            >
              1. Describe your AI&apos;s personality
            </label>
            <input
              id="aiPersonality"
              name="aiPersonality"
              type="text"
              maxLength={30}
              defaultValue={settings.aiPersonality}
              placeholder="e.g. Friendly and helpful"
              className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black px-4 py-2.5 text-sm text-black dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
          </div>

          <div>
            <label
              htmlFor="aiAlwaysSay"
              className="block text-sm text-neutral-700 dark:text-neutral-300 mb-1.5"
            >
              2. Statements you&apos;d like your AI to always say
            </label>
            <input
              id="aiAlwaysSay"
              name="aiAlwaysSay"
              type="text"
              maxLength={30}
              defaultValue={settings.aiAlwaysSay}
              placeholder="e.g. Please subscribe"
              className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black px-4 py-2.5 text-sm text-black dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
          </div>

          <div>
            <label
              htmlFor="aiChannelKnowledge"
              className="block text-sm text-neutral-700 dark:text-neutral-300 mb-1.5"
            >
              3. Channel-specific things for your AI to know
            </label>
            <input
              id="aiChannelKnowledge"
              name="aiChannelKnowledge"
              type="text"
              maxLength={50}
              defaultValue={settings.aiChannelKnowledge}
              placeholder='e.g. Movie questions → check description'
              className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black px-4 py-2.5 text-sm text-black dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2 text-sm font-medium text-white bg-black rounded-full hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
