import Link from "next/link";
import { redirect } from "next/navigation";
import { getDashboardContext } from "@/lib/dashboard";
import UserMenu from "./user-menu";
import AccountSwitcher from "./account-switcher";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ctx = await getDashboardContext();
  if (!ctx) redirect("/");
  if (!ctx.user.plan) redirect("/payment-plan");

  return (
    <div className="flex min-h-screen bg-white dark:bg-black">
      <aside className="hidden sm:flex w-60 flex-col border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black">
        <div className="px-6 py-5 border-b border-neutral-200 dark:border-neutral-800">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-black dark:text-white"
          >
            Replyify
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-black hover:bg-neutral-100 dark:hover:text-white dark:hover:bg-neutral-900 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
              />
            </svg>
            Auto-Reply
          </Link>
          <Link
            href="/dashboard/history"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-black hover:bg-neutral-100 dark:hover:text-white dark:hover:bg-neutral-900 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            History
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-black hover:bg-neutral-100 dark:hover:text-white dark:hover:bg-neutral-900 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
              />
            </svg>
            Settings
          </Link>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col overflow-auto stripe-bg">
        <div className="sticky top-0 z-40 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black">
          <div className="flex items-center justify-end px-6 py-2.5">
              <AccountSwitcher
                accounts={ctx.accounts}
                selectedId={ctx.selectedId}
              />
          </div>
        </div>
        <div className="flex-1">
          {children}
        </div>
      </main>

      <UserMenu
        name={ctx.session.name}
        email={ctx.session.email}
      />
    </div>
  );
}
