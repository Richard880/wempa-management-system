// src/features/admin/pages/Members/Members.jsx
import { useMemo } from "react";
import useAdminMembers from "../hooks/useAdminMembers";
import MemberFilters from "../components/members/MemberFilters";
import MemberTable from "../components/members/MemberTable";
import { FaSync } from "react-icons/fa";

export default function Members() {
  const {
    members,
    status,
    searchTerm,
    loading,
    error,
    changeStatus,
    changeSearchTerm,
    clearFilters,
    refreshMembers,
  } = useAdminMembers();

  /**
   * 🟢 DYNAMIC REGISTER DATA SANITIZATION MATRIX
   * Extracts deep nested database properties (membershipNumber, constructed names, etc.)
   * right at the parent view layer, making them instantly available as root keys 
   * for the child MemberTable component.
   */
    /**
   * 🟢 DYNAMIC REGISTER DATA SANITIZATION MATRIX FIXED
   * Extracts deep nested database properties (membershipNumber, constructed names, etc.)
   * right at the parent view layer, making them instantly available as root keys 
   * for the child MemberTable component.
   */
  const sanitizedMembers = useMemo(() => {
    if (!Array.isArray(members)) return [];

    return members
      .map((member) => {
        if (!member) return null;

        const personal = member.personal || {};
        const contact = member.contact || {};
        const employment = member.employment || {};

        // 🟢 FIXED ARRAY INITIALIZATION: Fed parameters directly into the array block
        const constructedName = [personal.firstName, personal.middleName, personal.lastName]
          .filter(Boolean)
          .join(" ")
          .trim();

        return {
          ...member,
          // Lifted to the root level for easy table parsing by the child component
          membershipNumber: personal.membershipNumber || "Pending Issuance",
          memberName: constructedName || member.fullName || member.displayName || "WEMPA Member",
          emailAddress: contact.email || "—",
          phoneNumber: contact.phoneNumber || "—",
          specialization: employment.Specialization || "General Sector",
          jobTitle: employment.jobTitle || "Professional"
        };
      })
      .filter(Boolean);
  }, [members]);

  return (
    <section className="members-workspace">
      {/* ==========================================
          PAGE HEADER (Light Theme Corporate View)
          ========================================== */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h1 className="h3 fw-bold mb-1 text-dark">WEMPA Roster</h1>
          <p className="text-muted mb-0 small">
            View, audit, and manage active professional credentials and operational files within the association.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-2 py-2 px-3 fw-semibold shadow-sm"
          onClick={refreshMembers}
          disabled={loading}
        >
          <FaSync className={loading ? "fa-spin text-info" : ""} />
          <span>{loading ? "Syncing Roster..." : "Refresh Members"}</span>
        </button>
      </div>

      {/* ==========================================
          FILTERS MANAGEMENT PANELS
          ========================================== */}
      <div className="card border-0 shadow-sm p-3 mb-4 bg-white rounded-3">
        <MemberFilters
          status={status}
          searchTerm={searchTerm}
          onStatusChange={changeStatus}
          onSearchChange={changeSearchTerm}
          onClearFilters={clearFilters}
        />
      </div>

      {/* ==========================================
          ERROR STATE HANDLING
          ========================================== */}
      {error && (
        <div className="alert alert-danger border-0 shadow-sm mb-4 d-flex align-items-center justify-content-between gap-3" role="alert">
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-x-circle-fill fs-5" />
            <span className="fw-medium">{error}</span>
          </div>
          <button
            type="button"
            className="btn btn-sm btn-danger px-3 fw-bold"
            onClick={refreshMembers}
          >
            Try Again
          </button>
        </div>
      )}

      {/* ==========================================
          LOADING SCREEN COMPONENT
          ========================================== */}
      {loading && (
        <div className="card border-0 shadow-sm bg-white rounded-3">
          <div className="card-body p-5 text-center">
            <div className="spinner-border text-info mb-3" role="status" style={{ width: "2.5rem", height: "2.5rem" }} />
            <p className="text-muted small mb-0 font-monospace">COMPILING REGISTERED ACTIVE MEMBERS ROSTER...</p>
          </div>
        </div>
      )}

      {/* ==========================================
          MEMBERS INTERACTIVE ROW TABLES
          ========================================== */}
      {!loading && !error && (
        <div className="card border-0 shadow-sm bg-white rounded-3 overflow-hidden">
          {/* 
            Passes down the enhanced dataset containing flattened root keys for memberName 
            and membershipNumber, making it easy to list them inside your MemberTable rows.
          */}
          <MemberTable
            members={sanitizedMembers}
          />
        </div>
      )}
    </section>
  );
}
