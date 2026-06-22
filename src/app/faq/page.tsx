import Link from "next/link";

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black stripe-bg">
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
          <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 bg-white dark:bg-black">
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
                replies to comments on your videos using AI powered by Gemini.
                You can customize the AI&apos;s personality, always-say statements,
                and channel-specific knowledge.
              </p>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-black dark:text-white mb-2">
                Does Replyify use AI?
              </h2>
              <p className="text-sm leading-6 text-neutral-500 dark:text-neutral-400">
                Yes. Replyify uses Google&apos;s Gemini AI to generate natural,
                context-aware replies to every comment. You can customize the
                AI&apos;s personality, things it should always mention, and channel
                knowledge to make replies feel personal.
              </p>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-black dark:text-white mb-2">
                Which comments get replies?
              </h2>
              <p className="text-sm leading-6 text-neutral-500 dark:text-neutral-400">
                Replyify scans your recent public videos and replies to top-level
                comments that don&apos;t already have a reply. Videos with comments
                disabled are skipped automatically.
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
                How does the paid plan work?
              </h2>
              <p className="text-sm leading-6 text-neutral-500 dark:text-neutral-400">
                After signing up, you&apos;ll choose a plan — Basic, Pro, or Corporate.
                Each plan unlocks different features and reply limits. You can
                change your plan anytime from the settings page.
              </p>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-black dark:text-white mb-2">
                How do I stop auto-replying?
              </h2>
              <p className="text-sm leading-6 text-neutral-500 dark:text-neutral-400">
                Open the dashboard and toggle automatic replies off. You can
                also disconnect your YouTube account at any time.
              </p>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-black dark:text-white mb-2">
                Why didn&apos;t Replyify reply to a comment?
              </h2>
              <p className="text-sm leading-6 text-neutral-500 dark:text-neutral-400">
                This can happen if the video has comments disabled, the comment
                already has a reply, the video is unlisted or private, or the
                Gemini API quota was reached. Click Run Now on the dashboard to
                see specific diagnostics.
              </p>
            </div>
          </div>
          </div>
        </div>
      </main>
    </div>
  );
}
