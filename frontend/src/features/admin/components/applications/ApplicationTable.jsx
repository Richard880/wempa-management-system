// src/features/admin/components/applications/ApplicationTable.jsx
import PropTypes from "prop-types";
import ApplicationStatusBadge from "./ApplicationStatusBadge";
import { Link } from "react-router-dom";
import ROUTES from "../../../../constants/routes";

function formatDate(timestamp) {
  if (!timestamp) {
    return "—";
  }

  if (typeof timestamp?.toDate === "function") {
    return timestamp.toDate().toLocaleDateString("en-KE", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  }

  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleDateString("en-KE", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function ApplicationTable({ applications }) {
  if (!applications || !applications.length) {
    return (
      <div className="card border-0 shadow-sm bg-white rounded-3">
        <div className="card-body p-5 text-center">
          <i
            className="bi bi-inbox fs-1 text-muted d-block mb-3"
            aria-hidden="true"
          />
          <h5 className="fw-bold text-dark mb-2">No applications found</h5>
          <p className="text-muted small mb-0 max-w-md mx-auto">
            There are currently no membership applications matching the selected workspace filters.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light text-uppercase fs-7" style={{ letterSpacing: "0.5px" }}>
          <tr>
            <th scope="col" className="ps-4 text-secondary fw-bold">Applicant & ID</th>
            <th scope="col" className="text-secondary fw-bold">Email</th>
            <th scope="col" className="text-secondary fw-bold">Progress</th>
            <th scope="col" className="text-secondary fw-bold">Status</th>
            <th scope="col" className="text-secondary fw-bold">Submitted</th>
            <th scope="col" className="text-end pe-4 text-secondary fw-bold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((application) => {
            // Read pre-extracted and memoized names and IDs from parent sanitizer array
            const displayName = application.applicantName;
            const membershipID = application.membershipNumber;
            const completionRate = application.profileCompletion || 0;

            // Compute dynamic progress ribbon fill track color styles
            let progressFillVariant = "bg-info";
            if (completionRate === 100) progressFillVariant = "bg-success";
            else if (completionRate < 50) progressFillVariant = "bg-warning";

            return (
              <tr key={application.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                {/* APPLICANT IDENTITY AND MONOSPACED ID GRID */}
                <td className="ps-4 py-3">
                  <div className="fw-bold text-dark mb-0.5" style={{ fontSize: "0.9375rem" }}>
                    {displayName}
                  </div>
                  <span 
                    className="badge bg-light text-secondary font-monospace border fw-bold text-xs"
                    style={{ letterSpacing: "0.2px", padding: "0.25rem 0.5rem" }}
                  >
                    {membershipID}
                  </span>
                </td>

                <td className="text-secondary small fw-medium">
                  {application.emailAddress || "—"}
                </td>

                {/* PROGRESS METER RIBBON COLUMN */}
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <div className="progress bg-light" style={{ width: "95px", height: "6px", borderRadius: "10px" }}>
                      <div
                        className={`progress-bar ${progressFillVariant}`}
                        role="progressbar"
                        style={{ width: `${completionRate}%`, borderRadius: "inherit" }}
                        aria-valuenow={completionRate}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                    <small className="text-dark fw-bold font-monospace text-xs">
                      {completionRate}%
                    </small>
                  </div>
                </td>

                <td>
                  <ApplicationStatusBadge status={application.applicationStatus} />
                </td>

                <td className="text-secondary small font-monospace">
                  {formatDate(application.submittedAt || application.createdAt)}
                </td>

                {/* ACTION CONTEXT FOOTER REVIEW TRANSITIONS */}
                <td className="text-end pe-4">
                  <Link
                    to={ROUTES.ADMIN_APPLICATION_REVIEW.replace(
                      ":applicationId",
                      application.id
                    )}
                    className="btn btn-sm btn-primary fw-bold px-3 d-inline-flex align-items-center gap-1.5"
                    style={{ borderRadius: "8px", fontSize: "0.8125rem", padding: "0.45rem 1rem" }}
                  >
                    <i className="bi bi-eye-fill text-xs" aria-hidden="true" />
                    Review File
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

ApplicationTable.propTypes = {
  applications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      applicantName: PropTypes.string,
      membershipNumber: PropTypes.string,
      emailAddress: PropTypes.string,
      profileCompletion: PropTypes.number,
      applicationStatus: PropTypes.string,
      submittedAt: PropTypes.any,
      createdAt: PropTypes.any,
    })
  ).isRequired,
};

export default ApplicationTable;
