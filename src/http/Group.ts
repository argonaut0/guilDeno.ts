/**
 * This module contains functions for interacting with the
 * Guilded Group Membership API.
 *
 * https://www.guilded.gg/docs/api/groupMembership
 */
import { Sender } from "./Request.ts";

/** Closure constructor. @returns Group controller. */
export default function getGroup(send: Sender) {
  return {
    /** https://www.guilded.gg/docs/api/groupMembership/GroupMembershipCreate */
    addToGroup: async function (groupId: string, userId: string) {
      return (await send(
        `https://www.guilded.gg/api/v1/groups/${groupId}/members/${userId}`,
        "PUT",
      ));
    },

    /** https://www.guilded.gg/docs/api/groupMembership/GroupMembershipDelete */
    removeFromGroup: async function (groupId: string, userId: string) {
      return (await send(
        `https://www.guilded.gg/api/v1/groups/${groupId}/members/${userId}`,
        "DELETE",
      ));
    },
  };
}
