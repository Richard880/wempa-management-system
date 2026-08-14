import { useState } from "react";
import { useParams } from "react-router-dom";

import useAdminMemberDetails from "../hooks/useAdminMemberDetails";

import MemberStatusBadge from "../components/members/MemberStatusBadge";
import MembershipStatusModal from "../components/members/MembershipStatusModal";
import MembershipStatusAudit from "../components/members/MembershipStatusAudit";


function DetailField({ label, value }) {
  return (
    <div className="col-md-6 col-xl-4 mb-4">
      <p className="text-muted small fw-semibold text-uppercase mb-1">
        {label}
      </p>

      <p className="mb-0">
        {value || "—"}
      </p>
    </div>
  );
}


function MemberDetails() {
  const { memberId } = useParams();

  const [showStatusModal, setShowStatusModal] =
    useState(false);


  const {
    member,
    loading,
    actionLoading,
    error,
    refreshMember,
    updateMembershipStatus,
  } = useAdminMemberDetails(memberId);


  /* ==========================================
     Membership Status Modal
     ========================================== */

  const handleOpenStatusModal = () => {
    setShowStatusModal(true);
  };


  const handleCloseStatusModal = () => {
    if (actionLoading) {
      return;
    }

    setShowStatusModal(false);
  };


  const handleStatusChange = async (
    status,
    reason
  ) => {
    try {
      await updateMembershipStatus(
        status,
        reason
      );

      setShowStatusModal(false);
    } catch {
      /*
       * The hook handles the error state.
       * Keep the modal open so the administrator
       * can retry the action.
       */
    }
  };


  /* ==========================================
     Loading State
     ========================================== */

  if (loading) {
    return (
      <section>
        <div className="card border-0 shadow-sm">
          <div className="card-body p-5 text-center">
            <div
              className="spinner-border text-primary mb-3"
              role="status"
            >
              <span className="visually-hidden">
                Loading member details...
              </span>
            </div>

            <p className="text-muted mb-0">
              Loading member details...
            </p>
          </div>
        </div>
      </section>
    );
  }


  /* ==========================================
     Not Found State
     ========================================== */

  if (!member) {
    return (
      <section>
        <div className="card border-0 shadow-sm">
          <div className="card-body p-5 text-center">
            <i
              className="bi bi-person-x fs-1 text-muted d-block mb-3"
              aria-hidden="true"
            />

            <h1 className="h4 fw-bold mb-2">
              Member not found
            </h1>

            <p className="text-muted mb-4">
              The requested member could not be found or is
              not an approved member.
            </p>

            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={refreshMember}
            >
              <i
                className="bi bi-arrow-clockwise me-2"
                aria-hidden="true"
              />

              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }


  /* ==========================================
     Member Data
     ========================================== */

  const {
    personal = {},
    contact = {},
    employment = {},
    maritime = {},
    emergencyContact = {},
    nextOfKin = {},
  } = member;


  const fullName = [
    personal.firstName,
    personal.middleName,
    personal.lastName,
  ]
    .filter(Boolean)
    .join(" ");


  const membershipStatus =
    member.membershipStatus || "pending";


  return (
    <section>
      {/* ==========================================
          PAGE HEADER
          ========================================== */}

      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
        <div>
          <div className="d-flex align-items-center gap-2 mb-2">
            <p className="text-muted small text-uppercase fw-semibold mb-0">
              Member Details
            </p>

            <MemberStatusBadge
              status={membershipStatus}
            />
          </div>

          <h1 className="h3 fw-bold mb-1">
            {fullName || "Unnamed Member"}
          </h1>

          <p className="text-muted mb-0">
            View member information and manage membership status.
          </p>
        </div>


        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={refreshMember}
          disabled={loading || actionLoading}
        >
          <i
            className={`bi ${
              loading
                ? "bi-arrow-repeat"
                : "bi-arrow-clockwise"
            } me-2`}
            aria-hidden="true"
          />

          Refresh
        </button>
      </div>


      {/* ==========================================
          ERROR STATE
          ========================================== */}

      {error && (
        <div
          className="alert alert-danger d-flex justify-content-between align-items-center gap-3"
          role="alert"
        >
          <span>
            {error}
          </span>

          <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            onClick={refreshMember}
            disabled={actionLoading}
          >
            Try Again
          </button>
        </div>
      )}


     {/* ==========================================
    MEMBERSHIP STATUS MANAGEMENT
========================================== */}

<div className="card border-0 shadow-sm mb-4">
  <div className="card-body p-4">
    <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-4">
      <div>
        <div className="d-flex align-items-center gap-2 mb-2">
          <h2 className="h5 fw-bold mb-0">
            Membership Status
          </h2>

          <MemberStatusBadge
            status={membershipStatus}
          />
        </div>

        <p className="text-muted mb-0">
          Change the membership status and record the
          reason for this administrative action.
        </p>
      </div>

      <button
        type="button"
        className="btn btn-primary"
        onClick={handleOpenStatusModal}
        disabled={actionLoading}
      >
        <i
          className="bi bi-arrow-left-right me-2"
          aria-hidden="true"
        />

        Change Status
      </button>
    </div>
  </div>
</div>


{/* ==========================================
    MEMBERSHIP STATUS AUDIT
========================================== */}

<MembershipStatusAudit
  audit={member.membershipStatusAudit}
/>


      {/* ==========================================
          PERSONAL INFORMATION
          ========================================== */}

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="d-flex align-items-center gap-2 mb-4">
            <i
              className="bi bi-person fs-5"
              aria-hidden="true"
            />

            <h2 className="h5 fw-bold mb-0">
              Personal Information
            </h2>
          </div>

          <div className="row">
            <DetailField
              label="First Name"
              value={personal.firstName}
            />

            <DetailField
              label="Middle Name"
              value={personal.middleName}
            />

            <DetailField
              label="Last Name"
              value={personal.lastName}
            />

            <DetailField
              label="Gender"
              value={personal.gender}
            />

            <DetailField
              label="Date of Birth"
              value={personal.dateOfBirth}
            />

            <DetailField
              label="Nationality"
              value={personal.nationality}
            />

            <DetailField
              label="National ID"
              value={personal.idNumber}
            />

            <DetailField
              label="KRA PIN"
              value={personal.kraPin}
            />
          </div>
        </div>
      </div>


      {/* ==========================================
          CONTACT INFORMATION
          ========================================== */}

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="d-flex align-items-center gap-2 mb-4">
            <i
              className="bi bi-telephone fs-5"
              aria-hidden="true"
            />

            <h2 className="h5 fw-bold mb-0">
              Contact Information
            </h2>
          </div>

          <div className="row">
            <DetailField
              label="Email Address"
              value={contact.email}
            />

            <DetailField
              label="Phone Number"
              value={contact.phoneNumber}
            />

            <DetailField
              label="Alternative Phone"
              value={contact.alternativePhoneNumber}
            />

            <DetailField
              label="County"
              value={contact.county}
            />

            <DetailField
              label="Sub County"
              value={contact.subCounty}
            />

            <DetailField
              label="Ward"
              value={contact.ward}
            />

            <DetailField
              label="Town"
              value={contact.town}
            />

            <DetailField
              label="Physical Address"
              value={contact.physicalAddress}
            />

            <DetailField
              label="Postal Address"
              value={contact.postalAddress}
            />

            <DetailField
              label="Postal Code"
              value={contact.postalCode}
            />
          </div>
        </div>
      </div>


      {/* ==========================================
          EMPLOYMENT INFORMATION
          ========================================== */}

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="d-flex align-items-center gap-2 mb-4">
            <i
              className="bi bi-briefcase fs-5"
              aria-hidden="true"
            />

            <h2 className="h5 fw-bold mb-0">
              Employment Information
            </h2>
          </div>

          <div className="row">
            <DetailField
              label="Employment Status"
              value={employment.employmentStatus}
            />

            <DetailField
              label="Employer"
              value={employment.employerName}
            />

            <DetailField
              label="Organization Type"
              value={employment.organizationType}
            />

            <DetailField
              label="Job Title"
              value={employment.jobTitle}
            />

            <DetailField
              label="Department"
              value={employment.department}
            />

            <DetailField
              label="Work Station"
              value={employment.workStation}
            />

            <DetailField
              label="Staff Number"
              value={employment.staffNumber}
            />

            <DetailField
              label="Employment Date"
              value={employment.employmentDate}
            />

            <DetailField
              label="Monthly Income"
              value={employment.monthlyIncome}
            />
          </div>
        </div>
      </div>


      {/* ==========================================
          MARITIME INFORMATION
          ========================================== */}

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="d-flex align-items-center gap-2 mb-4">
            <i
              className="bi bi-water fs-5"
              aria-hidden="true"
            />

            <h2 className="h5 fw-bold mb-0">
              Maritime Information
            </h2>
          </div>

          <div className="row">
            {Object.entries(maritime).length ? (
              Object.entries(maritime).map(
                ([key, value]) => (
                  <DetailField
                    key={key}
                    label={key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (character) =>
                        character.toUpperCase()
                      )}
                    value={value}
                  />
                )
              )
            ) : (
              <div className="col-12">
                <p className="text-muted mb-0">
                  No maritime information available.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>


      {/* ==========================================
          EMERGENCY CONTACT
          ========================================== */}

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="d-flex align-items-center gap-2 mb-4">
            <i
              className="bi bi-person-exclamation fs-5"
              aria-hidden="true"
            />

            <h2 className="h5 fw-bold mb-0">
              Emergency Contact
            </h2>
          </div>

          <div className="row">
            <DetailField
              label="Full Name"
              value={emergencyContact.fullName}
            />

            <DetailField
              label="Relationship"
              value={emergencyContact.relationship}
            />

            <DetailField
              label="Phone Number"
              value={emergencyContact.phoneNumber}
            />

            <DetailField
              label="Alternative Phone"
              value={
                emergencyContact.alternativePhoneNumber
              }
            />

            <DetailField
              label="Email Address"
              value={emergencyContact.email}
            />

            <DetailField
              label="Physical Address"
              value={emergencyContact.physicalAddress}
            />
          </div>
        </div>
      </div>


      {/* ==========================================
          NEXT OF KIN
          ========================================== */}

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="d-flex align-items-center gap-2 mb-4">
            <i
              className="bi bi-people fs-5"
              aria-hidden="true"
            />

            <h2 className="h5 fw-bold mb-0">
              Next of Kin
            </h2>
          </div>

          <div className="row">
            <DetailField
              label="Full Name"
              value={nextOfKin.fullName}
            />

            <DetailField
              label="Relationship"
              value={nextOfKin.relationship}
            />

            <DetailField
              label="Phone Number"
              value={nextOfKin.phoneNumber}
            />

            <DetailField
              label="Alternative Phone"
              value={
                nextOfKin.alternativePhoneNumber
              }
            />

            <DetailField
              label="Email Address"
              value={nextOfKin.email}
            />

            <DetailField
              label="Physical Address"
              value={nextOfKin.physicalAddress}
            />
          </div>
        </div>
      </div>


      {/* ==========================================
          MEMBERSHIP STATUS MODAL
          ========================================== */}

      <MembershipStatusModal
        show={showStatusModal}
        currentStatus={membershipStatus}
        loading={actionLoading}
        onClose={handleCloseStatusModal}
        onConfirm={handleStatusChange}
      />
    </section>
  );
}


export default MemberDetails;