/**
 * This module contains functions for interacting with the
 * Guilded Roles API
 *
 * https://www.guilded.gg/docs/api/roleMembership
 */
import { Sender } from "./Request.ts";

export default function (send: Sender) {
  return {
    /**
         * https://www.guilded.gg/docs/api/roleMembership/RoleMembershipCreate
         * @param roleId integer
         */
    assignRole: async function (userId: string, roleId: number) {
      return (await send(
        `https://www.guilded.gg/api/v1/members/${userId}/roles/${roleId}`,
        "PUT",
      ));
    },

    /**
         * https://www.guilded.gg/docs/api/roleMembership/RoleMembershipDelete
         * @param roleId integer
         */
    removeRole: async function (userId: string, roleId: number) {
      return (await send(
        `https://www.guilded.gg/api/v1/members/${userId}/roles/${roleId}`,
        "DELETE",
      ));
    },
  };
}
