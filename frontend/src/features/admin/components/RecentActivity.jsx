function formatActivityDate(timestamp) {
  if (!timestamp) {
    return "Recently";
  }

  const date =
    typeof timestamp.toDate === "function"
      ? timestamp.toDate()
      : new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return "Recently";
  }

  const now = new Date();
  const difference = now.getTime() - date.getTime();

  const minutes = Math.floor(
    difference / (1000 * 60)
  );

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes} min ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 7) {
    return `${days} day${days === 1 ? "" : "s"} ago`;
  }

  return date.toLocaleDateString("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}


function getApplicationActivity(application) {
  const status = application.applicationStatus;

  const personal =
    application.personal || {};

  const fullName = [
    personal.firstName,
    personal.middleName,
    personal.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  const memberName =
    fullName || "A member";

  switch (status) {
    case "submitted":
      return {
        title: "New application submitted",
        description: `${memberName} submitted a membership application.`,
        icon: "bi-file-earmark-check",
        iconClass: "bg-primary-subtle text-primary",
        date: application.submittedAt || application.updatedAt,
      };

    case "approved":
      return {
        title: "Application approved",
        description: `${memberName}'s membership application was approved.`,
        icon: "bi-check-circle",
        iconClass: "bg-success-subtle text-success",
        date: application.updatedAt,
      };

    case "rejected":
      return {
        title: "Application rejected",
        description: `${memberName}'s membership application was rejected.`,
        icon: "bi-x-circle",
        iconClass: "bg-danger-subtle text-danger",
        date: application.updatedAt,
      };

    case "draft":
      return {
        title: "Application updated",
        description: `${memberName} updated their membership application.`,
        icon: "bi-pencil-square",
        iconClass: "bg-warning-subtle text-warning",
        date: application.updatedAt,
      };

    default:
      return {
        title: "Membership activity",
        description: `${memberName}'s membership record was updated.`,
        icon: "bi-person",
        iconClass: "bg-secondary-subtle text-secondary",
        date: application.updatedAt,
      };
  }
}


function RecentActivity({ applications = [] }) {
  return (
    <section className="card border-0 shadow-sm h-100">

      <div className="card-header bg-white border-0 pt-4 px-4">
        <div className="d-flex justify-content-between align-items-center">

          <div>
            <h2 className="h5 fw-bold mb-1">
              Recent Activity
            </h2>

            <p className="text-muted small mb-0">
              Latest membership application activity
            </p>
          </div>

          <i
            className="bi bi-activity fs-4 text-muted"
            aria-hidden="true"
          />

        </div>
      </div>


      <div className="card-body px-4 pb-4">

        {applications.length === 0 ? (

          <div className="text-center py-5 text-muted">

            <i
              className="bi bi-inbox fs-2 d-block mb-3"
              aria-hidden="true"
            />

            <p className="mb-0">
              No recent activity yet.
            </p>

          </div>

        ) : (

          <div className="d-flex flex-column">

            {applications.map((application) => {
              const activity =
                getApplicationActivity(application);

              return (
                <article
                  key={application.id}
                  className="d-flex gap-3 py-3 border-bottom"
                >

                  <div
                    className={`d-flex align-items-center justify-content-center rounded-circle flex-shrink-0 ${activity.iconClass}`}
                    style={{
                      width: "42px",
                      height: "42px",
                    }}
                  >
                    <i
                      className={`bi ${activity.icon}`}
                      aria-hidden="true"
                    />
                  </div>


                  <div className="flex-grow-1">

                    <div className="d-flex justify-content-between gap-3">

                      <h3 className="h6 fw-semibold mb-1">
                        {activity.title}
                      </h3>


                      <span className="text-muted small text-nowrap">
                        {formatActivityDate(activity.date)}
                      </span>

                    </div>


                    <p className="text-muted small mb-0">
                      {activity.description}
                    </p>

                  </div>

                </article>
              );
            })}

          </div>

        )}

      </div>

    </section>
  );
}


export default RecentActivity;