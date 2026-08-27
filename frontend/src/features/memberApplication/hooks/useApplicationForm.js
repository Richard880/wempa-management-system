import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import applicationService from "../services/applicationService";
import ROUTES from "../../../constants/routes";

export default function useApplicationForm() {
  const { auth } = useAuth();
  const user = auth?.currentUser;
  const navigate = useNavigate();
  const userId = user?.uid;

  const [application, setApplication] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const fetchApplication = useCallback(async (showLoader = false) => {
    if (!userId) {
      setLoading(false);
      return null; // Return value to support tracking resolution threads
    }
    try {
      if (showLoader) setLoading(true);
      const result = await applicationService.getApplication(userId);
      setProfile(result?.profile || null);
      setApplication(result?.application || null);
      return result?.application || null; // Hand back fresh data values
    } catch (err) {
      setError(err.message || "Failed to fetch application data.");
      return null;
    } finally {
      if (showLoader) setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchApplication(true);
  }, [fetchApplication]);

  /**
   * SAVES and then NAVIGATES
   * Hardened to guarantee state synchronization before resolving step changes.
   */
  const saveSection = useCallback(async (section, data, targetStep = null) => {
    if (!userId) return false;
    
    const sanitizedData = data && typeof data === 'object' ? { ...data } : {};
    
    setSaving(true);
    try {
      const currentStep = application?.currentStep || 1;
      const nextStepId = targetStep || currentStep + 1;

      // 1. Commit layout variables completely to Firestore collections
      await applicationService.saveSection({
        uid: userId,
        section,
        data: sanitizedData,
        currentStep: nextStepId
      });
      
      // 2. CRITICAL FIX: Explicitly await the asynchronous data download 
      // so your data is locally available before the UI switches pages.
      await fetchApplication(false);
      return true;
    } catch (err) {
      setError(err.message || "Failed to save section data.");
      return false;
    } finally {
      setSaving(false);
    }
  }, [userId, application, fetchApplication]);

  const goToStep = useCallback(async (stepId) => {
    if (!userId) return;
    try {
      await applicationService.updateCurrentStep(userId, stepId);
      // CRITICAL FIX: Wait for state confirmation parameters to land
      await fetchApplication(false);
    } catch (err) {
      setError(err.message || "Failed to alter application steps.");
    }
  }, [userId, fetchApplication]);

  /**
   * FINAL SUBMISSION (The "Lock")
   */
  const submitApplication = useCallback(async (finalData = {}) => {
    if (!userId) return;
    
    const sanitizedFinalData = finalData && typeof finalData === 'object' ? { ...finalData } : {};
    
    setSaving(true);
    try {
      await applicationService.saveSection({
        uid: userId,
        section: "declaration",
        data: sanitizedFinalData,
        currentStep: 5 
      });

      await applicationService.submitApplication(userId);
      navigate(ROUTES.MEMBER_DASHBOARD, { replace: true });
    } catch (err) {
      setError(err.message || "Submission execution failed.");
    } finally {
      setSaving(false);
    }
  }, [userId, navigate]);

     return {
    application,
    // FIX: Drill past the accidental double nested map structure safely
    documents: application?.documents?.documents || application?.documents || {},
    profile,
    loading,
    saving,
    error,
    currentStep: application?.currentStep || 1,
    completedSteps: application?.completedSections || [],
    progress: application?.profileCompletion || 0,
    isLocked: application?.applicationStatus === "submitted",
    saveSection,
    submitApplication,
    goToStep,
    nextStep: () => goToStep((application?.currentStep || 1) + 1),
    previousStep: () => goToStep(Math.max((application?.currentStep || 1) - 1, 1)),
    refresh: fetchApplication
  };

}
