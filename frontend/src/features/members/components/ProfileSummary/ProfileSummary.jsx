import PropTypes from "prop-types";
import styles from "./ProfileSummary.module.css"; 

export default function ProfileSummary({ profile, application, progress, isLocked }) {
  // Helper to cleanly extract names with fallback options
  const firstName = profile?.firstName || application?.personal?.firstName || "Member";
  const lastName = profile?.lastName || application?.personal?.lastName || "";
  const email = profile?.email || application?.contact?.email || "—";
  
  // 	🏼 1. FIXED: Pull the real document ID directly from the authenticated "users" profile document matrix
  const userIdFromUsersCollection = profile?.id || profile?.uid || "—";
  const memberType = application?.personal?.membershipType || "Applicant";

  // 	🏼 2. DYNAMIC STATUS MAPPING: Check the status coming from Firestore
  const status = application?.applicationStatus || "draft";

  const renderStatusBadge = () => {
    if (status === "approved") {
      return <span className={`${styles.statusLabel} ${styles.approvedStatus}`}>Application Approved</span>;
    }
    if (isLocked || status === "submitted") {
      return <span className={`${styles.statusLabel} ${styles.activeStatus}`}>Application Submitted</span>;
    }
    return <span className={`${styles.statusLabel} ${styles.draftStatus}`}>Profile Pending</span>;
  };

  return (
    <div className={styles.card}>
      <div className={styles.headerBlock}>
        <div className={styles.avatar}>
          {firstName.charAt(0).toUpperCase()}
        </div>
        <div className={styles.metaInfo}>
          <h3 className={styles.name}>{`${firstName} ${lastName}`.trim()}</h3>
          <p className={styles.role}>{memberType}</p>
        </div>
      </div>

      <div className={styles.detailsList}>
        {/* Displays the verified ID pulled straight from the users collection doc */}
        <div className={styles.detailRow}>
          <span>User ID:</span>
          <strong className={styles.idText}>
            {userIdFromUsersCollection !== "—" ? `${userIdFromUsersCollection.slice(0, 8)}...` : "—"}
          </strong>
        </div>

        <div className={styles.detailRow}>
          <span>Email Address:</span>
          <strong>{email}</strong>
        </div>

        <div className={styles.detailRow}>
          <span>Application Progress:</span>
          <span className={styles.progressText}>{progress}%</span>
        </div>

        <div className={styles.detailRow}>
          <span>Status Track:</span>
          {renderStatusBadge()}
        </div>
      </div>
    </div>
  );
}

ProfileSummary.propTypes = {
  profile: PropTypes.object,
  application: PropTypes.object,
  progress: PropTypes.number.isRequired,
  isLocked: PropTypes.bool.isRequired,
};
