import { getDashboardContext } from "@/lib/dashboard";
import { getReplyHistory } from "@/lib/store/auto-reply";

export default async function HistoryPage() {
  const ctx = await getDashboardContext();

  if (!ctx || !ctx.selectedAccount) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12 sm:py-16">
        <h1 className="text-2xl font-bold tracking-tight text-black dark:text-white">
          Reply History
        </h1>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          {ctx && ctx.accounts.length === 0
            ? "Link a YouTube account to see reply history."
            : "No YouTube account selected."}
        </p>
      </div>
    );
  }

  const history = await getReplyHistory(ctx.selectedAccount.id);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 sm:py-16">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-black dark:text-white">
          Reply History
        </h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Comments your account has replied to automatically.
        </p>
      </div>

      {history.length === 0 ? (
        <div className="mt-8 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
          <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center py-12">
            No replies yet for {ctx.selectedAccount.name}. Run the auto-reply or
            wait for new comments.
          </p>
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800">
                <th className="text-left py-3 pr-4 font-medium text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
                  Date
                </th>
                <th className="text-left py-3 pr-4 font-medium text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
                  Video
                </th>
                <th className="text-left py-3 pr-4 font-medium text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
                  Author
                </th>
                <th className="text-left py-3 pr-4 font-medium text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
                  Original
                </th>
                <th className="text-left py-3 font-medium text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
                  Reply
                </th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry, i) => (
                <tr
                  key={`${entry.repliedAt}-${i}`}
                  className="border-b border-neutral-100 dark:border-neutral-900 last:border-0"
                >
                  <td className="py-3 pr-4 align-top whitespace-nowrap text-neutral-400 text-xs">
                    {new Date(entry.repliedAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="py-3 pr-4 align-top max-w-[140px] truncate">
                    <a
                      href={`https://youtube.com/watch?v=${entry.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black dark:text-white hover:underline"
                    >
                      {entry.videoTitle}
                    </a>
                  </td>
                  <td className="py-3 pr-4 align-top whitespace-nowrap text-neutral-600 dark:text-neutral-300">
                    {entry.authorName}
                  </td>
                  <td className="py-3 pr-4 align-top max-w-[200px] text-neutral-600 dark:text-neutral-300">
                    <p className="line-clamp-2">{entry.originalComment}</p>
                  </td>
                  <td className="py-3 align-top max-w-[200px] text-black dark:text-white">
                    <p className="line-clamp-2">{entry.replyText}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
