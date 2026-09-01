// src/features/admin/pages/Financials/FinancialsDetail.jsx
import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { doc,updateDoc, serverTimestamp, getDoc } from "firebase/firestore";

import { useAuth } from "../../../auth/hooks/useAuth";
// 🟢 FIXED RELATIVE DIRECTORY DEPTH: Steps up 4 levels to target src/firebase.js cleanly
import { db } from "../../../../firebase"; 

import { FaArrowLeft, FaCheckCircle, FaExclamationTriangle, FaFileInvoiceDollar, FaUser, FaShieldAlt } from "react-icons/fa";
import ROUTES from "../../../../constants/routes";
import styles from "./FinancialDetails.module.css"; // Ensure file name matches your style naming architecture case precisely

export default function FinancialsDetail() {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();
  
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [flagging, setFlagging] = useState(false);

  const currentUser = auth?.currentUser || auth?.user || null;

  const fetchTransactionRecord = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, "members", applicationId);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setApplication({ id: snap.id, ...snap.data() });
      }
    } catch (err) {
      console.error("Failed to acquire standalone transaction record payload:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (applicationId) fetchTransactionRecord();
  }, [applicationId]);

  const personal = application?.personal || {};
  const payment = application?.payment || {};
  const contact = application?.contact || {};

  const applicantName = useMemo(() => {
    return [personal.firstName, personal.middleName, personal.lastName]
      .filter(Boolean)
      .join(" ")
      .trim() || "WEMPA Applicant";
  }, [personal]);

  const handleUpdatePaymentStatus = async (newStatus, reasonStr = null) => {
    const isSuccess = newStatus === "SUCCESS";
    const msg = isSuccess 
      ? "Verify receipt and clear payment transaction?" 
      : "Flag this payment receipt as invalid?";
      
    if (!window.confirm(msg)) return;

    try {
      setSubmitting(true);
      const docRef = doc(db, "members", applicationId);
      
      const adminUid = currentUser?.uid || "system-admin";
      const adminName = currentUser?.displayName || currentUser?.email || "Admin";

      // 🟢 ATOMIC FIRESTORE NODE COMMIT: Directly targets and flips financial and auditing nodes
      await updateDoc(docRef, {
        "payment.paymentStatus": newStatus,
        "payment.verifiedAt": serverTimestamp(),
        "payment.verifiedBy": adminUid,
        "payment.verifiedByName": adminName,
        // If flagged, store rejection context parameters
        "payment.auditNotes": reasonStr,
        "updatedAt": serverTimestamp()
      });

      console.log(`Successfully committed status "${newStatus}" to transactional receipt.`);
      
      // Reload values cleanly
      await fetchTransactionRecord();
      setFlagging(false);
      setRejectionReason("");
    } catch (err) {
      console.error("Failed to commit transactional audit updates:", err);
      alert("Failed to save changes. Please crosscheck firestore policies.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.centerSpinner}>
        <div className="spinner-border text-info mb-3" role="status" style={{ width: "2.5rem", height: "2.5rem" }} />
        <p className="text-muted small font-monospace">FETCHING INVOICE TRANSACTION BLUEPRINT...</p>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="alert alert-warning border-0 shadow-sm d-flex align-items-center gap-2 m-4">
        <FaExclamationTriangle />
        <span>Transaction ledger profile expired or missing inside the cloud directory.</span>
      </div>
    );
  }

  const isSettled = payment.paymentStatus === "SUCCESS" || payment.paymentStatus === "VERIFIED";
  const isFailed = payment.paymentStatus === "FAILED" || payment.paymentStatus === "REJECTED";

  return (
    <main className={styles.detailWorkspace}>
      {/* 🧭 BACK ROUTER ACTION HEADER */}
      <div className="mb-4">
        <Link to={ROUTES.ADMIN_FINANCIALS} className="text-decoration-none text-secondary d-inline-flex align-items-center gap-2 small fw-bold">
          <FaArrowLeft /> Back to Transactions Ledger
        </Link>
      </div>

      <div className={styles.gridContainer}>
        {/* LEFT COLUMN PANEL: Payment Invoice Receipt Elements */}
        <div className={styles.leftPane}>
          <div className={styles.invoiceCard}>
            <div className={styles.invoiceHeader}>
              <div className={styles.invoiceBrand}>
                <FaFileInvoiceDollar className="text-info fs-3" />
                <div>
                  <h4 className="fw-bold mb-0 text-dark">M-Pesa Receipt Audit</h4>
                  <span className="text-xs text-muted font-monospace">Ref: {application.id}</span>
                </div>
              </div>
              <span className={`${styles.statusBadge} ${isSettled ? styles.badgeSuccess : isFailed ? styles.badgeDanger : styles.badgePending}`}>
                {payment.paymentStatus || "Awaiting Audit"}
              </span>
            </div>

            <div className={styles.receiptBody}>
              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>M-Pesa Transaction Code</span>
                <strong className="font-monospace text-dark fs-5">{payment.mpesaReceipt || "—"}</strong>
              </div>

              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Charged Dimension (KES)</span>
                <strong className="text-info fs-4 fw-extrabold">{Number(payment.amountCharged || 0).toLocaleString("en-KE")}.00</strong>
              </div>

              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Membership Tier Selected</span>
                <span className="text-dark fw-semibold small">{payment.membershipCategory || "Student Member"}</span>
              </div>

              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Submission Date Token</span>
                <span className="text-secondary small font-monospace">{payment.submittedAt ? new Date(payment.submittedAt).toLocaleString("en-KE") : "—"}</span>
              </div>

              {payment.verifiedByName && (
                <div className={`${styles.metaRow} border-top pt-3 mt-2`}>
                  <span className={styles.metaLabel}><FaShieldAlt className="me-1 text-xs" /> Reconciled By</span>
                  <span className="text-muted small fw-medium">{payment.verifiedByName} ({payment.auditNotes || "Cleared Match"})</span>
                </div>
              )}
            </div>

            {/* 🟢 INTERACTIVE APPROVAL PANEL ACTION BUTTONS ROW */}
            {!isSettled && (
              <div className={styles.actionsBlock}>
                {!flagging ? (
                  <div className="d-flex gap-2 w-100">
                    <button 
                      type="button" 
                      className="btn btn-success fw-bold d-inline-flex align-items-center justify-content-center gap-2 py-2.5 flex-grow-1"
                      style={{ borderRadius: "8px" }}
                      disabled={submitting}
                      onClick={() => handleUpdatePaymentStatus("SUCCESS")}
                    >
                      <FaCheckCircle /> Verify & Clear Payment
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-outline-danger fw-semibold py-2.5 px-3"
                      style={{ borderRadius: "8px" }}
                      disabled={submitting}
                      onClick={() => setFlagging(true)}
                    >
                      Flag Receipt
                    </button>
                  </div>
                ) : (
                  <div className="w-100 p-3 border rounded-3 bg-light">
                    <label className="form-label small fw-bold text-dark mb-1">Reason for Flagging / Rejection</label>
                    <textarea 
                      className="form-control small mb-2" 
                      rows="2" 
                      placeholder="e.g. Invalid transaction reference code or mismatched amount..."
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                    />
                    <div className="d-flex justify-content-end gap-2">
                      <button type="button" className="btn btn-sm btn-link text-secondary" onClick={() => setFlagging(false)}>Cancel</button>
                      <button 
                        type="button" 
                        className="btn btn-sm btn-danger fw-bold" 
                        disabled={submitting || !rejectionReason.trim()}
                        onClick={() => handleUpdatePaymentStatus("FAILED", rejectionReason)}
                      >
                        Confirm Flag
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN PANEL: Applicant Context Overview */}
        <div className={styles.rightPane}>
          <div className={styles.profileSummaryCard}>
            <h5 className="fw-bold text-dark border-bottom pb-3 mb-3"><FaUser className="me-2 text-muted" /> Applicant Overview</h5>
            
            <div className={styles.profileRow}>
              <div className="col-6">
                <p className="small text-muted mb-1">Registry Full Name</p>
                <p className="fw-bold">{applicantName}</p>
              </div>
              <div className="col-6">
                <p className="small text-muted mb-1">Membership ID Target</p>
                <p className="fw-bold">{personal.membershipNumber || "Pending Issuance"}</p>
              </div>
            </div>

            <div className={styles.profileRow}>
              <div className="col-6">
                <p className="small text-muted mb-1">National ID / ID Document</p>
                <p className="fw-bold">{personal.idNumber || "—"}</p>
              </div>
              <div className="col-6">
                <p className="small text-muted mb-1">Primary Email Address</p>
                <p className="fw-bold">{contact.email || "—"}</p>
              </div>
            </div>

            <div className={styles.profileRow}>
              <div className="col-6">
                <p className="small text-muted mb-1">Contact Mobile Number</p>
                <p className="fw-bold">{contact.phoneNumber || "—"}</p>
              </div>
            </div>
          </div>
        </div>
        </div>
        </main>
  )
}