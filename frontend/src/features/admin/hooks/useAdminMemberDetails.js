// src/features/admin/hooks/useAdminMemberDetails.js
import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { useAuth } from "../../auth/hooks/useAuth";
import adminMemberService from "../services/adminMemberService";

function useAdminMemberDetails(memberId) {
  // 🟢 FIXED DESTRUCTURING: Changed 'user' to 'auth' to match your actual hook signature
  const { auth } = useAuth();

  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🟢 FIXED ACCOUNT RESOLUTION: Safely extract the active user credentials from the auth session wrapper
  const currentUser = auth?.currentUser || auth?.user || null;

  /* ==========================================
     Fetch Member Details
  ========================================== */
  const fetchMember = useCallback(async () => {
    if (!memberId) {
      setMember(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await adminMemberService.getMemberById(memberId);
      setMember(data);
    } catch (fetchError) {
      console.error("Unable to load member details:", fetchError);
      setError(fetchError?.message || "Unable to load member details.");
    } finally {
      setLoading(false);
    }
  }, [memberId]);

  /* ==========================================
     Initial Load Trigger
  ========================================== */
  useEffect(() => {
    fetchMember();
  }, [fetchMember]);

  /* ==========================================
     Update Membership Status
  ========================================== */
  const updateMembershipStatus = useCallback(
    async (status, reason) => {
      if (!memberId) return;

      try {
        setActionLoading(true);
        setError(null);

        // 🟢 FIXED EXPLICIT PARAMETER INJECTION: Pass the valid administrator pointer instead of undefined 'user'
        await adminMemberService.updateMembershipStatus(
          memberId,
          status,
          currentUser,
          reason
        );

        await fetchMember();
      } catch (actionError) {
        console.error("Unable to update membership status:", actionError);
        setError(actionError?.message || "Unable to update membership status.");
        throw actionError;
      } finally {
        setActionLoading(false);
      }
    },
    [memberId, currentUser, fetchMember]
  );

  /* ==========================================
     Activate Member Status
  ========================================== */
  const activateMember = useCallback(
    async (reason) => {
      if (!memberId) return;

      try {
        setActionLoading(true);
        setError(null);

        await adminMemberService.activateMember(
          memberId,
          currentUser,
          reason
        );

        await fetchMember();
      } catch (actionError) {
        console.error("Unable to activate member:", actionError);
        setError(actionError?.message || "Unable to activate member.");
        throw actionError;
      } finally {
        setActionLoading(false);
      }
    },
    [memberId, currentUser, fetchMember]
  );

  /* ==========================================
     Suspend Member Status
  ========================================== */
  const suspendMember = useCallback(
    async (reason) => {
      if (!memberId) return;

      try {
        setActionLoading(true);
        setError(null);

        await adminMemberService.suspendMember(
          memberId,
          currentUser,
          reason
        );

        await fetchMember();
      } catch (actionError) {
        console.error("Unable to suspend member:", actionError);
        setError(actionError?.message || "Unable to suspend member.");
        throw actionError;
      } finally {
        setActionLoading(false);
      }
    },
    [memberId, currentUser, fetchMember]
  );

  /* ==========================================
     Deactivate Member Status
     ========================================== */
  const deactivateMember = useCallback(
    async (reason) => {
      if (!memberId) return;

      try {
        setActionLoading(true);
        setError(null);

        await adminMemberService.deactivateMember(
          memberId,
          currentUser,
          reason
        );

        await fetchMember();
      } catch (actionError) {
        console.error("Unable to deactivate member:", actionError);
        setError(actionError?.message || "Unable to deactivate member.");
        throw actionError;
      } finally {
        setActionLoading(false);
      }
    },
    [memberId, currentUser, fetchMember]
  );

  return {
    member,
    loading,
    actionLoading,
    error,
    refreshMember: fetchMember,
    updateMembershipStatus,
    activateMember,
    suspendMember,
    deactivateMember,
  };
}

export default useAdminMemberDetails;
