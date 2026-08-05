import PropTypes from "prop-types";

import styles from "../documents.module.css";

function DocumentPreview({
  previewUrl = "",

  fileName = "",

  mimeType = "",
}) {
  /*
  ----------------------------------------
  No Preview Available
  ----------------------------------------
  */

  if (!previewUrl) {
    return (
      <div className={styles.previewPlaceholder}>
        <span className={styles.previewIcon}>
          📄
        </span>

        <p>No document uploaded</p>
      </div>
    );
  }

  /*
  ----------------------------------------
  Image Preview
  ----------------------------------------
  */

  if (mimeType.startsWith("image/")) {
    return (
      <div className={styles.previewContainer}>
        <img
          src={previewUrl}
          alt={fileName || "Document Preview"}
          className={styles.previewImage}
        />
      </div>
    );
  }

  /*
  ----------------------------------------
  PDF Preview
  ----------------------------------------
  */

  if (mimeType === "application/pdf") {
    return (
      <div className={styles.previewContainer}>
        <iframe
          src={previewUrl}
          title={fileName || "PDF Preview"}
          className={styles.previewPdf}
        />
      </div>
    );
  }

  /*
  ----------------------------------------
  Unsupported Preview
  ----------------------------------------
  */

  return (
    <div className={styles.previewPlaceholder}>
      <span className={styles.previewIcon}>
        📎
      </span>

      <p>
        {fileName || "Uploaded Document"}
      </p>

      <small>
        Preview unavailable
      </small>
    </div>
  );
}

DocumentPreview.propTypes = {
  previewUrl: PropTypes.string,

  fileName: PropTypes.string,

  mimeType: PropTypes.string,
};

export default DocumentPreview;