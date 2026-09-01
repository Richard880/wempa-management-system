// src/features/admin/pages/Applications/Applications.jsx
import { useMemo } from "react";
import useAdminApplications from "../hooks/useAdminApplications";
import ApplicationFilters from "../components/applications/ApplicationFilters";
import ApplicationTable from "../components/applications/ApplicationTable";
import { FaSync } from "react-icons/fa";

export default function Applications() {
  const {
    applications,
    status,
    loading,
    error,
    changeStatus,
    refreshApplications,
  } = useAdminApplications();

  /**
   * 🟢 DYNAMIC INVENTORY DATA ENHANCEMENT MATRIX
   * Normalizes deep nested database sub-nodes (personal info, membership IDs, names) 
   * right at the parent layer, making them instantly available to the child ApplicationTable component.
   */
  const sanitizedApplications = useMemo(() => {
    if (!Array.isArray(applications)) return [];

    return applications.map((app) => {
      if (!app) return null;
      
      const personal = app.personal || {};
      const contact = app.contact || {};
      const payment = app.payment || {};

      // Construct a clean full legal name from personal metadata entries
      const constructedName = [personal.firstName, personal.middleName, personal.lastName]
        .filter(Boolean)
        .join(" ")
        .trim();

      return {
        ...app,
        // 🟢 RESTORED ASSIGNMENT TARGETS: Lifted to the root level for easy table viewing
        membershipNumber: personal.membershipNumber || "Pending Issuance",
        applicantName: constructedName || app.displayName || app.email || "WEMPA Applicant",
        idNumber: personal.idNumber || "—",
        emailAddress: contact.email || "—",
        phoneNumber: contact.phoneNumber || "—",
        amountPaid: payment.amountCharged || payment.amount || 0,
        mpesaReceipt: payment.mpesaReceipt || "—"
      };
    }).filter(Boolean);
  }, [applications]);

  return (
    <section className="applications-workspace">
      {/* ==========================================
          PAGE HEADER (Light Theme Optimized)
          ========================================== */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h1 className="h3 fw-bold mb-1 text-dark">Membership Applications</h1>
          <p className="text-muted mb-0 small">
            Review, verify, and process incoming digital registrations and professional credentials.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-2 py-2 px-3 fw-semibold shadow-sm"
          onClick={refreshApplications}
          disabled={loading}
        >
          <FaSync className={loading ? "fa-spin text-info" : ""} />
          <span>{loading ? "Syncing Roster..." : "Refresh Registry"}</span>
        </button>
      </div>

      {/* ==========================================
          FILTERS TOOLBAR PANEL
          ========================================== */}
      <div className="card border-0 shadow-sm p-2 mb-4 bg-white rounded-3">
        <ApplicationFilters
          status={status}
          onStatusChange={changeStatus}
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
            onClick={refreshApplications}
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
            <p className="text-muted small mb-0 font-monospace">COMPILING REGISTRY APPLICATIONS INDEX...</p>
          </div>
        </div>
      )}

      {/* ==========================================
          APPLICATION TABLES (🟢 FULLY POWERED)
          ========================================== */}
      {!loading && !error && (
        <div className="card border-0 shadow-sm bg-white rounded-3 overflow-hidden">
          {/* 
            Passes down the enhanced dataset containing root keys for applicantName 
            and membershipNumber, making it easy to reference them inside your list items.
          */}
          <ApplicationTable
            applications={sanitizedApplications}
          />
        </div>
      )}
    </section>
  );
}
