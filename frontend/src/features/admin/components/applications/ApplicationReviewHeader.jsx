import { Link } from "react-router-dom";

import ROUTES from "../../../../constants/routes";
import ApplicationStatusBadge from "./ApplicationStatusBadge";


function ApplicationReviewHeader({ application }) {
  const personal = application?.personal || {};

  const fullName = [
    personal.firstName,
    personal.middleName,
    personal.lastName,
  ]
    .filter(Boolean)
    .join(" ");


  return (
    <div className="mb-4">
      <Link
        to={ROUTES.ADMIN_APPLICATIONS}
        className="btn btn-sm btn-outline-secondary mb-3"
      >
        <i
          className="bi bi-arrow-left me-2"
          aria-hidden="true"
        />

        Back to Applications
      </Link>


      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
        <div>
          <p className="text-muted small text-uppercase fw-semibold mb-1">
            Membership Application Review
          </p>

          <h1 className="h2 fw-bold mb-1">
            {fullName || "Unnamed Applicant"}
          </h1>

          <p className="text-muted mb-0">
            Review the submitted membership application.
          </p>
        </div>


        <ApplicationStatusBadge
          status={application?.applicationStatus}
        />
      </div>
    </div>
  );
}


export default ApplicationReviewHeader;