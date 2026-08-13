function ApplicationFilters({
  status,
  onStatusChange,
}) {
  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body p-3">
        <div className="d-flex flex-wrap align-items-center gap-2">
          <span className="fw-semibold me-2">
            Filter applications:
          </span>


          <button
            type="button"
            className={`btn ${
              status === "all"
                ? "btn-primary"
                : "btn-outline-secondary"
            }`}
            onClick={() => onStatusChange("all")}
          >
            All
          </button>


          <button
            type="button"
            className={`btn ${
              status === "draft"
                ? "btn-primary"
                : "btn-outline-secondary"
            }`}
            onClick={() => onStatusChange("draft")}
          >
            Drafts
          </button>


          <button
            type="button"
            className={`btn ${
              status === "submitted"
                ? "btn-primary"
                : "btn-outline-secondary"
            }`}
            onClick={() => onStatusChange("submitted")}
          >
            Submitted
          </button>


          <button
            type="button"
            className={`btn ${
              status === "approved"
                ? "btn-primary"
                : "btn-outline-secondary"
            }`}
            onClick={() => onStatusChange("approved")}
          >
            Approved
          </button>


          <button
            type="button"
            className={`btn ${
              status === "rejected"
                ? "btn-primary"
                : "btn-outline-secondary"
            }`}
            onClick={() => onStatusChange("rejected")}
          >
            Rejected
          </button>
        </div>
      </div>
    </div>
  );
}


export default ApplicationFilters;