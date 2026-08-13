import DashboardStats from "../components/DashboardStats";
import RevenueChart from "../components/RevenueChart";
import RecentActivity from "../components/RecentActivity";

import useAdminDashboard from "../hooks/useAdminDashboard";


function Dashboard() {
  const {
  stats,
  recentApplications,
  monthlyRevenue,
  loading,
  error,
  refreshDashboard,
} = useAdminDashboard();


  if (loading) {
    return (
      <div className="py-5 text-center">
        <div
          className="spinner-border"
          role="status"
        >
          <span className="visually-hidden">
            Loading dashboard...
          </span>
        </div>
      </div>
    );
  }


  if (error) {
    return (
      <div
        className="alert alert-danger d-flex justify-content-between align-items-center"
        role="alert"
      >
        <span>{error}</span>

        <button
          type="button"
          className="btn btn-sm btn-outline-danger"
          onClick={refreshDashboard}
        >
          Try Again
        </button>
      </div>
    );
  }


  return (
    <main className="admin-dashboard">

      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">

        <div>
          <h1 className="h3 fw-bold mb-1">
            Admin Dashboard
          </h1>

          <p className="text-muted mb-0">
            Overview of WEMPA membership and platform activity.
          </p>
        </div>


        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={refreshDashboard}
        >
          <i
            className="bi bi-arrow-clockwise me-2"
            aria-hidden="true"
          />

          Refresh
        </button>

      </div>


      <DashboardStats
        stats={stats}
      />


     <div className="row g-4 mt-1">

  <div className="col-12 col-xl-7">
    <RevenueChart
      data={monthlyRevenue}
    />
  </div>

  <div className="col-12 col-xl-5">
    <RecentActivity
      applications={recentApplications}
    />
  </div>

</div>

    </main>
  );
}


export default Dashboard;