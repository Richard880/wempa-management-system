import PropTypes from "prop-types";

import styles from "../Documents.module.css";

const STATUS_CONFIG = {
  pending: {
    label: "Pending Upload",
    className: styles.pending,
  },

  selected: {
    label: "Ready to Upload",
    className: styles.selected,
  },

  queued: {
    label: "Queued",
    className: styles.queued,
  },

  uploading: {
    label: "Uploading",
    className: styles.uploading,
  },

  uploaded: {
    label: "Uploaded",
    className: styles.uploaded,
  },

  reviewing: {
    label: "Pending Verification",
    className: styles.reviewing,
  },

  verified: {
    label: "Verified",
    className: styles.verified,
  },

  rejected: {
    label: "Rejected",
    className: styles.rejected,
  },

  failed: {
    label: "Upload Failed",
    className: styles.failed,
  },

  cancelled: {
    label: "Cancelled",
    className: styles.cancelled,
  },
};

function DocumentStatusBadge({
  status = "pending",
}) {
  const config =
    STATUS_CONFIG[status] ??
    STATUS_CONFIG.pending;

  return (
    <span
      className={`${styles.statusBadge} ${config.className}`}
    >
      {config.label}
    </span>
  );
}

DocumentStatusBadge.propTypes = {
  status: PropTypes.oneOf([
    "pending",
    "selected",
    "queued",
    "uploading",
    "uploaded",
    "reviewing",
    "verified",
    "rejected",
    "failed",
    "cancelled",
  ]),
};

export default DocumentStatusBadge;