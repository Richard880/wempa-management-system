import {
  useState,
  useEffect,
  useCallback,
} from "react";

import { useAuth } from "../../auth/hooks/useAuth";

import applicationService from "../services/applicationService";

function useApplicationStep(section) {
  const { user } = useAuth();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [application, setApplication] =
    useState(null);

  const [error, setError] =
    useState(null);

  useEffect(() => {
    async function load() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const data =
          await applicationService.getApplication(
            user.uid
          );

        setApplication(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [user]);

  const save = useCallback(
    async ({
      data,
      currentStep,
    }) => {
      if (!user) return;

      try {
        setSaving(true);

        await applicationService.saveSection({
          uid: user.uid,
          section,
          data,
          currentStep,
        });
      } catch (err) {
        setError(err);
      } finally {
        setSaving(false);
      }
    },
    [user, section]
  );

  return {
    loading,
    saving,
    application,
    error,
    save,
  };
}

export default useApplicationStep;