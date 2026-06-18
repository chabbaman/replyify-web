export default function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto px-8 py-12">
      <h1 className="text-2xl font-bold text-black dark:text-white mb-2">
        Customize AI
      </h1>
      <p className="text-zinc-500 dark:text-zinc-400 mb-8">
        Configure how Replyify responds to your audience.
      </p>

      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
        <p className="text-zinc-500 dark:text-zinc-400 text-center py-12">
          AI customization is coming soon. You&apos;ll be able to set the tone,
          style, and personality of your automated replies here.
        </p>
      </div>
    </div>
  );
}
