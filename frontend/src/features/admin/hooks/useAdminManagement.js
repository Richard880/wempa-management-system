import { useCallback, useEffect, useState } from "react";

import useAuth from "../../auth/hooks/useAuth";
import adminManagementService from "../services/adminManagementService";

import ROLES from "../../../constants/roles";

const INITIAL_STATE = {
  admins: [],
  users: [],
  loadingAdmins: false,
  loadingUsers: false,
  updatingRole: false,
  error: null,
};

function useAdminManagement() {
  const { auth } = useAuth();

  const [state, setState] = useState(INITIAL_STATE);

  /**
   * Load all users with an administrative role.
   */
  const loadAdmins = useCallback(async () => {
    setState((previous) => ({
      ...previous,
      loadingAdmins: true,
      error: null,
    }));

    try {
      const admins = await adminManagementService.getAdmins();

      setState((previous) => ({
        ...previous,
        admins,
        loadingAdmins: false,
      }));

      return admins;
    } catch (error) {
      console.error("Failed to load administrators:", error);

      setState((previous) => ({
        ...previous,
        loadingAdmins: false,
        error: error.message || "Failed to load administrators.",
      }));

      throw error;
    }
  }, []);

  /**
   * Search registered users who may be promoted to administrator.
   */
  const searchUsers = useCallback(async (searchTerm = "") => {
    setState((previous) => ({
      ...previous,
      loadingUsers: true,
      error: null,
    }));

    try {
      const users =
        await adminManagementService.searchUsers(searchTerm);

      setState((previous) => ({
        ...previous,
        users,
        loadingUsers: false,
      }));

      return users;
    } catch (error) {
      console.error("Failed to search users:", error);

      setState((previous) => ({
        ...previous,
        loadingUsers: false,
        error: error.message || "Failed to search users.",
      }));

      throw error;
    }
  }, []);

  /**
   * Promote or revoke administrator access.
   *
   * The service independently revalidates the actor against
   * Firestore before performing the transaction.
   */
  const updateUserRole = useCallback(
    async ({
      targetUserId,
      newRole,
      reason = "",
    }) => {
      const actorId = auth.currentUser?.uid;

      if (!actorId) {
        const error = new Error(
          "You must be authenticated to manage administrator access."
        );

        setState((previous) => ({
          ...previous,
          error: error.message,
        }));

        throw error;
      }

      setState((previous) => ({
        ...previous,
        updatingRole: true,
        error: null,
      }));

      try {
        const updatedUser =
          await adminManagementService.updateUserRole({
            targetUserId,
            newRole,
            actorId,
            reason,
          });

        /**
         * Keep the currently loaded administrators synchronized
         * without requiring an unnecessary full reload.
         */
        setState((previous) => {
          const wasAdmin =
            previous.admins.some(
              (admin) => admin.id === updatedUser.id
            );

         const isAdmin =
            updatedUser.role === ROLES.ADMIN ||
            updatedUser.role === ROLES.SUPER_ADMIN;
                    let admins = previous.admins;

          if (wasAdmin && !isAdmin) {
            admins = admins.filter(
              (admin) => admin.id !== updatedUser.id
            );
          }

          if (wasAdmin && isAdmin) {
            admins = admins.map((admin) =>
              admin.id === updatedUser.id
                ? updatedUser
                : admin
            );
          }

          if (!wasAdmin && isAdmin) {
            admins = [...admins, updatedUser];
          }

          /**
           * Also synchronize the search results if the user
           * is currently present there.
           */
          const users = previous.users.map((user) =>
            user.id === updatedUser.id
              ? updatedUser
              : user
          );

          return {
            ...previous,
            admins,
            users,
            updatingRole: false,
          };
        });

        return updatedUser;
      } catch (error) {
        console.error("Failed to update user role:", error);

        setState((previous) => ({
          ...previous,
          updatingRole: false,
          error:
            error.message ||
            "Failed to update administrator access.",
        }));

        throw error;
      }
    },
    [auth.currentUser?.uid]
  );

  /**
   * Clear the latest operation error.
   */
  const clearError = useCallback(() => {
    setState((previous) => ({
      ...previous,
      error: null,
    }));
  }, []);

  /**
   * Load the existing administrators when the hook is first used.
   */
  useEffect(() => {
    loadAdmins().catch(() => {
      // The error is already stored in state.
    });
  }, [loadAdmins]);

  return {
    admins: state.admins,
    users: state.users,

    loadingAdmins: state.loadingAdmins,
    loadingUsers: state.loadingUsers,
    updatingRole: state.updatingRole,

    error: state.error,

    loadAdmins,
    searchUsers,
    updateUserRole,
    clearError,
  };
}

export default useAdminManagement;