import { useRef } from "react";

import Button from "../../../../components/ui/Button";

import useEventPosterUpload from "../../hooks/useEventPosterUpload";

import styles from "./EventPosterUpload.module.css";

function EventPosterUpload({
  eventId,
  value = null,
  onChange,
  disabled = false,
}) {
  const fileInputRef = useRef(null);

  const {
    poster,
    selectAndUploadPoster,
    removePoster,
    uploading,
    uploadProgress,
    error,
    hasPoster,
  } = useEventPosterUpload({
    eventId,
    value,
    onChange,
  });

  /* ==========================================
     Open File Picker
     ========================================== */

  const handleChoosePoster = () => {
    if (disabled || uploading) {
      return;
    }

    fileInputRef.current?.click();
  };

  /* ==========================================
     Handle File Selection
     ========================================== */

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      /*
       * Select the poster, create a local preview,
       * and immediately queue the Firebase upload.
       */
      selectAndUploadPoster(file);
    } catch (uploadError) {
      console.error(
        "Unable to select event poster:",
        uploadError
      );
    } finally {
      /*
       * Allow the same file to be selected again.
       */
      event.target.value = "";
    }
  };

  /* ==========================================
     Remove Poster
     ========================================== */

  const handleRemovePoster = async () => {
    if (disabled || uploading) {
      return;
    }

    try {
      await removePoster();
    } catch (removeError) {
      console.error(
        "Unable to remove event poster:",
        removeError
      );
    }
  };

  const isDisabled =
    disabled || uploading;

  return (
    <section className={styles.posterUpload}>
      {/* ==========================================
          HEADER
          ========================================== */}

      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>
            Event Poster
          </h3>

          <p className={styles.description}>
            Upload an image to represent this event.
          </p>
        </div>

       {(poster?.previewUrl || poster?.downloadURL || poster?.file) && (
  <Button
    type="button"
    variant="outline-danger"
    onClick={handleRemovePoster}
    disabled={isDisabled}
  >
    Remove
  </Button>
)}
      </div>

      {/* ==========================================
          HIDDEN FILE INPUT
          ========================================== */}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className={styles.fileInput}
        disabled={isDisabled}
      />

      {/* ==========================================
          EMPTY STATE
          ========================================== */}

      {!hasPoster && (
        <button
          type="button"
          className={styles.uploadArea}
          onClick={handleChoosePoster}
          disabled={isDisabled}
        >
          <i
            className="bi bi-image"
            aria-hidden="true"
          />

          <span className={styles.uploadTitle}>
            Choose Poster Image
          </span>

          <span className={styles.uploadText}>
            JPEG, PNG or WebP image
          </span>
        </button>
      )}

      {/* ==========================================
          POSTER PREVIEW
          ========================================== */}

      {hasPoster && (
        <div className={styles.previewContainer}>
          <img
            src={
              poster.previewUrl ||
              poster.downloadURL
            }
            alt="Event poster preview"
            className={styles.posterPreview}
          />

          <div className={styles.posterDetails}>
            <div className={styles.posterName}>
              {poster.fileName ||
                "Event poster"}
            </div>

            {poster.fileSize > 0 && (
              <div className={styles.posterMeta}>
                {(poster.fileSize / 1024 / 1024).toFixed(2)} MB
              </div>
            )}

            {/* ==========================================
                UPLOAD PROGRESS
                ========================================== */}

            {(poster.status === "queued" ||
              uploading) && (
              <div
                className={styles.progressWrapper}
                aria-label={`Upload progress ${uploadProgress}%`}
              >
                <div
                  className="progress"
                  role="progressbar"
                  aria-valuenow={uploadProgress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div
                    className="progress-bar"
                    style={{
                      width: `${uploadProgress}%`,
                    }}
                  >
                    {poster.status === "queued"
                      ? "Preparing upload..."
                      : `${uploadProgress}%`}
                  </div>
                </div>
              </div>
            )}

            {/* ==========================================
                UPLOAD SUCCESS
                ========================================== */}

            {poster.status === "uploaded" && (
              <div
                className={styles.uploadSuccess}
              >
                <i
                  className="bi bi-check-circle-fill"
                  aria-hidden="true"
                />

                Poster uploaded successfully
              </div>
            )}

            {/* ==========================================
                UPLOAD FAILED
                ========================================== */}

            {poster.status === "failed" && (
              <div
                className={styles.uploadFailed}
                role="alert"
              >
                Upload failed. Please choose the
                poster again and retry.
              </div>
            )}

            {/* ==========================================
                REPLACE POSTER
                ========================================== */}

            {!uploading &&
              poster.status !== "queued" && (
                <Button
                  type="button"
                  variant="outline-primary"
                  onClick={handleChoosePoster}
                  disabled={isDisabled}
                >
                  Replace Poster
                </Button>
              )}
          </div>
        </div>
      )}

      {/* ==========================================
          ERROR
          ========================================== */}

      {error && (
        <div
          className={styles.error}
          role="alert"
        >
          {error}
        </div>
      )}
    </section>
  );
}

export default EventPosterUpload;