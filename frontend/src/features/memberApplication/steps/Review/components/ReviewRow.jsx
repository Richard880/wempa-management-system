import PropTypes from "prop-types";

import formatReviewValue from "../utils/formatReviewValue";

import styles from "../Review.module.css";

/*
--------------------------------------------------
Review Row
--------------------------------------------------

Displays a single label/value pair within
an application review section.

Responsibilities

• Display one field
• Format values consistently
• Remain completely presentational

--------------------------------------------------
*/

function ReviewRow({
  label,
  value,
}) {
  return (
    <div className={styles.reviewRow}>
      <div className={styles.reviewLabel}>
        {label}
      </div>

      <div className={styles.reviewValue}>
        {formatReviewValue(value)}
      </div>
    </div>
  );
}

ReviewRow.propTypes = {
  label: PropTypes.string.isRequired,

  value: PropTypes.any,
};

export default ReviewRow;