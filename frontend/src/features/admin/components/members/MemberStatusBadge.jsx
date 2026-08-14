const STATUS_CONFIG = {
  active: {
    label: "Active",
    className: "bg-success-subtle text-success-emphasis",
    icon: "bi-check-circle-fill",
  },

  pending: {
    label: "Pending",
    className: "bg-warning-subtle text-warning-emphasis",
    icon: "bi-clock-fill",
  },

  suspended: {
    label: "Suspended",
    className: "bg-danger-subtle text-danger-emphasis",
    icon: "bi-pause-circle-fill",
  },

  expired: {
    label: "Expired",
    className: "bg-secondary-subtle text-secondary-emphasis",
    icon: "bi-calendar-x-fill",
  },

  rejected: {
    label: "Rejected",
    className: "bg-danger-subtle text-danger-emphasis",
    icon: "bi-x-circle-fill",
  },

  terminated: {
    label: "Terminated",
    className: "bg-dark-subtle text-dark-emphasis",
    icon: "bi-slash-circle-fill",
  },

  inactive: {
    label: "Inactive",
    className: "bg-secondary-subtle text-secondary-emphasis",
    icon: "bi-dash-circle-fill",
  },
};


function MemberStatusBadge({ status }) {
  const normalizedStatus =
    status?.toLowerCase() || "inactive";

  const config =
    STATUS_CONFIG[normalizedStatus] || {
      label: status || "Unknown",
      className:
        "bg-light text-dark border",
      icon: "bi-question-circle-fill",
    };


  return (
    <span
      className={`badge rounded-pill d-inline-flex align-items-center gap-1 px-3 py-2 ${config.className}`}
    >
      <i
        className={`bi ${config.icon}`}
        aria-hidden="true"
      />

      {config.label}
    </span>
  );
}


export default MemberStatusBadge;