import ApplicationStatusBadge from "./ApplicationStatusBadge";
import { Link } from "react-router-dom";

import ROUTES from "../../../../constants/routes";

function getApplicantName(application) {
  const personal = application.personal || {};

  return [
    personal.firstName,
    personal.middleName,
    personal.lastName,
  ]
    .filter(Boolean)
    .join(" ");
}


function formatDate(timestamp) {
  if (!timestamp) {
    return "—";
  }

  if (typeof timestamp?.toDate === "function") {
    return timestamp
      .toDate()
      .toLocaleDateString();
  }

  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleDateString();
}


function ApplicationTable({
  applications,
//   onViewApplication,
}) {
  if (!applications.length) {
    return (
      <div className="card border-0 shadow-sm">
        <div className="card-body p-5 text-center">
          <i
            className="bi bi-inbox fs-1 text-muted d-block mb-3"
            aria-hidden="true"
          />

          <h5 className="mb-2">
            No applications found
          </h5>

          <p className="text-muted mb-0">
            There are no membership applications
            matching the selected filter.
          </p>
        </div>
      </div>
    );
  }


  return (
    <div className="card border-0 shadow-sm">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th className="ps-4">
                Applicant
              </th>

              <th>
                Email
              </th>

              <th>
                Progress
              </th>

              <th>
                Status
              </th>

              <th>
                Submitted
              </th>

              <th className="text-end pe-4">
                Actions
              </th>
            </tr>
          </thead>


          <tbody>
            {applications.map((application) => {
              const applicantName =
                getApplicantName(application);

              return (
                <tr key={application.id}>
                  <td className="ps-4">
                    <div className="fw-semibold">
                      {applicantName || "Unnamed Applicant"}
                    </div>

                    <small className="text-muted">
                      {application.id}
                    </small>
                  </td>


                  <td>
                    {application.contact?.email ||
                      "—"}
                  </td>


                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <div
                        className="progress"
                        style={{ width: "90px", height: "6px" }}
                      >
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{
                            width: `${application.profileCompletion || 0}%`,
                          }}
                          aria-valuenow={
                            application.profileCompletion || 0
                          }
                          aria-valuemin="0"
                          aria-valuemax="100"
                        />
                      </div>

                      <small className="text-muted">
                        {application.profileCompletion || 0}%
                      </small>
                    </div>
                  </td>


                  <td>
                    <ApplicationStatusBadge
                      status={application.applicationStatus}
                    />
                  </td>


                  <td>
                    {formatDate(
                      application.submittedAt ||
                        application.createdAt
                    )}
                  </td>


                  <td className="text-end pe-4">
                     <Link
                        to={ROUTES.ADMIN_APPLICATION_REVIEW.replace(
                            ":applicationId",
                            application.id
                        )}
                        className="btn btn-sm btn-outline-primary"
                        >
                        <i
                            className="bi bi-eye me-1"
                            aria-hidden="true"
                        />

                        Review
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}


export default ApplicationTable;