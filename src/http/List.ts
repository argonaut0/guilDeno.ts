/**
 * This module contains functions for interacting with the
 * Guilded List API.
 *
 * https://www.guilded.gg/docs/api/listItems
 */
import { Sender } from "./Request.ts";

/** https://www.guilded.gg/docs/api/listItems/ListItem */
export type ListItem = {
  id: string;
  message: string;
  note?: string;
  createdAt: string;
  createdBy: string;
  createdByBotId?: string;
  createdByWebhoodId?: string;
};

export type ListItemContent = {
  message: string;
  note?: string;
};

/** Closure constructor. @returns List controller */
export default function getList(send: Sender) {
  return {
    /** https://www.guilded.gg/docs/api/listItems/ListItemCreate */
    createItem: async function (
      channelId: string,
      content: ListItemContent,
    ): Promise<ListItem> {
      return (await send(
        `https://www.guilded.gg/api/v1/channels/${channelId}/list`,
        "POST",
        content,
      )).listItem;
    },
  };
}
