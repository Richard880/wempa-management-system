import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { useAuth } from "../../auth/hooks/useAuth";

import adminMemberService from "../services/adminMemberService";


function useAdminMemberDetails(memberId) {
  const { user } = useAuth();

  const [member, setMember] = useState(null);

  const [loading, setLoading] = useState(true);

  const [actionLoading, setActionLoading] =
    useState(false);

  const [error, setError] = useState(null);


  /* ==========================================
     Fetch Member
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

      const data =
        await adminMemberService.getMemberById(
          memberId
        );

      setMember(data);
    } catch (fetchError) {
      console.error(
        "Unable to load member details:",
        fetchError
      );

      setError(
        fetchError?.message ||
          "Unable to load member details."
      );
    } finally {
      setLoading(false);
    }
  }, [memberId]);


  /* ==========================================
     Initial Load
  ========================================== */

  useEffect(() => {
    fetchMember();
  }, [fetchMember]);


  /* ==========================================
     Update Membership Status
  ========================================== */

  const updateMembershipStatus = useCallback(
    async (status, reason) => {
      if (!memberId) {
        return;
      }

      try {
        setActionLoading(true);
        setError(null);

        await adminMemberService.updateMembershipStatus(
          memberId,
          status,
          user,
          reason
        );

        await fetchMember();
      } catch (actionError) {
        console.error(
          "Unable to update membership status:",
          actionError
        );

        setError(
          actionError?.message ||
            "Unable to update membership status."
        );

        throw actionError;
      } finally {
        setActionLoading(false);
      }
    },
    [
      memberId,
      user,
      fetchMember,
    ]
  );


  /* ==========================================
     Activate Member
  ========================================== */

  const activateMember = useCallback(
    async (reason) => {
      if (!memberId) {
        return;
      }

      try {
        setActionLoading(true);
        setError(null);

        await adminMemberService.activateMember(
          memberId,
          user,
          reason
        );

        await fetchMember();
      } catch (actionError) {
        console.error(
          "Unable to activate member:",
          actionError
        );

        setError(
          actionError?.message ||
            "Unable to activate member."
        );

        throw actionError;
      } finally {
        setActionLoading(false);
      }
    },
    [
      memberId,
      user,
      fetchMember,
    ]
  );


  /* ==========================================
     Suspend Member
  ========================================== */

  const suspendMember = useCallback(
    async (reason) => {
      if (!memberId) {
        return;
      }

      try {
        setActionLoading(true);
        setError(null);

        await adminMemberService.suspendMember(
          memberId,
          user,
          reason
        );

        await fetchMember();
      } catch (actionError) {
        console.error(
          "Unable to suspend member:",
          actionError
        );

        setError(
          actionError?.message ||
            "Unable to suspend member."
        );

        throw actionError;
      } finally {
        setActionLoading(false);
      }
    },
    [
      memberId,
      user,
      fetchMember,
    ]
  );


  /* ==========================================
     Deactivate Member
  ========================================== */

  const deactivateMember = useCallback(
    async (reason) => {
      if (!memberId) {
        return;
      }

      try {
        setActionLoading(true);
        setError(null);

        await adminMemberService.deactivateMember(
          memberId,
          user,
          reason
        );

        await fetchMember();
      } catch (actionError) {
        console.error(
          "Unable to deactivate member:",
          actionError
        );

        setError(
          actionError?.message ||
            "Unable to deactivate member."
        );

        throw actionError;
      } finally {
        setActionLoading(false);
      }
    },
    [
      memberId,
      user,
      fetchMember,
    ]
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