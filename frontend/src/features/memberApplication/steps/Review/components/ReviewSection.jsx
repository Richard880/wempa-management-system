import PropTypes from "prop-types";

import ReviewRow from "./ReviewRow";
import EditSectionButton from "./EditSectionButton";

import styles from "../Review.module.css";

/*
--------------------------------------------------
Review Section
--------------------------------------------------

Displays a single application section during
the review step.

Responsibilities

• Render section heading
• Render optional description
• Render review rows
• Render optional edit action

Business logic belongs in useApplicationReview().
--------------------------------------------------
*/

function ReviewSection({
  title,
  description,
  rows,
  editable = true,
  onEdit,
}) {
  return (
    <section className={styles.reviewSection}>
      <header className={styles.sectionHeader}>
        <div>
          <h3 className={styles.sectionTitle}>
            {title}
          </h3>

          {description && (
            <p className={styles.sectionDescription}>
              {description}
            </p>
          )}
        </div>

        {editable && onEdit && (
          <EditSectionButton
            onClick={onEdit}
          />
        )}
      </header>

      <div className={styles.sectionBody}>
        {rows.map((row) => (
          <ReviewRow
            key={row.key}
            label={row.label}
            value={row.value}
          />
        ))}
      </div>
    </section>
  );
}

ReviewSection.propTypes = {
  title: PropTypes.string.isRequired,

  description: PropTypes.string,

  rows: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.any,
    })
  ).isRequired,

  editable: PropTypes.bool,

  onEdit: PropTypes.func,
};

export default ReviewSection;