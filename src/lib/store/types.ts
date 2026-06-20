export type User = {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  createdAt: string;
};

export type YouTubeAccount = {
  id: string;
  userId: string;
  googleId: string;
  email: string;
  name: string;
  picture: string;
  accessToken: string;
  refreshToken: string;
  channelId: string;
  linkedAt: string;
};

export type AutoReplySettings = {
  enabled: boolean;
  message: string;
  aiPersonality: string;
  aiAlwaysSay: string;
  aiChannelKnowledge: string;
};

export type ReplyRecord = {
  videoId: string;
  videoTitle: string;
  authorName: string;
  originalComment: string;
  replyText: string;
  repliedAt: string;
};
