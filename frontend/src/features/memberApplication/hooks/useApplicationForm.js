import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import applicationService from "../services/applicationService";

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
      return;
    }
    try {
      if (showLoader) setLoading(true);
      const result = await applicationService.getApplication(userId);
      setProfile(result?.profile || null);
      setApplication(result?.application || null);
    } catch (err) {
      setError(err.message || "Failed to fetch application data.");
    } finally {
      if (showLoader) setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchApplication(true);
  }, [fetchApplication]);

  /**
   * SAVES and then NAVIGATES
   * This ensures data is safely in Firestore before updating frontend UI states.
   */
  const saveSection = useCallback(async (section, data, targetStep = null) => {
    if (!userId) return false;
    
    // Safety check: Prevent saving empty variables or raw un-serialized event payloads
    const sanitizedData = data && typeof data === 'object' ? { ...data } : {};
    
    setSaving(true);
    try {
      const currentStep = application?.currentStep || 1;
      const nextStepId = targetStep || currentStep + 1;

      await applicationService.saveSection({
        uid: userId,
        section,
        data: sanitizedData,
        currentStep: nextStepId
      });
      
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
      // 1. Save the final declaration data completely
      await applicationService.saveSection({
        uid: userId,
        section: "declaration",
        data: sanitizedFinalData,
        currentStep: 9 // Lock stepping values
      });

      // 2. Trigger formal submission properties
      await applicationService.submitApplication(userId);
      
      // 3. Clean routing back to application panel
      navigate("/member-dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Submission execution failed.");
    } finally {
      setSaving(false);
    }
  }, [userId, navigate]);

  return {
    application,
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
