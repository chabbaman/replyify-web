import Link from "next/link";
import { getSession } from "@/lib/session";

export default async function Home() {
  const session = await getSession();

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black font-sans">
      <header className="flex items-center justify-between px-8 py-4">
        <h1 className="text-2xl font-bold text-black dark:text-white">
          Replyify
        </h1>
        {session ? (
          <Link
            href="/dashboard"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Go to Dashboard
          </Link>
        ) : (
          <Link
            href="/auth/google"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Connect YouTube
          </Link>
        )}
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <h2 className="text-5xl font-bold tracking-tight text-black dark:text-white sm:text-6xl">
          Automate your YouTube replies
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Connect your YouTube channel and let Replyify handle your comments.
          No AI setup required — just link and go.
        </p>
        <div className="mt-10">
          {session ? (
            <Link
              href="/dashboard"
              className="px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors"
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link
              href="/auth/google"
              className="px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors"
            >
              Connect YouTube Account
            </Link>
          )}
        </div>
      </main>

      <footer className="py-8 text-center text-sm text-zinc-500">
        Replyify &mdash; YouTube comment management
      </footer>
    </div>
  );
}
