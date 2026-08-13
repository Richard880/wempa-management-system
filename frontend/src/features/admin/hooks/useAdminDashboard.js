import {
  useCallback,
  useEffect,
  useState,
} from "react";

import adminDashboardService from
  "../services/adminDashboardService";


function useAdminDashboard() {

 const [dashboard, setDashboard] = useState({
  stats: null,
  recentApplications: [],
  monthlyRevenue: [],
});

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);


  const loadDashboard =
    useCallback(async () => {

      try {
        setLoading(true);
        setError(null);

        const data =
          await adminDashboardService.getDashboardData();

        setDashboard(data);

      } catch (err) {
        console.error(
          "Failed to load admin dashboard:",
          err
        );

        setError(
          err?.message ||
          "Unable to load dashboard data."
        );

      } finally {
        setLoading(false);
      }

    }, []);


  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

return {
  stats: dashboard.stats,

  recentApplications:
    dashboard.recentApplications,

  monthlyRevenue:
    dashboard.monthlyRevenue,

  loading,
  error,

  refreshDashboard:
    loadDashboard,
};
}


export default useAdminDashboard;