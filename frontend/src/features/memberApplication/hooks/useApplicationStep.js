import { useState, useCallback } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import useWizard from "../../../components/workflow/WizardProvider/useWizard";
import applicationService from "../services/applicationService";

export default function useApplicationStep({
  section,
  currentStep,
  reset,
}) {
  const { auth } = useAuth();
  const { actions } = useWizard();
  const [isSaving, setIsSaving] = useState(false);

  const saveStepData = useCallback(async (data) => {
    const activeUser = auth?.currentUser;
    if (!activeUser) {
      console.error("Save failed: No active user session detected.");
      return false;
    }
    
    // De-proxying the state payload cleanly for Firestore
    const explicitPayload = data ? JSON.parse(JSON.stringify(data)) : null;

    if (!explicitPayload || Object.keys(explicitPayload).length === 0) {
      console.warn(`Attempting to save empty form object for section: ${section}`);
    }
    
    setIsSaving(true);
    try {
      // 1. Save data directly to Firestore
      await applicationService.saveSection({
        uid: activeUser.uid,
        section,
        data: explicitPayload || {},
        currentStep,
      });

      // 2. Synchronize internal React Hook Form states
      if (typeof reset === 'function') {
        reset(explicitPayload, { keepValues: true, keepDirty: false });
      }

      // 3. SAFE NAVIGATION: Move to next screen step automatically
      if (actions?.nextStep) {
        actions.nextStep();
      } else {
        console.warn("Wizard navigation tracking failed: nextStep action missing.");
      }
      
      return true;
    } catch (error) {
      console.error(`Manual save failed for ${section}:`, error.message || error);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [auth, section, currentStep, actions, reset]);

  return {
    saveStepData,
    isSaving,
  };
}
