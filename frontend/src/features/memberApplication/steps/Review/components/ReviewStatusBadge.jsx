import PropTypes from "prop-types";

import styles from "../Review.module.css";

/*
--------------------------------------------------
Review Status Badge
--------------------------------------------------

Displays a visual status badge for document
review and verification.

Responsibilities

• Render document status
• Apply status styling
• Remain completely presentational

--------------------------------------------------
*/

const STATUS_LABELS = {
  pending: "Pending",

  selected: "Selected",

  queued: "Queued",

  uploading: "Uploading",

  uploaded: "Uploaded",

  verified: "Verified",

  failed: "Failed",

  cancelled: "Cancelled",
};

function ReviewStatusBadge({
  status = "pending",
}) {
  const normalizedStatus =
    STATUS_LABELS[status]
      ? status
      : "pending";

  return (
    <span
      className={`${styles.reviewStatusBadge} ${styles[normalizedStatus]}`}
    >
      {STATUS_LABELS[normalizedStatus]}
    </span>
  );
}

ReviewStatusBadge.propTypes = {
  status: PropTypes.string,
};

export default ReviewStatusBadge;