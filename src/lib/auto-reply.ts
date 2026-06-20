import { getAccountById, updateYouTubeAccount } from "./store/youtube-accounts";
import { getSettings, addReplyRecord } from "./store/auto-reply";
import {
  getMyChannel,
  getUploadVideos,
  getCommentThreads,
  replyToComment,
} from "./youtube";

export async function runAutoReply(youtubeAccountId: string) {
  const account = await getAccountById(youtubeAccountId);
  if (!account) {
    return { replied: 0, message: "YouTube account not found" };
  }

  const settings = await getSettings(youtubeAccountId);
  if (!settings.enabled) {
    return { replied: 0, message: "Auto-reply is disabled" };
  }

  const channel = await getMyChannel(account.accessToken, account.refreshToken);
  if (!channel) {
    return { replied: 0, message: "No channel found" };
  }

  if (!account.channelId && channel.id) {
    await updateYouTubeAccount({ ...account, channelId: channel.id });
  }

  const uploadsId = channel.contentDetails?.relatedPlaylists?.uploads;
  if (!uploadsId) {
    return { replied: 0, message: "No uploads playlist found" };
  }

  const videos = await getUploadVideos(account.accessToken, account.refreshToken, uploadsId, 5);
  let totalReplied = 0;

  for (const video of videos) {
    const videoId = video.contentDetails?.videoId;
    if (!videoId) continue;

    let threads: Awaited<ReturnType<typeof getCommentThreads>> = [];
    try {
      threads = await getCommentThreads(
        account.accessToken,
        account.refreshToken,
        videoId,
        20
      );
    } catch {
      continue;
    }

    for (const thread of threads) {
      const snippet = thread.snippet;
      const topComment = snippet?.topLevelComment;
      if (!snippet || !topComment?.snippet) continue;
      if ((snippet.totalReplyCount ?? 0) > 0) continue;

      const parentId = topComment.id;
      if (!parentId) continue;

      const replyText = settings.message || "Thanks for the comment!";

      await replyToComment(
        account.accessToken,
        account.refreshToken,
        parentId,
        replyText
      );

      addReplyRecord(youtubeAccountId, {
        videoId,
        videoTitle:
          video.snippet?.title ?? snippet.channelId ?? "Unknown video",
        authorName: topComment.snippet.authorDisplayName ?? "Unknown",
        originalComment: topComment.snippet.textOriginal ?? "",
        replyText,
        repliedAt: new Date().toISOString(),
      });

      totalReplied++;
    }
  }

  return { replied: totalReplied, message: "Done" };
}
