import useAdminMembers from "../hooks/useAdminMembers";

import MemberFilters from "../components/members/MemberFilters";
import MemberTable from "../components/members/MemberTable";


function Members() {
  const {
    members,
    status,
    searchTerm,
    loading,
    error,
    changeStatus,
    changeSearchTerm,
    clearFilters,
    refreshMembers,
  } = useAdminMembers();


  return (
    <section>
      {/* ==========================================
          PAGE HEADER
          ========================================== */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h1 className="h3 fw-bold mb-1">
            Members
          </h1>

          <p className="text-muted mb-0">
            View and manage registered WEMPA members.
          </p>
        </div>


        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={refreshMembers}
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

          {loading
            ? "Refreshing..."
            : "Refresh"}
        </button>
      </div>


      {/* ==========================================
          FILTERS
          ========================================== */}
      <MemberFilters
        status={status}
        searchTerm={searchTerm}
        onStatusChange={changeStatus}
        onSearchChange={changeSearchTerm}
        onClearFilters={clearFilters}
      />


      {/* ==========================================
          ERROR STATE
          ========================================== */}
      {error && (
        <div
          className="alert alert-danger d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3"
          role="alert"
        >
          <span>
            {error}
          </span>

          <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            onClick={refreshMembers}
          >
            Try Again
          </button>
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
                Loading members...
              </span>
            </div>

            <p className="text-muted mb-0">
              Loading members...
            </p>
          </div>
        </div>
      )}


      {/* ==========================================
          MEMBERS TABLE
          ========================================== */}
      {!loading && !error && (
        <MemberTable
          members={members}
        />
      )}
    </section>
  );
}


export default Members;