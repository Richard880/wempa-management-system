import {
  useCallback,
  useEffect,
  useState,
} from "react";

import adminMemberService from "../services/adminMemberService";


function useAdminMembers() {
  const [members, setMembers] = useState([]);
  const [status, setStatus] = useState("all");

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] =
    useState(false);

  const [error, setError] = useState(null);


  /* ==========================================
     Fetch Members
     ========================================== */

  const fetchMembers = useCallback(
    async (selectedStatus = status) => {
      try {
        setLoading(true);
        setError(null);

        const data =
          await adminMemberService.getMembers(
            selectedStatus
          );

        setMembers(data);
      } catch (fetchError) {
        console.error(
          "Unable to load members:",
          fetchError
        );

        setError(
          fetchError?.message ||
            "Unable to load members."
        );

        setMembers([]);
      } finally {
        setLoading(false);
      }
    },
    [status]
  );


  /* ==========================================
     Initial Load / Filter Changes
     ========================================== */

  useEffect(() => {
    fetchMembers(status);
  }, [status, fetchMembers]);


  /* ==========================================
     Change Status Filter
     ========================================== */

  const changeStatus = useCallback(
    (newStatus) => {
      setStatus(newStatus);
    },
    []
  );


  /* ==========================================
     Refresh Members
     ========================================== */

  const refreshMembers = useCallback(async () => {
    await fetchMembers(status);
  }, [fetchMembers, status]);


  /* ==========================================
     Update Member Status
     ========================================== */

  const updateMembershipStatus = useCallback(
    async (memberId, newStatus) => {
      try {
        setActionLoading(true);
        setError(null);

        await adminMemberService.updateMembershipStatus(
          memberId,
          newStatus
        );

        await fetchMembers(status);
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
    [fetchMembers, status]
  );


  /* ==========================================
     Activate Member
     ========================================== */

  const activateMember = useCallback(
    async (memberId) => {
      try {
        setActionLoading(true);
        setError(null);

        await adminMemberService.activateMember(
          memberId
        );

        await fetchMembers(status);
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
    [fetchMembers, status]
  );


  /* ==========================================
     Suspend Member
     ========================================== */

  const suspendMember = useCallback(
    async (memberId) => {
      try {
        setActionLoading(true);
        setError(null);

        await adminMemberService.suspendMember(
          memberId
        );

        await fetchMembers(status);
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
    [fetchMembers, status]
  );


  /* ==========================================
     Deactivate Member
     ========================================== */

  const deactivateMember = useCallback(
    async (memberId) => {
      try {
        setActionLoading(true);
        setError(null);

        await adminMemberService.deactivateMember(
          memberId
        );

        await fetchMembers(status);
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
    [fetchMembers, status]
  );


  return {
    /* Data */
    members,
    status,

    /* State */
    loading,
    actionLoading,
    error,

    /* Fetching */
    refreshMembers,
    changeStatus,

    /* Actions */
    updateMembershipStatus,
    activateMember,
    suspendMember,
    deactivateMember,
  };
}


export default useAdminMembers;