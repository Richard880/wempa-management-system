import { useCallback, useEffect, useState } from "react";

import adminApplicationService from "../services/adminApplicationService";


function useAdminApplications(initialStatus = "all") {
  const [applications, setApplications] = useState([]);
  const [status, setStatus] = useState(initialStatus);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data =
        await adminApplicationService.getApplications(status);

      setApplications(data);
    } catch (fetchError) {
      console.error(
        "Unable to load admin applications:",
        fetchError
      );

      setError(
        fetchError?.message ||
          "Unable to load membership applications."
      );
    } finally {
      setLoading(false);
    }
  }, [status]);


  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);


  const changeStatus = useCallback((nextStatus) => {
    setStatus(nextStatus);
  }, []);


  return {
    applications,
    status,
    loading,
    error,

    changeStatus,
    refreshApplications: fetchApplications,
  };
}


export default useAdminApplications;