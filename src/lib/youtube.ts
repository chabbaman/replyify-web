import { google } from "googleapis";

export function getOAuth2Client() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
}

export function getAuthUrl() {
  const oauth2Client = getOAuth2Client();
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/youtube.force-ssl",
    ],
  });
}

export async function getTokensFromCode(code: string) {
  const oauth2Client = getOAuth2Client();
  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
}

export async function getUserInfo(accessToken: string) {
  const oauth2Client = getOAuth2Client();
  oauth2Client.setCredentials({ access_token: accessToken });
  const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
  const { data } = await oauth2.userinfo.get();
  return data;
}

export function getAuthenticatedClient(
  accessToken: string,
  refreshToken: string
) {
  const oauth2Client = getOAuth2Client();
  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });
  return google.youtube({ version: "v3", auth: oauth2Client });
}

export async function postComment(
  accessToken: string,
  refreshToken: string,
  videoId: string,
  text: string
) {
  const youtube = getAuthenticatedClient(accessToken, refreshToken);
  const { data } = await youtube.commentThreads.insert({
    part: ["snippet"],
    requestBody: {
      snippet: {
        videoId,
        topLevelComment: {
          snippet: {
            textOriginal: text,
          },
        },
      },
    },
  });
  return data;
}

export async function replyToComment(
  accessToken: string,
  refreshToken: string,
  parentId: string,
  text: string
) {
  const youtube = getAuthenticatedClient(accessToken, refreshToken);
  const { data } = await youtube.comments.insert({
    part: ["snippet"],
    requestBody: {
      snippet: {
        parentId,
        textOriginal: text,
      },
    },
  });
  return data;
}

export async function getMyChannel(
  accessToken: string,
  refreshToken: string
) {
  const youtube = getAuthenticatedClient(accessToken, refreshToken);
  const { data } = await youtube.channels.list({
    part: ["contentDetails", "snippet"],
    mine: true,
  });
  return data.items?.[0] ?? null;
}

export async function getUploadVideos(
  accessToken: string,
  refreshToken: string,
  uploadsPlaylistId: string,
  maxResults = 10
) {
  const youtube = getAuthenticatedClient(accessToken, refreshToken);
  const { data } = await youtube.playlistItems.list({
    part: ["contentDetails", "snippet", "status"],
    playlistId: uploadsPlaylistId,
    maxResults,
  });
  return data.items ?? [];
}

export async function getCommentThreads(
  accessToken: string,
  refreshToken: string,
  videoId: string,
  maxResults = 100
) {
  const youtube = getAuthenticatedClient(accessToken, refreshToken);
  const { data } = await youtube.commentThreads.list({
    part: ["snippet"],
    videoId,
    maxResults,
  });
  return data.items ?? [];
}
