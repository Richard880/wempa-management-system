import useAdminApplications from "../hooks/useAdminApplications";

import ApplicationFilters from "../components/applications/ApplicationFilters";
import ApplicationTable from "../components/applications/ApplicationTable";


function Applications() {
  const {
    applications,
    status,
    loading,
    error,
    changeStatus,
    refreshApplications,
  } = useAdminApplications();


  return (
    <section>
      {/* ==========================================
          PAGE HEADER
          ========================================== */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h1 className="h3 fw-bold mb-1">
            Membership Applications
          </h1>

          <p className="text-muted mb-0">
            Review and manage membership applications.
          </p>
        </div>


        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={refreshApplications}
          disabled={loading}
        >
          <i
            className={`bi ${
              loading
                ? "bi-arrow-repeat"
                : "bi-arrow-clockwise"
            } me-2`}
            aria-hidden="true"
          />

          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>


      {/* ==========================================
          FILTERS
          ========================================== */}
      <ApplicationFilters
        status={status}
        onStatusChange={changeStatus}
      />


      {/* ==========================================
          ERROR STATE
          ========================================== */}
      {error && (
        <div
          className="alert alert-danger"
          role="alert"
        >
          <div className="d-flex justify-content-between align-items-center gap-3">
            <span>{error}</span>

            <button
              type="button"
              className="btn btn-sm btn-danger"
              onClick={refreshApplications}
            >
              Try Again
            </button>
          </div>
        </div>
      )}


      {/* ==========================================
          LOADING STATE
          ========================================== */}
      {loading && (
        <div className="card border-0 shadow-sm">
          <div className="card-body p-5 text-center">
            <div
              className="spinner-border text-primary mb-3"
              role="status"
            >
              <span className="visually-hidden">
                Loading applications...
              </span>
            </div>

            <p className="text-muted mb-0">
              Loading membership applications...
            </p>
          </div>
        </div>
      )}


      {/* ==========================================
          APPLICATION TABLE
          ========================================== */}
      {!loading && !error && (
        <ApplicationTable
          applications={applications}
        />
      )}
    </section>
  );
}


export default Applications;