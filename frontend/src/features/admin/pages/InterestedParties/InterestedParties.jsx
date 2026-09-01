// src/features/admin/pages/InterestedParties/InterestedParties.jsx
import  { useState, useEffect, useMemo } from "react";
import { 
  FaUserClock, 
  FaPaperPlane, 
  FaSync, 
  FaSearch,
  FaInbox
} from "react-icons/fa";
import adminDashboardService from "../../services/adminDashboardService";
import styles from "./InterestedParties.module.css";

export default function InterestedParties() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sendingId, setSendingId] = useState(null);

  const loadInterestedParties = async () => {
    try {
      setLoading(true);
      const list = await adminDashboardService.getInterestedPartiesList();
      
      // 🟢 THE FIX: Updates data and maintains loading state coordination seamlessly
      setUsers(list || []);
    } catch (err) {
      console.error("Failed to compile interested parties roster:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInterestedParties();
  }, []);

  const filteredUsers = useMemo(() => {
    if (!Array.isArray(users)) return [];
    return users.filter((u) => {
      const name = (u.fullName || u.displayName || "").toLowerCase();
      const email = (u.email || "").toLowerCase();
      return name.includes(searchTerm.toLowerCase()) || email.includes(searchTerm.toLowerCase());
    });
  }, [users, searchTerm]);
// inside your InterestedParties.jsx file component body:
const [toastMessage, setToastMessage] = useState(null); // Adds localized toast context state

const handleSendReminder = async (userId, userEmail) => {
  try {
    setSendingId(userId);
    console.log(`Dispatched completion reminder alert system event hook to: ${userEmail}`);
    
    // Simulate cloud messaging transmission latency
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // 🟢 THE TOAST POPUP TRIGGER: Set the success message to show instantly on screen
    setToastMessage(`Onboarding completion reminder successfully sent to ${userEmail}!`);
    
    // Automatically fade out the toast message popup after 4 seconds
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);

  } catch (err) {
    console.error("Cloud message broadcast event failed:", err);
    setToastMessage("✕ Failed to dispatch reminder. Please verify project server logs.");
  } finally {
    setSendingId(null);
  }
};

  return (
    <main className={styles.workspace}>
      {/* HEADER SECTION */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h1 className="h3 fw-bold text-dark mb-1">Interested Parties</h1>
          <p className="text-muted mb-0 small">
            Users who registered a basic account but have not yet completed or submitted their membership application forms.
          </p>
        </div>
        <button 
          type="button" 
          className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-2 py-2 px-3 fw-semibold shadow-sm" 
          onClick={loadInterestedParties}
          disabled={loading}
        >
          <FaSync className={loading ? "fa-spin text-info" : ""} /> 
          <span>{loading ? "Syncing..." : "Refresh List"}</span>
        </button>
      </div>

      {/* FILTER SEARCH METRICS PANEL TOOLBAR */}
      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <FaSearch className={styles.searchIcon} />
          <input 
            type="text" 
            className={styles.searchInput} 
            placeholder="Search basic users by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={loading && users.length === 0}
          />
        </div>
        <span className="badge bg-light text-secondary border p-2.5 fw-bold font-monospace">
          {loading ? "Calculating..." : `${filteredUsers.length} Leads Identified`}
        </span>
      </div>

      {/* MAIN CONTAINER CAPTURING CONTAINER PERSISTENCE */}
      <div className="position-relative" style={{ minHeight: "300px" }}>
        
        {/* 🟢 STAGE A: THE LIGHTWEIGHT SMOOTH PULSE LAYOUT SKELETON 
            Fades away gently only when all asynchronous lookups have completed */}
        <div 
          className="position-absolute top-0 start-0 w-100"
          style={{
            transition: "opacity 0.2s ease-in-out",
            opacity: loading ? 1 : 0,
            pointerEvents: loading ? "auto" : "none",
            zIndex: loading ? 2 : 0
          }}
        >
          <div className={styles.tableCard}>
            <div className="p-4 d-flex flex-column gap-3">
              <div className="bg-secondary-subtle rounded placeholder-glow" style={{ width: "100%", height: "45px", animation: "pulse 1.5s infinite" }} />
              <div className="bg-secondary-subtle rounded placeholder-glow" style={{ width: "100%", height: "45px", animation: "pulse 1.5s infinite" }} />
              <div className="bg-secondary-subtle rounded placeholder-glow" style={{ width: "100%", height: "45px", animation: "pulse 1.5s infinite" }} />
            </div>
          </div>
        </div>

        {/* 🟢 STAGE B: THE DYNAMIC TRANSACTIONS LIVE LEDGER GRID
            Fades smoothly into view with accelerated crossfading, clearing layout flicker */}
        <div 
          className="w-100"
          style={{
            transition: "opacity 0.25s ease-in-out, transform 0.25s ease-in-out",
            opacity: loading ? 0 : 1,
            transform: loading ? "translateY(4px)" : "translateY(0)",
            zIndex: loading ? 0 : 1
          }}
        >
          <div className={styles.tableCard}>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className={styles.tableHead}>
                  <tr>
                    <th scope="col">User Details</th>
                    <th scope="col">Email Address</th>
                    <th scope="col">Account Role</th>
                    <th scope="col" className="text-end pe-4">Engagement Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-5 text-muted font-monospace small">
                        <FaInbox className="fs-2 text-muted d-block mx-auto mb-2" />
                        ✕ No pending interested parties found matching criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className={styles.tableRow}>
                        <td className="py-3">
                          <div className="d-flex align-items-center gap-2.5">
                            <div className={styles.avatarPlaceholder}><FaUserClock /></div>
                            <strong className="text-dark fw-semibold" style={{ fontSize: "0.9375rem" }}>
                              {user.fullName || user.displayName || "WEMPA Registrant"}
                            </strong>
                          </div>
                        </td>
                        <td className="text-secondary font-monospace small">{user.email}</td>
                        <td>
                          <span className="badge bg-info-subtle text-info border border-info-subtle text-uppercase px-2 py-1 small">
                            Basic User
                          </span>
                        </td>
                        <td className="text-end pe-4">
                          <button
                            type="button"
                            className="btn btn-sm btn-primary fw-bold py-1.5 px-3 d-inline-flex align-items-center gap-2"
                            style={{ borderRadius: "8px", fontSize: "0.8125rem" }}
                            disabled={sendingId === user.id}
                            onClick={() => handleSendReminder(user.id, user.email)}
                          >
                            {sendingId === user.id ? (
                              <span className="spinner-border spinner-border-sm" role="status" />
                            ) : (
                              <>
                                <FaPaperPlane className="text-xs" /> Send Alert Reminder
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>



                {/* ==========================================================
          🟢 LIGHT-THEME PREMIUM SYSTEM TOAST POPUP NOTIFICATION
          ========================================================== */}
      {toastMessage && (
        <div 
          className="position-fixed bottom-0 end-0 m-4 p-3 rounded-3 shadow-lg border d-flex align-items-center gap-2 bg-white text-dark"
          style={{ 
            zIndex: 2000, 
            minWidth: "320px",
            borderColor: toastMessage.startsWith("✕") ? "#fec2c2 !important" : "#dcfce7 !important",
            background: toastMessage.startsWith("✕") ? "#fef2f2 !important" : "#f0fdf4 !important",
            animation: "fadeInUp 0.3s ease-out"
          }}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <i className={`bi ${toastMessage.startsWith("✕") ? "bi-x-circle-fill text-danger" : "bi-check-circle-fill text-success"} fs-5`} />
          <div className="flex-grow-1 fw-semibold small font-sans" style={{ fontSize: "0.85rem" }}>
            {toastMessage}
          </div>
          <button 
            type="button" 
            className="btn-close ms-auto small" 
            style={{ fontSize: "0.75rem" }} 
            onClick={() => setToastMessage(null)} 
          />
        </div>
      )}

        </div>

      </div>
    </main>
  );
}
