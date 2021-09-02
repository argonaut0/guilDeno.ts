/**
 * This module contains functions for interacting with the
 * Guilded Team XP API.
 *
 * https://www.guilded.gg/docs/api/teamXP
 */
import { Sender } from "./Request.ts";

/** HTTP Response Payload */
export type XPRes = {
  total: number;
};

export default function getTeamXP(send: Sender) {
  return {
    /**
         * Award XP to a member.
         * https://www.guilded.gg/docs/api/teamXP/TeamXpForUserCreate
         * @param amount integer
         */
    awardXP: async function (userId: string, amount: number) {
      return (await send(
        `https://www.guilded.gg/api/v1/members/${userId}/xp`,
        "POST",
        { amount: Math.trunc(amount) },
      ));
    },

    /**
         * Award XP to all members of a role.
         * https://www.guilded.gg/docs/api/teamXP/TeamXpForRoleCreate
         * @param roleId integer
         * @param amount integer
         */
    awardRoleXP: async function (roleId: number, amount: number) {
      return (await send(
        `https://www.guilded.gg/api/v1/roles/${Math.trunc(roleId)}/xp`,
        "POST",
        { amount: Math.trunc(amount) },
      ));
    },
  };
}
