import useApplicationForm from "../../../memberApplication/hooks/useApplicationForm"; 
import styles from "./MembershipCard.module.css";

export default function MembershipCard() {
  const { profile, application, loading } = useApplicationForm();
  
  if (loading) {
    return (
      <div className="text-center py-5 text-muted">
        <div className="spinner-border spinner-border-sm text-primary me-2" role="status" />
        <span>Loading membership credentials...</span>
      </div>
    );
  }

  const firstName = profile?.firstName || application?.personal?.firstName || "Member";
  const lastName = profile?.lastName || application?.personal?.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim();
  
  // 	🏼 UPDATED: Pull official sequential Membership Number instead of the backend tracking string
  const membershipNumber = application?.membershipNumber || profile?.membershipNumber || "PENDING";
  const memberType = application?.personal?.membershipType || "Regular Member";

  const registrationTimestamp = application?.submittedAt || application?.updatedAt;
  
  const formatDateString = (rawDate) => {
    if (!rawDate) return new Date().toLocaleDateString('en-GB');
    const d = rawDate.toDate ? rawDate.toDate() : new Date(rawDate);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const getExpiryDateString = (rawDate) => {
    const d = rawDate.toDate ? rawDate.toDate() : new Date(rawDate || Date.now());
    d.setFullYear(d.getFullYear() + 1); 
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const issueDate = formatDateString(registrationTimestamp);
  const expiryDate = getExpiryDateString(registrationTimestamp);

  const handleDownloadCard = () => {
    window.print();
  };

  return (
    <div className={styles.wrapper}>
      <div id="physical-membership-card" className={styles.idCard}>
        <div className={styles.wavesBg} />
        
        <div className={styles.cardHeader}>
          <div className={styles.brand}>
            <i className="bi bi-compass-fill" />
            <div className={styles.brandText}>
              <h1>WEMPA</h1>
              <h2>Maritime Association</h2>
            </div>
          </div>
          <span className={styles.badge}>{memberType}</span>
        </div>

        <div className={styles.cardBody}>
          <div className={styles.avatar}>
            {firstName.charAt(0).toUpperCase()}
          </div>
          
          <div className={styles.metaGrid}>
            <div className={styles.metaGroup}>
              <label>CARDHOLDER</label>
              <strong>{fullName}</strong>
            </div>
            
            <div className={styles.metaGroup}>
              {/* 	🏼 UPDATED FIELD TEXT LABEL */}
              <label>MEMBERSHIP NO.</label>
              <strong className={styles.idValue}>{membershipNumber}</strong>
            </div>
          </div>
        </div>

        <div className={styles.cardFooter}>
          <div className={styles.dateBlock}>
            <label>ISSUED</label>
            <span>{issueDate}</span>
          </div>
          <div className={styles.dateBlock}>
            <label>EXPIRES</label>
            <span>{expiryDate}</span>
          </div>
          <div className={styles.watermark}>
            <i className="bi bi-shield-check" />
            <span>VERIFIED</span>
          </div>
        </div>
      </div>

      <button 
        type="button" 
        className={styles.downloadBtn}
        onClick={handleDownloadCard}
      >
        <i className="bi bi-download" />
        <span>Download Physical Card</span>
      </button>
    </div>
  );
}
