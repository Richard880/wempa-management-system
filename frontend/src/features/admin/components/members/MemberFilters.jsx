import MEMBERSHIP_STATUS from "../../../../constants/membershipStatus";


const STATUS_OPTIONS = [
  {
    value: "all",
    label: "All Statuses",
  },

  {
    value: MEMBERSHIP_STATUS.PENDING,
    label: "Pending",
  },

  {
    value: MEMBERSHIP_STATUS.ACTIVE,
    label: "Active",
  },

  {
    value: MEMBERSHIP_STATUS.SUSPENDED,
    label: "Suspended",
  },

  {
    value: MEMBERSHIP_STATUS.EXPIRED,
    label: "Expired",
  },

  {
    value: MEMBERSHIP_STATUS.REJECTED,
    label: "Rejected",
  },

  {
    value: MEMBERSHIP_STATUS.TERMINATED,
    label: "Terminated",
  },

  {
    value: MEMBERSHIP_STATUS.INACTIVE,
    label: "Inactive",
  },
];


function MemberFilters({
  status,
  searchTerm,
  onStatusChange,
  onSearchChange,
  onClearFilters,
}) {
  const hasActiveFilters =
    status !== "all" || Boolean(searchTerm);


  const handleSearchChange = (event) => {
    onSearchChange(event.target.value);
  };


  const handleStatusChange = (event) => {
    onStatusChange(event.target.value);
  };


  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body p-3 p-md-4">
        <div className="row g-3 align-items-end">
          {/* ==========================================
              SEARCH
              ========================================== */}
          <div className="col-12 col-md-6 col-lg-5">
            <label
              htmlFor="member-search"
              className="form-label fw-semibold"
            >
              Search Members
            </label>

            <div className="input-group">
              <span className="input-group-text bg-white">
                <i
                  className="bi bi-search"
                  aria-hidden="true"
                />
              </span>

              <input
                id="member-search"
                type="search"
                className="form-control"
                placeholder="Name, email or membership number..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>


          {/* ==========================================
              STATUS FILTER
              ========================================== */}
          <div className="col-12 col-md-4 col-lg-3">
            <label
              htmlFor="member-status"
              className="form-label fw-semibold"
            >
              Membership Status
            </label>

            <select
              id="member-status"
              className="form-select"
              value={status}
              onChange={handleStatusChange}
            >
              {STATUS_OPTIONS.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>


          {/* ==========================================
              CLEAR FILTERS
              ========================================== */}
          <div className="col-12 col-md-2 col-lg-2">
            <button
              type="button"
              className="btn btn-outline-secondary w-100"
              onClick={onClearFilters}
              disabled={!hasActiveFilters}
            >
              <i
                className="bi bi-x-circle me-2"
                aria-hidden="true"
              />

              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default MemberFilters;