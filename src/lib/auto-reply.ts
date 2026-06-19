import { getSettings, addReplyRecord } from "./store";
import {
  getMyChannel,
  getUploadVideos,
  getCommentThreads,
  replyToComment,
} from "./youtube";

export async function runAutoReply(
  accessToken: string,
  refreshToken: string,
  googleId: string
) {
  const settings = await getSettings(googleId);
  if (!settings.enabled) {
    return { replied: 0, message: "Auto-reply is disabled" };
  }

  const channel = await getMyChannel(accessToken, refreshToken);
  if (!channel) {
    return { replied: 0, message: "No channel found" };
  }

  const uploadsId = channel.contentDetails?.relatedPlaylists?.uploads;
  if (!uploadsId) {
    return { replied: 0, message: "No uploads playlist found" };
  }

  const videos = await getUploadVideos(accessToken, refreshToken, uploadsId, 5);
  let totalReplied = 0;

  for (const video of videos) {
    const videoId = video.contentDetails?.videoId;
    if (!videoId) continue;

    let threads: Awaited<ReturnType<typeof getCommentThreads>> = [];
    try {
      threads = await getCommentThreads(
        accessToken,
        refreshToken,
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

      await replyToComment(
        accessToken,
        refreshToken,
        parentId,
        settings.message
      );

      addReplyRecord(googleId, {
        videoId,
        videoTitle:
          video.snippet?.title ?? snippet.channelId ?? "Unknown video",
        authorName: topComment.snippet.authorDisplayName ?? "Unknown",
        originalComment: topComment.snippet.textOriginal ?? "",
        replyText: settings.message,
        repliedAt: new Date().toISOString(),
      });

      totalReplied++;
    }
  }

  return { replied: totalReplied, message: "Done" };
}
