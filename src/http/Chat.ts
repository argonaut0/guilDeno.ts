/**
 * This module contains functions for interacting with the
 * Guilded Chat API.
 *
 * https://www.guilded.gg/docs/api/chat
 */
import { Sender } from "./Request.ts";

/** https://www.guilded.gg/docs/api/chat/ChatMessage */
export type ChatMessage = {
  id: string;
  type: string;
  channelId: string;
  content: string;
  createdAt: string;
  createdBy: string;
  createdByBotId?: string;
  createdByWebhookId?: string;
  updatedAt?: string;
};

/** Treat this as a constructor. @returns Chat controller. */
export default function getChat(send: Sender) {
  return {
    /** https://www.guilded.gg/docs/api/chat/ChannelMessageCreate */
    sendMsg: async function (
      channelId: string,
      content: string,
    ): Promise<ChatMessage> {
      return (await send(
        `https://www.guilded.gg/api/v1/channels/${channelId}/messages`,
        "POST",
        { content: content },
      )).message;
    },

    /**
     * Get a list of the latest 50 messages from a channel.
     * https://www.guilded.gg/docs/api/chat/ChannelMessageReadMany
     */
    getRecentMsgs: async function (channelId: string): Promise<ChatMessage[]> {
      return (await send(
        `https://www.guilded.gg/api/v1/channels/${channelId}/messages`,
        "GET",
      )).messages;
    },

    /** https://www.guilded.gg/docs/api/chat/ChannelMessageRead */
    getMsg: async function (
      channelId: string,
      messageId: string,
    ): Promise<ChatMessage> {
      return (await send(
        `https://www.guilded.gg/api/v1/channels/${channelId}/messages/${messageId}`,
        "GET",
      )).message;
    },

    /** https://www.guilded.gg/docs/api/chat/ChannelMessageUpdate */
    updateMsg: async function (
      channelId: string,
      messageId: string,
      content: string,
    ): Promise<ChatMessage> {
      return (await send(
        `https://www.guilded.gg/api/v1/channels/${channelId}/messages/${messageId}`,
        "PUT",
        { content: content },
      )).message;
    },

    /** https://www.guilded.gg/docs/api/chat/ChannelMessageDelete */
    deleteMsg: async function (channelId: string, messageId: string) {
      return (await send(
        `https://www.guilded.gg/api/v1/channels/${channelId}/messages/${messageId}`,
        "DELETE",
      ));
    },
  };
}
