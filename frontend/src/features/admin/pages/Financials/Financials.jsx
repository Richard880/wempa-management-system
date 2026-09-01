// src/features/admin/pages/Financials/Financials.jsx
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import ROUTES from "../../../../constants/routes";
import { useSearchParams } from "react-router-dom";
import {
  FaCreditCard,
  FaCheckCircle,
  FaHourglassHalf,
  FaSearch,
  FaSync, // 🟢 FIXED: Replaced FaArrowClockwise with the correct Font Awesome icon
  FaFileDownload,
} from "react-icons/fa";
import adminDashboardService from "../../services/adminDashboardService";
import styles from "./Financials.module.css";

export default function Financials() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [actionId, setActionLoadingId] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const urlStatus = searchParams.get("status");
  const filterStatus = urlStatus || "ALL";

  const setFilterStatus = (newStatus) => {
    if (newStatus === "ALL") {
      setSearchParams({});
    } else {
      setSearchParams({ status: newStatus });
    }
  };

  const loadFinancialData = async () => {
    try {
      setLoading(true);
      const data = await adminDashboardService.getRecentApplications();
      setApplications(data || []);
    } catch (err) {
      console.error(
        "Failed to load administrative revenue metrics ledger:",
        err,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFinancialData();
  }, []);

  const transactionRows = useMemo(() => {
    if (!Array.isArray(applications)) return [];

    return applications
      .filter((app) => app && app.payment && typeof app.payment === "object")
      .map((app) => {
        const personal = app.personal || {};
        const payment = app.payment || {};

        const constructedName = [
          personal.firstName,
          personal.middleName,
          personal.lastName,
        ]
          .filter(Boolean)
          .join(" ")
          .trim();

        return {
          id: app.id,
          applicantName: constructedName || "WEMPA Applicant",
          membershipNumber: personal.membershipNumber || "Pending",
          mpesaReceipt: payment.mpesaReceipt || "—",
          category: payment.membershipCategory || "General Member",
          amount: Number(payment.amountCharged || payment.amount || 0),
          status: String(
            payment.paymentStatus || "PENDING_VERIFICATION",
          ).toUpperCase(),
          submittedAt: payment.submittedAt || app.updatedAt || null,
        };
      });
  }, [applications]);

  const stats = useMemo(() => {
    let total = 0;
    let verifiedCount = 0;
    let pendingCount = 0;

    transactionRows.forEach((row) => {
      if (row.status === "SUCCESS" || row.status === "VERIFIED") {
        total += row.amount;
        verifiedCount++;
      } else if (
        row.status === "PENDING_VERIFICATION" ||
        row.status === "PENDING"
      ) {
        pendingCount++;
      }
    });

    return { total, verifiedCount, pendingCount };
  }, [transactionRows]);

  const filteredTransactions = useMemo(() => {
    return transactionRows.filter((row) => {
      const currentStatus = row.status;

      const isRowPending =
        currentStatus === "PENDING_VERIFICATION" || currentStatus === "PENDING";
      const isRowCleared =
        currentStatus === "SUCCESS" || currentStatus === "VERIFIED";

      let matchesStatus = false;
      if (filterStatus === "ALL") matchesStatus = true;
      else if (filterStatus === "SUCCESS" && isRowCleared) matchesStatus = true;
      else if (filterStatus === "PENDING_VERIFICATION" && isRowPending)
        matchesStatus = true;

      const matchesSearch =
        row.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.mpesaReceipt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.membershipNumber.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [transactionRows, filterStatus, searchTerm]);

  const handleVerifyReceipt = async (id, mpesaCode) => {
    const confirmed = window.confirm(
      `Confirm receipt verification for M-Pesa Code: ${mpesaCode}?`,
    );
    if (!confirmed) return;

    try {
      setActionLoadingId(id);
      console.log(`Clearing payment block for node ID: ${id}`);

      setApplications((prev) =>
        prev.map((app) =>
          app.id === id
            ? {
                ...app,
                payment: { ...app.payment, paymentStatus: "SUCCESS" },
              }
            : app,
        ),
      );
    } catch (err) {
      console.error("Failed to commit financial state clearance:", err);
    } finally {
      setActionLoadingId(null);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingWrapper}>
        <div
          className="spinner-border text-info mb-3"
          role="status"
          style={{ width: "2.5rem", height: "2.5rem" }}
        />
        <span className={styles.loadingText}>
          COMPILING FINANCIAL LEDGER AUDITS...
        </span>
      </div>
    );
  }

  return (
    <div className={styles.financialsWorkspace}>
      {/* 🧭 HEADER NAVIGATION BLOCK */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h1 className="h3 fw-bold mb-1 text-dark">Financials & Revenue</h1>
          <p className="text-muted mb-0 small">
            Reconcile transaction audits, review receipts, and monitor platform
            collection pools.
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          {/* 🟢 FIXED ICON: Changed to FaSync */}
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-2 py-2 px-3 fw-semibold"
            onClick={loadFinancialData}
          >
            <FaSync /> Refresh
          </button>
          <button
            type="button"
            className="btn btn-sm btn-dark d-inline-flex align-items-center gap-2 py-2 px-3 fw-semibold"
          >
            <FaFileDownload /> Export Ledger
          </button>
        </div>
      </div>

      {/* 📊 ANALYTICS OVERVIEW RIBBON CARDS */}
      <div className={styles.statsRibbonGrid}>
        <div className={styles.statCard}>
          <div className={`${styles.iconBox} ${styles.blueIcon}`}>
            <FaCreditCard />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Total Reconciled Revenue</span>
            <strong className={styles.statValue}>
              KES {stats.total.toLocaleString("en-KE")}
            </strong>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.iconBox} ${styles.emeraldIcon}`}>
            <FaCheckCircle />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Cleared Transactions</span>
            <strong className={styles.statValue}>
              {stats.verifiedCount} Payments
            </strong>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.iconBox} ${styles.orangeIcon}`}>
            <FaHourglassHalf />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Awaiting Verification</span>
            <strong className={styles.statValue}>
              {stats.pendingCount} Receipts
            </strong>
          </div>
        </div>
      </div>

      {/* 🛠️ SEARCH & FILTER TOOLBAR PANEL */}
      <div className={styles.toolbarPanel}>
        <div className={styles.searchWrapper}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search by Applicant Name, Receipt Code, ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.value)}
          />
        </div>

        {/* Filter Buttons */}
        <div className={styles.filterGroup}>
          <button
            type="button"
            className={`${styles.filterBtn} ${filterStatus === "ALL" ? styles.activeFilter : ""}`}
            onClick={() => setFilterStatus("ALL")}
          >
            All
          </button>
          <button
            type="button"
            className={`${styles.filterBtn} ${filterStatus === "SUCCESS" ? styles.activeFilter : ""}`}
            onClick={() => setFilterStatus("SUCCESS")}
          >
            Cleared
          </button>
          <button
            type="button"
            className={`${styles.filterBtn} ${filterStatus === "PENDING_VERIFICATION" ? styles.activeFilter : ""}`}
            onClick={() => setFilterStatus("PENDING_VERIFICATION")}
          >
            Pending
          </button>
        </div>
      </div>

      {/* 🔓 THE FINANCIALS DATA TABLE */}
      <div className={styles.tableResponsiveCard}>
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr className={styles.tableHeaderRow}>
              <th scope="col">Applicant & ID</th>
              <th scope="col">M-Pesa Code</th>
              <th scope="col">Category</th>
              <th scope="col">Amount (KES)</th>
              <th scope="col">Status</th>
              <th scope="col" className="text-end">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-5 text-muted font-monospace small"
                >
                  ✕ No matching transaction records identified in the registry
                  directory.
                </td>
              </tr>
            ) : (
              filteredTransactions.map((tx) => {
                const isPending =
                  tx.status === "PENDING_VERIFICATION" ||
                  tx.status === "PENDING";

                return (
                  <tr key={tx.id} className={styles.tableBodyRow}>
                    <td>
                      <strong className="text-dark d-block mb-0.5">
                        {tx.applicantName}
                      </strong>
                      <span className="text-xs text-muted font-monospace">
                        {tx.membershipNumber}
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark font-monospace border py-1.5 px-2.5 fw-bold">
                        {tx.mpesaReceipt}
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark font-monospace border py-1.5 px-2.5 fw-bold">
                        {tx.category}
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark font-monospace border py-1.5 px-2.5 fw-bold">
                        {tx.amount.toLocaleString("en-KE")}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${isPending ? styles.badgePending : styles.badgeSuccess}`}
                      >
                        {isPending ? "Pending" : "Cleared"}
                      </span>
                    </td>

                    <td className="text-end">
                      <Link
                        to={ROUTES.ADMIN_FINANCIALS_DETAIL.replace(
                          ":applicationId",
                          tx.id,
                        )}
                        className="btn btn-sm btn-outline-primary fw-bold"
                        style={{
                          borderRadius: "6px",
                          fontSize: "0.8rem",
                          padding: "0.35rem 0.85rem",
                        }}
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
