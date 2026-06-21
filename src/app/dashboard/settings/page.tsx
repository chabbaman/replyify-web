import Image from "next/image";
import { getDashboardContext } from "@/lib/dashboard";
import { removeYouTubeAccount } from "@/lib/actions";
import ThemeToggle from "../theme-toggle";

export default async function SettingsPage() {
  const ctx = await getDashboardContext();

  return (
    <div className="max-w-xl mx-auto px-6 py-12 sm:py-16 space-y-12">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-black dark:text-white">
          Settings
        </h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Manage your account and YouTube connections.
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-black dark:text-white">
          Linked YouTube Accounts
        </h2>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          YouTube channels connected to your Replyify account.
        </p>

        <div className="mt-4 space-y-3">
          {ctx && ctx.accounts.length > 0 ? (
            ctx.accounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 bg-white dark:bg-black"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Image
                    src={account.picture}
                    alt={account.name}
                    width={36}
                    height={36}
                    className="rounded-full shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-black dark:text-white truncate">
                      {account.name}
                    </p>
                    <p className="text-xs text-neutral-400 truncate">
                      {account.email}
                    </p>
                  </div>
                </div>
                <form action={removeYouTubeAccount}>
                  <input type="hidden" name="accountId" value={account.id} />
                  <button
                    type="submit"
                    className="text-sm text-red-500 hover:text-red-600 transition-colors shrink-0 ml-3"
                  >
                    Remove
                  </button>
                </form>
              </div>
            ))
          ) : (
            <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 text-center bg-white dark:bg-black">
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                No YouTube accounts linked yet.
              </p>
            </div>
          )}
        </div>

        <a
          href="/auth/google"
          className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-black rounded-full hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Link another account
        </a>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-black dark:text-white">
          Appearance
        </h2>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Toggle between light and dark mode.
        </p>

        <div className="mt-4 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 bg-white dark:bg-black flex items-center justify-between">
          <span className="text-sm text-black dark:text-white">Dark mode</span>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
