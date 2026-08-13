import { useState } from "react";

import RejectionModal from "./RejectionModal";


function ApplicationReviewActions({
  status,
  loading,
  error,
  onApprove,
  onReject,
}) {
  const [showRejectionModal, setShowRejectionModal] =
    useState(false);

  const canReview = status === "submitted";


  /* ==========================================
     Approve
     ========================================== */

  const handleApprove = () => {
    if (loading) return;

    onApprove?.();
  };


  /* ==========================================
     Open Rejection Modal
     ========================================== */

  const handleOpenRejectionModal = () => {
    if (loading) return;

    setShowRejectionModal(true);
  };


  /* ==========================================
     Close Rejection Modal
     ========================================== */

  const handleCloseRejectionModal = () => {
    if (loading) return;

    setShowRejectionModal(false);
  };


  /* ==========================================
     Confirm Rejection
     ========================================== */

  const handleConfirmRejection = async (
    rejectionReason
  ) => {
    try {
      await onReject?.(rejectionReason);

      /*
       * Only close after the rejection succeeds.
       * If it fails, the modal remains open and
       * displays the error.
       */
      setShowRejectionModal(false);
    } catch {
      /*
       * The hook/page owns the Firestore error.
       * RejectionModal receives it through props.
       */
    }
  };


  if (!canReview) {
    return (
      <div className="alert alert-light border mb-0">
        <i
          className="bi bi-info-circle me-2"
          aria-hidden="true"
        />

        This application has already been processed and
        cannot be reviewed again.
      </div>
    );
  }


  return (
    <>
      {/* ==========================================
          APPLICATION DECISION
          ========================================== */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div>
              <h2 className="h5 fw-bold mb-1">
                Application Decision
              </h2>

              <p className="text-muted mb-0">
                Approve or reject this membership application
                after completing your review.
              </p>
            </div>


            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={handleOpenRejectionModal}
                disabled={loading}
              >
                <i
                  className="bi bi-x-circle me-2"
                  aria-hidden="true"
                />

                Reject
              </button>


              <button
                type="button"
                className="btn btn-success"
                onClick={handleApprove}
                disabled={loading}
              >
                <i
                  className="bi bi-check-circle me-2"
                  aria-hidden="true"
                />

                {loading
                  ? "Processing..."
                  : "Approve Application"}
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* ==========================================
          REJECTION MODAL
          ========================================== */}
      <RejectionModal
        show={showRejectionModal}
        loading={loading}
        error={error}
        onClose={handleCloseRejectionModal}
        onConfirm={handleConfirmRejection}
      />
    </>
  );
}


export default ApplicationReviewActions;