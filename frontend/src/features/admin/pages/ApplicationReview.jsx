// src/features/admin/pages/ApplicationReview/ApplicationReview.jsx
import { useParams } from "react-router-dom";
import useAdminApplicationReview from "../hooks/useAdminApplicationReview";
import ApplicationReviewHeader from "../components/applications/ApplicationReviewHeader";
import ApplicationReviewSection from "../components/applications/ApplicationReviewSection";
import ApplicationReviewActions from "../components/applications/ApplicationReviewActions";

function ReviewField({ label, value }) {
  return (
    <div className="col-md-6 mb-3">
      <p className="text-muted small fw-semibold text-uppercase mb-1" style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}>
        {label}
      </p>
      <p className="mb-0 text-dark fw-medium" style={{ fontSize: "0.9375rem" }}>
        {value || "—"}
      </p>
    </div>
  );
}

function formatTimestamp(timestamp) {
  if (!timestamp) return "—";
  if (typeof timestamp?.toDate === "function") {
    return timestamp.toDate().toLocaleString("en-KE");
  }
  const date = new Date(timestamp);
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleString("en-KE");
}

export  function ApplicationReview() {
  const { applicationId } = useParams();

  const {
    application,
    loading,
    actionLoading,
    error,
    approveApplication,
    rejectApplication,
  } = useAdminApplicationReview(applicationId);

  const handleApprove = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to approve this membership application?"
    );
    if (confirmed) {
      try {
        await approveApplication();
      } catch (err) {
        console.error("Application approval transaction failed:", err);
      }
    }
  };

  const handleReject = async (reason) => {
    try {
      await rejectApplication(reason);
    } catch (err) {
      console.error("Application rejection transaction failed:", err);
      throw err;
    }
  };

  if (loading) {
    return (
      <div className="card border-0 shadow-sm">
        <div className="card-body p-5 text-center">
          <div className="spinner-border text-info mb-3" role="status" style={{ width: "2.5rem", height: "2.5rem" }} />
          <p className="text-muted small mb-0 font-monospace">COMPILING APPLICANT INVENTORY DATA TREE...</p>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="alert alert-warning mb-0 border-0 shadow-sm d-flex align-items-center gap-2">
        <i className="bi bi-exclamation-triangle-fill fs-5" aria-hidden="true" />
        <span>Application registry file not discovered or has expired.</span>
      </div>
    );
  }

  // Isolate dynamic data nodes seamlessly from the master document snapshot payload
  const personal = application.personal || {};
  const contact = application.contact || {};
  const employment = application.employment || {};
  const documents = application.documents || {};
  const payment = application.payment || {};
  const review = application.review || {};

  return (
    <section className="admin-review- runway">
      {/* REVIEW HEADER ACTIONS ROW */}
      <ApplicationReviewHeader application={application} />

      {error && (
        <div className="alert alert-danger border-0 shadow-sm my-3 d-flex align-items-center gap-2" role="alert">
          <i className="bi bi-x-circle-fill" />
          <span>{error}</span>
        </div>
      )}

      <div className="my-4">
        <ApplicationReviewActions
          status={application.applicationStatus}
          loading={actionLoading}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>

      {/* 💎 1. PERSONAL DETAILS BLOCK */}
      <ApplicationReviewSection title="Personal Information" icon="bi-person-vcard">
        <div className="row">
          <ReviewField label="Assigned Membership ID" value={personal.membershipNumber} />
          <ReviewField label="First Name" value={personal.firstName} />
          <ReviewField label="Middle Name" value={personal.middleName} />
          <ReviewField label="Last Name" value={personal.lastName} />
          <ReviewField label="Gender" value={personal.gender} />
          <ReviewField label="Date of Birth" value={personal.dateOfBirth} />
          <ReviewField label="Nationality" value={personal.nationality} />
          <ReviewField label="National ID / Passport" value={personal.idNumber} />
        </div>
      </ApplicationReviewSection>

      {/* 💎 2. CONTACT DETAILS BLOCK */}
      <ApplicationReviewSection title="Contact Information" icon="bi-telephone-outbound">
        <div className="row">
          <ReviewField label="Email Address" value={contact.email} />
          <ReviewField label="Primary Contact Number" value={contact.phoneNumber} />
          <ReviewField label="Alternative Number" value={contact.alternativePhoneNumber} />
          <ReviewField label="Physical Base Location" value={contact.physicalAddress} />
        </div>
      </ApplicationReviewSection>

      {/* 💎 3. EMPLOYMENT DETAILS BLOCK */}
      <ApplicationReviewSection title="Employment & Professional Record" icon="bi-briefcase-fill">
        <div className="row">
          <ReviewField label="Active Employment Status" value={employment.employmentStatus} />
          <ReviewField label="Employer / Corporate Institution" value={employment.employerName} />
          <ReviewField label="Organization Type" value={employment.organizationType} />
          <ReviewField label="Professional Job Title" value={employment.jobTitle} />
          <ReviewField label="Study Field / Department" value={employment.department} />
          {/* 🟢 FIXED PROPERTY KEY: Casing aligned exactly to our operational config array mapping */}
          <ReviewField label="Area of Specialization" value={employment.Specialization} />
          {/* 🟢 FIXED PROPERTY KEY: Handled the exact custom space-cased string key token */}
          <ReviewField label="Years of Maritime Experience" value={employment["Years Of Maritime Experience"]} />
        </div>
      </ApplicationReviewSection>

      {/* 💎 4. PAYMENT RECORD BLOCK */}
      <ApplicationReviewSection title="Financial Settlement Status" icon="bi-credit-card-2-front-fill">
        <div className="row">
          <ReviewField label="M-Pesa Transaction Receipt" value={payment.mpesaReceipt} />
          <ReviewField label="Selected Membership Category" value={payment.membershipCategory} />
          <ReviewField label="Amount Disbursed (KES)" value={payment.amountCharged?.toLocaleString()} />
          <ReviewField label="Gateway Clearing Status" value={payment.paymentStatus} />
          <ReviewField label="Checkout Completed At" value={formatTimestamp(payment.submittedAt)} />
        </div>
      </ApplicationReviewSection>

          {/* ==========================================================
          💎 5. COMPLIANCE DIGITAL DOCUMENTS CARDS (DEEP PATH SYNCED)
          ========================================================== */}
      <ApplicationReviewSection title="Supporting Compliance Documents" icon="bi-file-earmark-pdf-fill">
        {(() => {
          // 🟢 DOUBLE NESTED MAP RESOLUTION BRIDGE:
          // Drills safely past the double map wrapper block context to isolate your true file cards array
          const rawDocContainer = application.documents || {};
          const verifiedDocumentsTree = rawDocContainer.documents && typeof rawDocContainer.documents === 'object'
            ? rawDocContainer.documents 
            : rawDocContainer;

          // Strip any administrative primitive strings or state trackers that slip into the document tree
          const cleanDocumentEntries = Object.entries(verifiedDocumentsTree).filter(
            ([_, value]) => typeof value === "object" && value !== null
          );

          if (cleanDocumentEntries.length === 0) {
            return (
              <div className="p-4 border rounded-3 text-center bg-light" style={{ borderStyle: "dashed !important" }}>
                <i className="bi bi-folder-x fs-2 text-muted mb-2 d-block" />
                <p className="text-muted small mb-0 font-monospace">✕ No digital certificates or passport photos discovered inside this applicant's registry folder.</p>
              </div>
            );
          }

          return (
            <div className="row g-3">
              {cleanDocumentEntries.map(([documentKey, documentData]) => {
                // Formatting camelCase database tokens (e.g. academicCertificate -> Academic Certificate)
                const cleanTitle = documentKey
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())
                  .trim();

                // Prioritize the download link from the nested document snapshot properties
                const fileAssetUrl = documentData.downloadURL || documentData.downloadUrl || null;
                const fileAttachmentName = documentData.fileName || "Attached_Asset_Certificate.pdf";
                const activeStatus = documentData.status || "uploaded";

                return (
                  <div key={documentKey} className="col-xl-4 col-md-6">
                    <div 
                      className="p-3 border rounded-3 bg-white d-flex flex-column h-100 justify-content-between shadow-sm" 
                      style={{ borderColor: "#e2e8f0", minHeight: "150px" }}
                    >
                      <div>
                        <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                          <h6 className="fw-bold mb-0 text-dark" style={{ fontSize: "0.875rem", lineHeight: "1.4" }}>
                            {cleanTitle}
                          </h6>
                          <span 
                            className={`badge text-capitalize small px-2 py-1 ${
                              activeStatus.toLowerCase() === 'uploaded' ? 'bg-success-subtle text-success border border-success-subtle' : 'bg-secondary-subtle text-secondary'
                            }`}
                            style={{ fontSize: '0.7rem' }}
                          >
                            {activeStatus}
                          </span>
                        </div>
                        
                        <p 
                          className="text-muted font-monospace text-truncate mb-3" 
                          title={fileAttachmentName} 
                          style={{ fontSize: "0.75rem", maxWidth: "100%" }}
                        >
                          <i className="bi bi-paperclip me-1" />
                          {fileAttachmentName}
                        </p>
                      </div>

                      {fileAssetUrl ? (
                        <a
                          href={fileAssetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-primary d-inline-flex align-items-center justify-content-center gap-2 fw-bold text-white w-100"
                          style={{ borderRadius: "8px", padding: "0.5rem", fontSize: "0.8rem" }}
                        >
                          <i className="bi bi-eye-fill" /> View Document File
                        </a>
                      ) : (
                        <div className="alert alert-danger py-1.5 px-3 mb-0 text-center small fw-semibold w-100" style={{ fontSize: "0.75rem", borderRadius: "8px" }}>
                          ✕ Asset Attachment Missing
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })()}
      </ApplicationReviewSection>

      {/* ==========================================
    ADMIN REVIEW AUDIT
    ========================================== */}
{application.applicationStatus !== "submitted" && (
  <ApplicationReviewSection
    title="Review Audit Information"
    icon="bi-shield-check"
  >
    <div className="row">
      <ReviewField
        label="Decision"
        value={review.status}
      />

      <ReviewField
        label="Reviewed By"
        value={
          review.reviewedByName ||
          review.reviewedByEmail ||
          review.reviewedBy ||
          "—"
        }
      />

      <ReviewField
        label="Reviewer Email"
        value={review.reviewedByEmail}
      />

      <ReviewField
        label="Reviewed At"
        value={formatTimestamp(review.reviewedAt)}
      />

      {application.applicationStatus === "approved" && (
        <ReviewField
          label="Approved At"
          value={formatTimestamp(
            application.approvedAt
          )}
        />
      )}

      {application.applicationStatus === "rejected" && (
        <>
          <ReviewField
            label="Rejected At"
            value={formatTimestamp(
              application.rejectedAt
            )}
          />

          <div className="col-12 mb-3">
            <p className="text-muted small fw-semibold text-uppercase mb-1">
              Rejection Reason
            </p>

            <p className="mb-0">
              {review.rejectionReason || "—"}
            </p>
          </div>
        </>
      )}
    </div>
  </ApplicationReviewSection>
)}
    </section>
  );
}


export default ApplicationReview;