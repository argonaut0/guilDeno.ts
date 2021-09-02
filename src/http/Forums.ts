/**
 * This module contains functions for interacting with the
 * Guilded Forums API.
 *
 * https://www.guilded.gg/docs/api/forums
 */
import { Sender } from "./Request.ts";

/** https://www.guilded.gg/docs/api/forums/ForumThread */
export type ForumThread = {
  id: number;
  createdAt: string;
  createdBy: string;
  createdByBotID?: string;
  creadedByWebhookId?: string;
};

export type ThreadContent = {
  title: string;
  content: string;
};

/** Treat this as a constructor. @returns Forum controller. */
export default function getForums(send: Sender) {
  return {
    /** https://www.guilded.gg/docs/api/forums/ForumThreadCreate */
    createThread: async function (
      channelId: string,
      content: ThreadContent,
    ): Promise<ForumThread> {
      return (await send(
        `https://www.guilded.gg/api/v1/channels/${channelId}/forum`,
        "POST",
        content,
      )).forumThread;
    },
  };
}
