import PropTypes from "prop-types";

import ReviewStatusBadge from "./ReviewStatusBadge";

import styles from "../Review.module.css";

/*
--------------------------------------------------
Review Documents
--------------------------------------------------

Displays uploaded application documents in
read-only mode during the Review step.

Responsibilities

• Render uploaded documents
• Display upload status
• Display verification status
• Never perform upload actions
• Never mutate state

Business logic belongs in
useApplicationReview().
--------------------------------------------------
*/

function ReviewDocuments({
  documents = [],
}) {
  if (documents.length === 0) {
    return (
      <div className={styles.emptyDocuments}>
        No supporting documents available.
      </div>
    );
  }

  return (
    <div className={styles.reviewDocuments}>
      {documents.map((document) => (
        <article
          key={document.id}
          className={styles.documentCard}
        >
          <div className={styles.documentInfo}>
            <h4 className={styles.documentTitle}>
              {document.title}
            </h4>

            <p className={styles.documentFileName}>
              {document.fileName ||
                "Not uploaded"}
            </p>

            {document.required && (
              <span
                className={styles.requiredLabel}
              >
                Required
              </span>
            )}
          </div>

          <div
            className={
              styles.documentStatus
            }
          >
            <ReviewStatusBadge
              status={
                document.verified
                  ? "verified"
                  : document.status
              }
            />
          </div>
        </article>
      ))}
    </div>
  );
}

ReviewDocuments.propTypes = {
  documents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,

      title:
        PropTypes.string.isRequired,

      fileName: PropTypes.string,

      status: PropTypes.string,

      verified: PropTypes.bool,

      required: PropTypes.bool,
    })
  ),
};

export default ReviewDocuments;