import { useEffect, useState } from "react";

import MEMBERSHIP_STATUS from "../../../../constants/membershipStatus";


const STATUS_OPTIONS = [
  {
    value: MEMBERSHIP_STATUS.PENDING,
    label: "Pending",
  },
  {
    value: MEMBERSHIP_STATUS.ACTIVE,
    label: "Active",
  },
  {
    value: MEMBERSHIP_STATUS.SUSPENDED,
    label: "Suspended",
  },
  {
    value: MEMBERSHIP_STATUS.EXPIRED,
    label: "Expired",
  },
  {
    value: MEMBERSHIP_STATUS.INACTIVE,
    label: "Inactive",
  },
  {
    value: MEMBERSHIP_STATUS.TERMINATED,
    label: "Terminated",
  },
];


function formatStatus(status) {
  if (!status) {
    return "Unknown";
  }

  return status
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) =>
      character.toUpperCase()
    );
}


function MembershipStatusModal({
  show,
  currentStatus,
  loading,
  onClose,
  onConfirm,
}) {
  const [selectedStatus, setSelectedStatus] =
    useState("");

  const [reason, setReason] = useState("");

  const [validationError, setValidationError] =
    useState(null);


  /* ==========================================
     Reset Modal State
     ========================================== */

  useEffect(() => {
    if (!show) {
      return;
    }

    setSelectedStatus("");
    setReason("");
    setValidationError(null);
  }, [show]);


  /* ==========================================
     Close Modal
     ========================================== */

  const handleClose = () => {
    if (loading) {
      return;
    }

    onClose?.();
  };


  /* ==========================================
     Submit Status Change
     ========================================== */

  const handleSubmit = async (event) => {
    event.preventDefault();

    const normalizedReason = reason.trim();

    if (!selectedStatus) {
      setValidationError(
        "Please select the new membership status."
      );

      return;
    }

    if (selectedStatus === currentStatus) {
      setValidationError(
        "Please select a status different from the current status."
      );

      return;
    }

    if (!normalizedReason) {
      setValidationError(
        "Please provide a reason for this membership status change."
      );

      return;
    }

    setValidationError(null);

    try {
      await onConfirm?.(
        selectedStatus,
        normalizedReason
      );
    } catch {
      /*
       * The parent hook handles service errors.
       * Keep the modal open so the admin can
       * correct or retry the action.
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
      <div
        className="modal fade show"
        role="dialog"
        aria-modal="true"
        aria-labelledby="membership-status-modal-title"
        style={{
          display: "block",
        }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-header">
              <div>
                <h2
                  id="membership-status-modal-title"
                  className="modal-title h5 fw-bold"
                >
                  Change Membership Status
                </h2>

                <p className="text-muted small mb-0 mt-1">
                  Record the new membership status and the
                  reason for this administrative action.
                </p>
              </div>

              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleClose}
                disabled={loading}
              />
            </div>


            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                {/* Current Status */}

                <div className="mb-4">
                  <label className="form-label small fw-semibold text-uppercase text-muted">
                    Current Status
                  </label>

                  <div className="form-control bg-light">
                    {formatStatus(currentStatus)}
                  </div>
                </div>


                {/* New Status */}

                <div className="mb-4">
                  <label
                    htmlFor="membership-status"
                    className="form-label fw-semibold"
                  >
                    New Membership Status
                  </label>

                  <select
                    id="membership-status"
                    className="form-select"
                    value={selectedStatus}
                    onChange={(event) => {
                      setSelectedStatus(
                        event.target.value
                      );

                      setValidationError(null);
                    }}
                    disabled={loading}
                  >
                    <option value="">
                      Select new status
                    </option>

                    {STATUS_OPTIONS.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        disabled={
                          option.value === currentStatus
                        }
                      >
                        {option.label}
                        {option.value === currentStatus
                          ? " (Current)"
                          : ""}
                      </option>
                    ))}
                  </select>
                </div>


                {/* Reason */}

                <div className="mb-0">
                  <label
                    htmlFor="membership-status-reason"
                    className="form-label fw-semibold"
                  >
                    Reason for Change
                  </label>

                  <textarea
                    id="membership-status-reason"
                    className="form-control"
                    rows="4"
                    value={reason}
                    onChange={(event) => {
                      setReason(event.target.value);

                      setValidationError(null);
                    }}
                    placeholder="Explain why this membership status is being changed..."
                    disabled={loading}
                  />

                  <div className="form-text">
                    This reason will be stored in the
                    membership audit record.
                  </div>
                </div>


                {/* Validation Error */}

                {validationError && (
                  <div
                    className="alert alert-danger mt-3 mb-0"
                    role="alert"
                  >
                    <i
                      className="bi bi-exclamation-circle me-2"
                      aria-hidden="true"
                    />

                    {validationError}
                  </div>
                )}
              </div>


              {/* Actions */}

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
                  className="btn btn-primary"
                  disabled={
                    loading ||
                    !selectedStatus ||
                    !reason.trim()
                  }
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        aria-hidden="true"
                      />

                      Processing...
                    </>
                  ) : (
                    <>
                      <i
                        className="bi bi-check-circle me-2"
                        aria-hidden="true"
                      />

                      Confirm Change
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>


      {/* Bootstrap Modal Backdrop */}

      <div
        className="modal-backdrop fade show"
        onClick={handleClose}
        aria-hidden="true"
      />
    </>
  );
}


export default MembershipStatusModal;