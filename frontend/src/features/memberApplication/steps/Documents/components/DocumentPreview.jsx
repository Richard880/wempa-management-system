
import PropTypes from "prop-types";
import styles from "../Documents.module.css"; // Ensure path resolution matches layout

export default function DocumentPreview({ file, previewUrl, downloadURL, fileName }) {
  /*
  ----------------------------------------
  Determine Display Resource
  ----------------------------------------
  Prioritize the production cloud downloadURL string first. If it's a new upload,
  fall back immediately to the temporary local previewUrl blob path.
  */
  const displayUrl = downloadURL || previewUrl;
  const currentName = fileName || file?.name || "";
  
  // Clean format inspection
  const isPdf = currentName.toLowerCase().endsWith(".pdf") || file?.type === "application/pdf";
  const hasAsset = Boolean(displayUrl);

  if (!hasAsset) {
    // Return empty placeholder container if no file is chosen yet
    return (
      <div className={styles.previewEmptyPlaceholder}>
        <span className={styles.placeholderIcon}>📤</span>
        <p className={styles.placeholderText}>No file chosen yet</p>
      </div>
    );
  }

  if (isPdf) {
    return (
      <div className={`${styles.previewDisplayContainer} ${styles.pdfBg}`}>
        <span className={styles.docLargeIcon}>📕</span>
        <p className={styles.docMetaName} noble={currentName}>{currentName || "PDF Document"}</p>
      </div>
    );
  }

  // Fallback case: Render standard image layout (Passport photos, JPEGs, PNGs)
  return (
    <div className={styles.previewDisplayContainer}>
      <img 
        src={displayUrl} 
        alt={currentName || "Uploaded asset thumbnail"} 
        className={styles.previewImageElement}
        onError={(e) => {
          // If a blob URL expires, prevent a broken image icon from displaying
          e.target.style.display = "none";
        }}
      />
    </div>
  );
}

DocumentPreview.propTypes = {
  file: PropTypes.any,
  previewUrl: PropTypes.string,
  downloadURL: PropTypes.string,
  fileName: PropTypes.string,
};
