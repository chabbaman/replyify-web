import { getAccountById, updateYouTubeAccount } from "./store/youtube-accounts";
import { getSettings, addReplyRecord } from "./store/auto-reply";
import {
  getMyChannel,
  getUploadVideos,
  getCommentThreads,
  replyToComment,
} from "./youtube";
import { generateReply } from "./gemini";

export async function runAutoReply(youtubeAccountId: string) {
  const account = await getAccountById(youtubeAccountId);
  if (!account) {
    return { replied: 0, message: "YouTube account not found", details: [] };
  }

  const settings = await getSettings(youtubeAccountId);
  if (!settings.enabled) {
    return { replied: 0, message: "Auto-reply is disabled", details: [] };
  }

  const channel = await getMyChannel(account.accessToken, account.refreshToken);
  if (!channel) {
    return { replied: 0, message: "No channel found", details: [] };
  }

  if (!account.channelId && channel.id) {
    await updateYouTubeAccount({ ...account, channelId: channel.id });
  }

  const uploadsId = channel.contentDetails?.relatedPlaylists?.uploads;
  if (!uploadsId) {
    return { replied: 0, message: "No uploads playlist found", details: [] };
  }

  const videos = await getUploadVideos(account.accessToken, account.refreshToken, uploadsId, 10);
  let totalReplied = 0;
  const details: string[] = [];

  for (const video of videos) {
    const videoId = video.contentDetails?.videoId;
    if (!videoId) continue;

    const videoTitle = video.snippet?.title ?? videoId;

    if (video.status?.privacyStatus && video.status.privacyStatus !== "public") {
      continue;
    }

    let threads: Awaited<ReturnType<typeof getCommentThreads>> = [];
    try {
      threads = await getCommentThreads(
        account.accessToken,
        account.refreshToken,
        videoId,
        20
      );
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      if (msg.includes("commentsDisabled")) {
        details.push(`"${videoTitle}" — comments are disabled on this video`);
      } else {
        details.push(`"${videoTitle}" — ${msg}`);
      }
      continue;
    }

    if (threads.length === 0) {
      details.push(`"${videoTitle}" — no comments found`);
      continue;
    }

    for (const thread of threads) {
      const snippet = thread.snippet;
      const topComment = snippet?.topLevelComment;
      if (!snippet || !topComment?.snippet) continue;
      if ((snippet.totalReplyCount ?? 0) > 0) continue;

      const parentId = topComment.id;
      if (!parentId) continue;

      let replyText: string;
      try {
        replyText = await generateReply(settings, topComment.snippet.textOriginal ?? "");
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        if (msg.includes("429") || msg.includes("RESOURCE_EXHAUSTED")) {
          details.push(`Gemini API quota exceeded — enable billing at https://aistudio.google.com`);
        } else {
          details.push(`Gemini failed: ${msg}`);
        }
        continue;
      }

      await new Promise((r) => setTimeout(r, 2_000));

      try {
        await replyToComment(
          account.accessToken,
          account.refreshToken,
          parentId,
          replyText
        );
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        details.push(`Failed to reply to "${topComment.snippet.textOriginal?.slice(0, 40)}": ${msg}`);
        continue;
      }

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

  const unique = [...new Set(details)];
  return { replied: totalReplied, message: "Done", details: unique };
}