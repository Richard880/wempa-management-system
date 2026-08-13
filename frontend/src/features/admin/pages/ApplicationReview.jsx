import { useParams } from "react-router-dom";

import useAdminApplicationReview from "../hooks/useAdminApplicationReview";

import ApplicationReviewHeader from "../components/applications/ApplicationReviewHeader";
import ApplicationReviewSection from "../components/applications/ApplicationReviewSection";
import ApplicationReviewActions from "../components/applications/ApplicationReviewActions";


function ReviewField({ label, value }) {
  return (
    <div className="col-md-6 mb-3">
      <p className="text-muted small fw-semibold text-uppercase mb-1">
        {label}
      </p>

      <p className="mb-0">
        {value || "—"}
      </p>
    </div>
  );
}


function formatTimestamp(timestamp) {
  if (!timestamp) {
    return "—";
  }

  if (typeof timestamp?.toDate === "function") {
    return timestamp
      .toDate()
      .toLocaleString();
  }

  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleString();
}


function ApplicationReview() {
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
      "Are you sure you want to approve this application?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await approveApplication();
    } catch (error) {
      console.error(
        "Application approval failed:",
        error
      );
    }
  };


  const handleReject = async (reason) => {
    try {
      await rejectApplication(reason);
    } catch (error) {
      console.error(
        "Application rejection failed:",
        error
      );

      throw error;
    }
  };


  if (loading) {
    return (
      <div className="card border-0 shadow-sm">
        <div className="card-body p-5 text-center">
          <div
            className="spinner-border text-primary mb-3"
            role="status"
          >
            <span className="visually-hidden">
              Loading application...
            </span>
          </div>

          <p className="text-muted mb-0">
            Loading application details...
          </p>
        </div>
      </div>
    );
  }


  if (!application) {
    return (
      <div className="alert alert-warning mb-0">
        <i
          className="bi bi-exclamation-triangle me-2"
          aria-hidden="true"
        />

        Application not found.
      </div>
    );
  }


  const {
    personal = {},
    contact = {},
    employment = {},
    maritime = {},
    emergencyContact = {},
    nextOfKin = {},
    documents = {},
  } = application;

  const review = application.review || {};

  return (
    <section>
      {/* ==========================================
          REVIEW HEADER
          ========================================== */}
      <ApplicationReviewHeader
        application={application}
      />


      {/* ==========================================
          ERROR STATE
          ========================================== */}
      {error && (
        <div
          className="alert alert-danger"
          role="alert"
        >
          {error}
        </div>
      )}


      {/* ==========================================
          REVIEW ACTIONS
          ========================================== */}
      <div className="mb-4">
        <ApplicationReviewActions
          status={application.applicationStatus}
          loading={actionLoading}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>


      {/* ==========================================
          PERSONAL INFORMATION
          ========================================== */}
      <ApplicationReviewSection
        title="Personal Information"
        icon="bi-person"
      >
        <div className="row">
          <ReviewField
            label="First Name"
            value={personal.firstName}
          />

          <ReviewField
            label="Middle Name"
            value={personal.middleName}
          />

          <ReviewField
            label="Last Name"
            value={personal.lastName}
          />

          <ReviewField
            label="Gender"
            value={personal.gender}
          />

          <ReviewField
            label="Date of Birth"
            value={personal.dateOfBirth}
          />

          <ReviewField
            label="Nationality"
            value={personal.nationality}
          />

          <ReviewField
            label="National ID"
            value={personal.idNumber}
          />

          <ReviewField
            label="KRA PIN"
            value={personal.kraPin}
          />
        </div>
      </ApplicationReviewSection>


      {/* ==========================================
          CONTACT INFORMATION
          ========================================== */}
      <ApplicationReviewSection
        title="Contact Information"
        icon="bi-telephone"
      >
        <div className="row">
          <ReviewField
            label="Email Address"
            value={contact.email}
          />

          <ReviewField
            label="Phone Number"
            value={contact.phoneNumber}
          />

          <ReviewField
            label="Alternative Phone"
            value={contact.alternativePhoneNumber}
          />

          <ReviewField
            label="County"
            value={contact.county}
          />

          <ReviewField
            label="Sub County"
            value={contact.subCounty}
          />

          <ReviewField
            label="Ward"
            value={contact.ward}
          />

          <ReviewField
            label="Town"
            value={contact.town}
          />

          <ReviewField
            label="Physical Address"
            value={contact.physicalAddress}
          />

          <ReviewField
            label="Postal Address"
            value={contact.postalAddress}
          />

          <ReviewField
            label="Postal Code"
            value={contact.postalCode}
          />
        </div>
      </ApplicationReviewSection>


      {/* ==========================================
          EMPLOYMENT INFORMATION
          ========================================== */}
      <ApplicationReviewSection
        title="Employment Information"
        icon="bi-briefcase"
      >
        <div className="row">
          <ReviewField
            label="Employment Status"
            value={employment.employmentStatus}
          />

          <ReviewField
            label="Employer"
            value={employment.employerName}
          />

          <ReviewField
            label="Organization Type"
            value={employment.organizationType}
          />

          <ReviewField
            label="Job Title"
            value={employment.jobTitle}
          />

          <ReviewField
            label="Department"
            value={employment.department}
          />

          <ReviewField
            label="Work Station"
            value={employment.workStation}
          />

          <ReviewField
            label="Staff Number"
            value={employment.staffNumber}
          />

          <ReviewField
            label="Employment Date"
            value={employment.employmentDate}
          />

          <ReviewField
            label="Monthly Income"
            value={employment.monthlyIncome}
          />
        </div>
      </ApplicationReviewSection>


      {/* ==========================================
          MARITIME INFORMATION
          ========================================== */}
      <ApplicationReviewSection
        title="Maritime Information"
        icon="bi-water"
      >
        <div className="row">
          <ReviewField
            label="Maritime Sector"
            value={maritime.maritimeSector}
          />

          <ReviewField
            label="Current Position"
            value={maritime.currentPosition}
          />

          <ReviewField
            label="Years of Experience"
            value={maritime.yearsOfExperience}
          />

          <ReviewField
            label="Professional Qualification"
            value={maritime.professionalQualification}
          />

          <ReviewField
            label="License Number"
            value={maritime.licenseNumber}
          />
        </div>
      </ApplicationReviewSection>


      {/* ==========================================
          EMERGENCY CONTACT
          ========================================== */}
      <ApplicationReviewSection
        title="Emergency Contact"
        icon="bi-person-exclamation"
      >
        <div className="row">
          <ReviewField
            label="Full Name"
            value={emergencyContact.fullName}
          />

          <ReviewField
            label="Relationship"
            value={emergencyContact.relationship}
          />

          <ReviewField
            label="Phone Number"
            value={emergencyContact.phoneNumber}
          />

          <ReviewField
            label="Alternative Phone"
            value={emergencyContact.alternativePhoneNumber}
          />

          <ReviewField
            label="Email"
            value={emergencyContact.email}
          />

          <ReviewField
            label="Physical Address"
            value={emergencyContact.physicalAddress}
          />
        </div>
      </ApplicationReviewSection>


      {/* ==========================================
          NEXT OF KIN
          ========================================== */}
      <ApplicationReviewSection
        title="Next of Kin"
        icon="bi-people"
      >
        <div className="row">
          <ReviewField
            label="Full Name"
            value={nextOfKin.fullName}
          />

          <ReviewField
            label="Relationship"
            value={nextOfKin.relationship}
          />

          <ReviewField
            label="Phone Number"
            value={nextOfKin.phoneNumber}
          />

          <ReviewField
            label="Alternative Phone"
            value={nextOfKin.alternativePhoneNumber}
          />

          <ReviewField
            label="Email"
            value={nextOfKin.email}
          />

          <ReviewField
            label="Physical Address"
            value={nextOfKin.physicalAddress}
          />
        </div>
      </ApplicationReviewSection>


      {/* ==========================================
          DOCUMENTS
          ========================================== */}
      <ApplicationReviewSection
        title="Supporting Documents"
        icon="bi-file-earmark-text"
      >
        {Object.keys(documents).length === 0 ? (
          <p className="text-muted mb-0">
            No supporting documents found.
          </p>
        ) : (
          <div className="row">
            {Object.entries(documents).map(
              ([documentKey, documentData]) => (
                <ReviewField
                  key={documentKey}
                  label={documentKey}
                  value={
                    documentData?.fileName ||
                    documentData?.name ||
                    "Document uploaded"
                  }
                />
              )
            )}
          </div>
        )}
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