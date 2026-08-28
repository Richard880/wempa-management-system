import { useRef } from "react";
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

  const handleChoosePoster = () => {
    if (disabled || uploading) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      selectAndUploadPoster(file);
    } catch (uploadError) {
      console.error("Unable to select event poster:", uploadError);
    } finally {
      event.target.value = "";
    }
  };

  const handleRemovePoster = async () => {
    if (disabled || uploading) return;
    try {
      await removePoster();
    } catch (removeError) {
      console.error("Unable to remove event poster:", removeError);
    }
  };

  const isDisabled = disabled || uploading;

  return (
    <div className={styles.posterUpload}>
      {/* HEADER SECTION */}
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <h5 className="text-white fw-bold mb-1">Cover Image / Poster</h5>
          <p className="text-white-50 small mb-0"> Recommended: 1200x600px (JPG, PNG or WebP)</p>
        </div>

        {hasPoster && (
          <button
            type="button"
            className="btn btn-sm btn-outline-danger fw-bold px-3"
            onClick={handleRemovePoster}
            disabled={isDisabled}
          >
            <i className="bi bi-trash3 me-1" /> Remove
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="d-none"
        disabled={isDisabled}
      />

      {/* UPLOAD AREA / DROPZONE STYLE */}
      {!hasPoster ? (
        <button
          type="button"
          className={`${styles.uploadArea} btn w-100 border-dashed py-5 d-flex flex-column align-items-center justify-content-center`}
          onClick={handleChoosePoster}
          disabled={isDisabled}
        >
          <i className="bi bi-cloud-arrow-up display-4 text-primary mb-2" />
          <span className="fw-bold text-white">Click to upload poster</span>
          <span className="text-white-50 small">Maximum file size: 5MB</span>
        </button>
      ) : (
        <div className={`${styles.previewContainer} card bg-black bg-opacity-50 border-secondary overflow-hidden`}>
          <div className="row g-0 align-items-center">
            <div className="col-md-4 position-relative">
              <img
                src={poster.previewUrl || poster.downloadURL}
                alt="Event preview"
                className={styles.posterPreview}
                style={{ width: '100%', height: '160px', objectFit: 'cover' }}
              />
              {uploading && (
                <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-75">
                   <div className="spinner-border text-primary" role="status" />
                </div>
              )}
            </div>
            
            <div className="col-md-8 p-3">
              <div className="d-flex flex-column h-100">
                <div className="mb-2">
                  <div className="text-white fw-semibold text-truncate small">{poster.fileName || "Event_Poster.jpg"}</div>
                  {poster.fileSize > 0 && (
                    <div className="text-white-50 x-small">
                      {(poster.fileSize / 1024 / 1024).toFixed(2)} MB
                    </div>
                  )}
                </div>

                {/* PROGRESS BAR */}
                {(poster.status === "queued" || uploading) && (
                  <div className="mb-3">
                    <div className="d-flex justify-content-between x-small text-primary mb-1">
                       <span>{poster.status === "queued" ? "Waiting..." : "Uploading"}</span>
                       <span>{uploadProgress}%</span>
                    </div>
                    <div className="progress" style={{ height: '6px' }}>
                      <div
                        className="progress-bar progress-bar-striped progress-bar-animated"
                        role="progressbar"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* STATUS BADGES */}
                <div className="mt-auto d-flex align-items-center gap-2">
                  {poster.status === "uploaded" && (
                    <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 py-2 px-3">
                      <i className="bi bi-check-circle-fill me-1" /> Finalized
                    </span>
                  )}

                  {!uploading && (
                    <button
                      type="button"
                      className="btn btn-sm btn-link text-primary text-decoration-none p-0"
                      onClick={handleChoosePoster}
                    >
                      Change Image
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ERROR FEEDBACK */}
      {error && (
        <div className="alert alert-danger mt-3 py-2 small d-flex align-items-center">
          <i className="bi bi-exclamation-triangle-fill me-2" />
          {error}
        </div>
      )}
    </div>
  );
}

export default EventPosterUpload;
