import Link from "next/link";
import { getSession } from "@/lib/session";

export default async function Home() {
  const session = await getSession();

  return (
    <div className="relative flex flex-col min-h-screen bg-white dark:bg-black overflow-hidden">
      <div className="relative flex-1">
        {/* Diagonal grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 40px,
                rgba(0,0,0,0.05) 40px,
                rgba(0,0,0,0.05) 41px
              ),
              repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 40px,
                rgba(0,0,0,0.05) 40px,
                rgba(0,0,0,0.05) 41px
              )
            `,
          }}
        />

        {/* Large diamond outline top-right */}
        <div className="absolute -top-32 -right-32 w-96 h-96 pointer-events-none dark:opacity-20 opacity-[0.04]">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <polygon
              points="200,0 400,200 200,400 0,200"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <polygon
              points="200,40 360,200 200,360 40,200"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </svg>
        </div>

        {/* Sharp chevron bottom-left */}
        <div className="absolute -bottom-20 -left-20 w-72 h-72 pointer-events-none dark:opacity-20 opacity-[0.04]">
          <svg viewBox="0 0 300 300" className="w-full h-full">
            <polyline
              points="0,300 150,0 300,300"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <polyline
              points="30,300 150,30 270,300"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </svg>
        </div>

        {/* Corner brackets top-left */}
        <div className="absolute top-10 left-10 pointer-events-none dark:opacity-30 opacity-[0.06]">
          <svg width="60" height="60" viewBox="0 0 60 60">
            <polyline
              points="0,0 60,0 60,60"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </div>
        <div className="absolute top-10 right-10 pointer-events-none dark:opacity-30 opacity-[0.06]">
          <svg width="60" height="60" viewBox="0 0 60 60">
            <polyline
              points="60,0 0,0 0,60"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {/* Sharp horizontal divider below header */}
        <div className="absolute top-[72px] left-0 right-0 h-px pointer-events-none">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <line
              x1="0"
              y1="0"
              x2="100%"
              y2="0"
              stroke="currentColor"
              strokeWidth="0.5"
              className="dark:opacity-20 opacity-[0.06]"
            />
          </svg>
        </div>

        <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <span className="text-lg font-semibold tracking-tight text-black dark:text-white">
          Replyify
        </span>
        <div className="flex items-center gap-6">
            <Link
            href="/faq"
            className="text-sm text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors"
          >
            FAQ
          </Link>
          {session ? (
            <Link
              href="/dashboard"
              className="text-sm text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/auth/google"
              className="px-4 py-2 text-sm font-medium text-white bg-black rounded-full hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors"
            >
              Connect YouTube
            </Link>
          )}
        </div>
      </header>

      <main className="flex flex-col items-center justify-center px-6 pt-24 pb-16 text-center">
        <div className="max-w-lg">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-black dark:text-white leading-[1.1]">
            Reply to every comment.
            <br />
            Automatically.
          </h1>
          <p className="mt-6 text-base leading-7 text-neutral-500 dark:text-neutral-400">
            Link your YouTube channel and Replyify handles your comments. No AI
            setup, no complex config — just connect and go.
          </p>
          <div className="mt-10">
            {session ? (
              <Link
                href="/dashboard"
                className="inline-block px-8 py-3 text-sm font-medium text-white bg-black rounded-full hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                href="/auth/google"
                className="inline-block px-8 py-3 text-sm font-medium text-white bg-black rounded-full hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors"
              >
                Connect YouTube Account
              </Link>
            )}
          </div>
        </div>
      </main>
      </div>

      <footer>
        <div className="h-1 bg-black dark:bg-white opacity-10" />
        <div className="py-6 text-center text-xs text-neutral-400">
          Replyify
        </div>
      </footer>
    </div>
  );
}
