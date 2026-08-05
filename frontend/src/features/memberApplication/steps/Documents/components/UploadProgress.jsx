import PropTypes from "prop-types";

import styles from "../documents.module.css";

function UploadProgress({
  progress = 0,
  uploading = false,
}) {
 const safeProgress = Math.max(
  0,
  Math.min(progress, 100)
);

const shouldRender =
  uploading || safeProgress > 0;

if (!shouldRender) {
  return null;
}

const label = uploading
  ? "Uploading..."
  : safeProgress === 100
    ? "Upload Complete"
    : "Ready";

  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressHeader}>
        <span className={styles.progressLabel}>
        {label}
        </span>

        <span className={styles.progressValue}>
          {safeProgress}%
        </span>
      </div>

      <div
        className={styles.progressTrack}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={safeProgress}
        aria-label="Upload Progress"
      >
        <div
          className={styles.progressFill}
          style={{
            width: `${safeProgress}%`,
          }}
        />
      </div>
    </div>
  );
}

UploadProgress.propTypes = {
  progress: PropTypes.number,
  uploading: PropTypes.bool,
};

export default UploadProgress;