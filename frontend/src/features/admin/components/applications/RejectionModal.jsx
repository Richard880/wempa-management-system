import { useEffect, useState } from "react";


function RejectionModal({
  show,
  loading = false,
  error = null,
  onClose,
  onConfirm,
}) {
  const [reason, setReason] = useState("");
  const [validationError, setValidationError] =
    useState(null);


  /* ==========================================
     Reset State When Modal Opens
     ========================================== */

  useEffect(() => {
    if (show) {
      setReason("");
      setValidationError(null);
    }
  }, [show]);


  /* ==========================================
     Close
     ========================================== */

  const handleClose = () => {
    if (loading) return;

    setReason("");
    setValidationError(null);

    onClose?.();
  };


  /* ==========================================
     Submit Rejection
     ========================================== */

  const handleSubmit = async (event) => {
    event.preventDefault();

    const normalizedReason = reason.trim();

    if (!normalizedReason) {
      setValidationError(
        "Please provide a reason for rejecting this application."
      );

      return;
    }

    setValidationError(null);

    try {
      await onConfirm?.(normalizedReason);

      /*
       * The parent controls whether the modal
       * remains open. We do not automatically
       * close it here because a failed request
       * should leave the reason visible.
       */
    } catch {
      /*
       * Errors are handled by the parent/hook
       * and displayed through the error prop.
       */
    }
  };


  /* ==========================================
     Do Not Render When Closed
     ========================================== */

  if (!show) {
    return null;
  }


  return (
    <>
      {/* Backdrop */}
      <div
        className="modal-backdrop fade show"
        aria-hidden="true"
      />


      {/* Modal */}
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rejection-modal-title"
      >
        <div
          className="modal-dialog modal-dialog-centered"
          role="document"
        >
          <div className="modal-content border-0 shadow">
            {/* Header */}
            <div className="modal-header">
              <div>
                <h2
                  id="rejection-modal-title"
                  className="modal-title h5 fw-bold mb-1"
                >
                  Reject Application
                </h2>

                <p className="text-muted small mb-0">
                  Provide a clear reason for rejecting this
                  membership application.
                </p>
              </div>

              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
                disabled={loading}
                aria-label="Close"
              />
            </div>


            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                {(validationError || error) && (
                  <div
                    className="alert alert-danger"
                    role="alert"
                  >
                    <i
                      className="bi bi-exclamation-circle me-2"
                      aria-hidden="true"
                    />

                    {validationError || error}
                  </div>
                )}


                <label
                  htmlFor="rejection-reason"
                  className="form-label fw-semibold"
                >
                  Rejection Reason
                </label>

                <textarea
                  id="rejection-reason"
                  className="form-control"
                  rows="5"
                  value={reason}
                  onChange={(event) => {
                    setReason(event.target.value);

                    if (validationError) {
                      setValidationError(null);
                    }
                  }}
                  disabled={loading}
                  placeholder="Explain clearly why this application is being rejected..."
                />

                <div className="form-text">
                  This reason will be stored as part of the
                  application review record.
                </div>
              </div>


              {/* Footer */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleClose}
                  disabled={loading}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-danger"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        aria-hidden="true"
                      />

                      Rejecting...
                    </>
                  ) : (
                    <>
                      <i
                        className="bi bi-x-circle me-2"
                        aria-hidden="true"
                      />

                      Reject Application
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}


export default RejectionModal;