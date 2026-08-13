const STATUS_CLASSES = {
  draft: "bg-secondary-subtle text-secondary",
  submitted: "bg-warning-subtle text-warning-emphasis",
  pending: "bg-warning-subtle text-warning-emphasis",
  approved: "bg-success-subtle text-success",
  rejected: "bg-danger-subtle text-danger",
};


function ApplicationStatusBadge({ status }) {
  const normalizedStatus =
    status?.toLowerCase() || "draft";

  const badgeClass =
    STATUS_CLASSES[normalizedStatus] ||
    "bg-secondary-subtle text-secondary";


  return (
    <span
      className={`badge rounded-pill px-3 py-2 ${badgeClass}`}
    >
      {normalizedStatus}
    </span>
  );
}


export default ApplicationStatusBadge;