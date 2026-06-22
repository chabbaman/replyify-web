import Image from "next/image";
import Link from "next/link";
import { getSession } from "@/lib/session";

export default async function Home() {
  const session = await getSession();

  return (
    <div className="relative flex flex-col min-h-screen bg-white dark:bg-black overflow-hidden">
      <div className="relative flex-1 stripe-bg">

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
            <Link
              href="/contact"
              className="text-sm text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors"
            >
              Pricing
            </Link>
            {session ? (
              <Link
                href="/dashboard"
                className="px-4 py-2 text-sm font-medium text-white bg-black rounded-full hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-sm text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-black rounded-full hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors"
                >
                  Sign up
                </Link>
              </div>
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
                  href="/signup"
                  className="inline-block px-8 py-3 text-sm font-medium text-white bg-black rounded-full hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors"
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </main>
      </div>

      <footer>
        <div className="h-1 bg-black dark:bg-white opacity-10" />
        <div className="py-6 px-6 sm:px-10 flex items-center justify-between">
          <span className="text-xs text-neutral-400">Replyify</span>
          <Image src="/replyifylogo.png" alt="Replyify logo" width={28} height={28} />
        </div>
      </footer>
    </div>
  );
}
