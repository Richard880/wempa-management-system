
import PropTypes from "prop-types";
import styles from "./ProfileSummary.module.css"; // Assuming matching local styles file

export default function ProfileSummary({ profile, application, progress, isLocked }) {
  // Helper to cleanly extract names with fallback options
  const firstName = profile?.firstName || application?.personal?.firstName || "Member";
  const lastName = profile?.lastName || application?.personal?.lastName || "";
  const email = profile?.email || application?.contact?.email || "—";
  const currentRank = application?.maritime?.rank || "Not Specified";

  return (
    <div className={styles.card}>
      <div className={styles.headerBlock}>
        <div className={styles.avatar}>
          {firstName.charAt(0).toUpperCase()}
        </div>
        <div className={styles.metaInfo}>
          <h3 className={styles.name}>{`${firstName} ${lastName}`.trim()}</h3>
          <p className={styles.role}>{currentRank}</p>
        </div>
      </div>

      <div className={styles.detailsList}>
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
          <span className={`${styles.statusLabel} ${isLocked ? styles.activeStatus : styles.draftStatus}`}>
            {isLocked ? "Application Submitted" : "Profile Pending"}
          </span>
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
