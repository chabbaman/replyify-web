import Link from "next/link";

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-black dark:text-white"
        >
          Replyify
        </Link>
        <Link
          href="/"
          className="text-sm text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors"
        >
          Home
        </Link>
      </header>

      <main className="px-6 pb-24 sm:px-10">
        <div className="max-w-lg mx-auto pt-16">
          <h1 className="text-2xl font-bold tracking-tight text-black dark:text-white mb-12">
            FAQ
          </h1>
          <div className="space-y-8">
            <div>
              <h2 className="text-sm font-semibold text-black dark:text-white mb-2">
                What does Replyify do?
              </h2>
              <p className="text-sm leading-6 text-neutral-500 dark:text-neutral-400">
                Replyify connects to your YouTube channel and automatically
                replies to comments on your videos. You set the message, and it
                handles the rest.
              </p>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-black dark:text-white mb-2">
                Do I need to set up AI?
              </h2>
              <p className="text-sm leading-6 text-neutral-500 dark:text-neutral-400">
                No. Replyify works with a fixed message you choose. AI-powered
                customization is coming soon.
              </p>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-black dark:text-white mb-2">
                Which comments get replies?
              </h2>
              <p className="text-sm leading-6 text-neutral-500 dark:text-neutral-400">
                Replyify scans your recent videos and replies to top-level
                comments that don&apos;t already have a reply.
              </p>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-black dark:text-white mb-2">
                Is my YouTube account safe?
              </h2>
              <p className="text-sm leading-6 text-neutral-500 dark:text-neutral-400">
                Replyify only requests permission to comment on your videos. It
                cannot delete videos, change settings, or access your password.
              </p>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-black dark:text-white mb-2">
                How do I stop auto-replying?
              </h2>
              <p className="text-sm leading-6 text-neutral-500 dark:text-neutral-400">
                Open the dashboard and toggle automatic replies off. You can
                also disconnect your account at any time.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
