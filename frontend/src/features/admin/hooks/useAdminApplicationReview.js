import {
  useCallback,
  useEffect,
  useState,
} from "react";

import useAuth from "../../auth/hooks/useAuth";
import adminApplicationService from "../services/adminApplicationService";


function useAdminApplicationReview(applicationId) {
  const { auth } = useAuth();

  const [application, setApplication] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [actionLoading, setActionLoading] =
    useState(false);

  const [error, setError] =
    useState(null);


  /* ==========================================
     Current Administrator
     ========================================== */

  const getCurrentAdmin = useCallback(() => {
    const currentUser =
      auth?.currentUser;

    const profile =
      auth?.profile;

    if (!currentUser?.uid) {
      throw new Error(
        "Unable to identify the administrator performing this action."
      );
    }

    return {
      uid: currentUser.uid,

      displayName:
        currentUser.displayName ||
        profile?.displayName ||
        profile?.name ||
        null,

      name:
        profile?.name ||
        profile?.fullName ||
        currentUser.displayName ||
        null,

      email:
        currentUser.email ||
        profile?.email ||
        null,
    };
  }, [auth]);


  /* ==========================================
     Fetch Application
     ========================================== */

  const fetchApplication = useCallback(async () => {
    if (!applicationId) {
      setApplication(null);
      setLoading(false);

      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data =
        await adminApplicationService.getApplicationById(
          applicationId
        );

      setApplication(data);
    } catch (fetchError) {
      console.error(
        "Unable to load application for review:",
        fetchError
      );

      setError(
        fetchError?.message ||
          "Unable to load the membership application."
      );
    } finally {
      setLoading(false);
    }
  }, [applicationId]);


  useEffect(() => {
    fetchApplication();
  }, [fetchApplication]);


  /* ==========================================
     Approve Application
     ========================================== */

  const approveApplication = useCallback(async () => {
    if (!applicationId) {
      throw new Error(
        "Application ID is required."
      );
    }

    try {
      setActionLoading(true);
      setError(null);

      const admin =
        getCurrentAdmin();

      await adminApplicationService.approveApplication(
        applicationId,
        admin
      );

      await fetchApplication();
    } catch (actionError) {
      console.error(
        "Unable to approve application:",
        actionError
      );

      setError(
        actionError?.message ||
          "Unable to approve the application."
      );

      throw actionError;
    } finally {
      setActionLoading(false);
    }
  }, [
    applicationId,
    fetchApplication,
    getCurrentAdmin,
  ]);


  /* ==========================================
     Reject Application
     ========================================== */

  const rejectApplication = useCallback(
    async (rejectionReason) => {
      if (!applicationId) {
        throw new Error(
          "Application ID is required."
        );
      }

      try {
        setActionLoading(true);
        setError(null);

        const admin =
          getCurrentAdmin();

        await adminApplicationService.rejectApplication(
          applicationId,
          admin,
          rejectionReason
        );

        await fetchApplication();
      } catch (actionError) {
        console.error(
          "Unable to reject application:",
          actionError
        );

        setError(
          actionError?.message ||
            "Unable to reject the application."
        );

        throw actionError;
      } finally {
        setActionLoading(false);
      }
    },
    [
      applicationId,
      fetchApplication,
      getCurrentAdmin,
    ]
  );


  /* ==========================================
     Public Hook API
     ========================================== */

  return {
    application,
    loading,
    actionLoading,
    error,

    refreshApplication: fetchApplication,

    approveApplication,
    rejectApplication,
  };
}


export default useAdminApplicationReview;