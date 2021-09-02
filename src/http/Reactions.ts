/**
 * This module contains functions for interacting with the
 * Guilded Reactions API.
 *
 * https://www.guilded.gg/docs/api/reactions
 */
import { Sender } from "./Request.ts";

/** https://www.guilded.gg/docs/api/reactions/ContentReaction */
export type ContentReaction = {
  id: number;
  createdAt: string;
  createdBy: string;
  createdByBotId?: string;
  createdByWebhookId?: string;
};

/** Closure constructor. @returns Reaction controller. */
export default function getReact(send: Sender) {
  return {
    /**
         * Add a reaction to content.
         * https://www.guilded.gg/docs/api/reactions/ContentReactionCreate
         * @param emoteId integer
         */
    addReact: async function (
      channelId: string,
      contentId: string,
      emoteId: number,
    ): Promise<ContentReaction> {
      return (await send(
        `https://www.guilded.gg/api/v1/channels/${channelId}/content/${contentId}/emotes/${emoteId}`,
        "PUT",
      )).emote;
    },
  };
}
