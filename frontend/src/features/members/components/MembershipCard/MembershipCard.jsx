// src/features/members/components/MembershipCard/MembershipCard.jsx
import useApplicationForm from "../../../memberApplication/hooks/useApplicationForm"; 
import { FaUser, FaCompass, FaShieldAlt } from "react-icons/fa";
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

  // Fallback string configurations matching dynamic profile properties
  const firstName = profile?.firstName || application?.personal?.firstName || "Member";
  const lastName = profile?.lastName || application?.personal?.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim();
  
  // Official sequential Membership Number alignment
  const membershipNumber = application?.personal?.membershipNumber || application?.membershipNumber || profile?.membershipNumber || "PENDING";
  
  // Queries the identical payment sub-map node committed during your step 6 onboarding phase
  const memberType = application?.payment?.membershipCategory || application?.personal?.membershipType || "Regular Member";

  // Dynamic Passport Picture Asset Sync Pathway (Drills past double-nested maps safely)
  const passportPhotoUrl = 
    application?.documents?.documents?.passportPhoto?.downloadURL || 
    application?.documents?.passportPhoto?.downloadURL || 
    application?.passportPhoto?.downloadURL ||
    profile?.photoUrl ||
    null;

  const registrationTimestamp = application?.payment?.submittedAt || application?.submittedAt || application?.updatedAt;
  
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

  /* ==========================================================================
      Milford Data Extraction & QR Resolution Tracks
     ========================================================================== */
  const targetUid = application?.id || profile?.id || null;
  const activeDomain = window.location.origin; 
  const publicProfileUrl = targetUid ? `${activeDomain}/profile/${targetUid}` : "";
  const encodedUrl = encodeURIComponent(publicProfileUrl);

  // Active secure endpoint configuration
  // const qrCodeAssetSource = targetUid 
  //   ? `https://qrserver.com{encodedUrl}&margin=0`
  //   : null;

  return (
    <div className={styles.wrapper}>
      <div id="physical-membership-card" className={styles.idCard}>
        <div className={styles.wavesBg} />
        
        {/* CARD HEADER */}
        <div className={styles.cardHeader}>
          <div className={styles.brand}>
            <FaCompass className="fs-4 text-primary" />
            <div className={styles.brandText}>
              <h1>WEMPA</h1>
              <h2>Maritime Association</h2>
            </div>
          </div>
          <span className={styles.badge}>{memberType}</span>
        </div>

        {/* CARD BODY */}
        <div className={styles.cardBody}>
          {/* AVATAR PICTURE BOX */}
          <div className={`${styles.avatar} overflow-hidden border bg-light d-flex align-items-center justify-content-center flex-shrink-0`}>
            {passportPhotoUrl ? (
              <img 
                src={passportPhotoUrl} 
                alt={`${fullName} identification`} 
                className="w-100 h-100 object-fit-cover"
                style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <span className="text-secondary fw-bold fs-4">
                {firstName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          
          {/* PROFILE TEXT FIELDS GRID */}
          <div className={styles.metaGrid}>
            <div className={styles.metaGroup}>
              <label>CARDHOLDER</label>
              <strong className="text-truncate" style={{ maxWidth: "150px", display: "block" }}>{fullName}</strong>
            </div>
            
            <div className={styles.metaGroup}>
              <label>MEMBERSHIP NO.</label>
              <strong className={styles.idValue}>{membershipNumber}</strong>
            </div>
          </div>

          {/* ==========================================================
              🟢 GLITCH-FREE QR CODE VERIFICATION BOX MODULE
              Replaced loose components with a hardened persistent wrapper box
              ========================================================== */}
          {/* <div className={styles.qrContainer} title={targetUid ? `Scan to verify: ${publicProfileUrl}` : "Verifying details..."}>
            {qrCodeAssetSource ? (
              <img 
                src={qrCodeAssetSource} 
                alt="Member Profile Verification QR Code" 
                className={styles.qrImage}
                style={{ display: "block" }}
                onError={(e) => {
                  console.warn("QR Code failover engaged.");
                  e.target.src = `https://quickchart.io{encodedUrl}&size=150&margin=0`;
                }}
              />
            ) : (
               🟢 CLIENT-SIDE INTERACTIVE SVG SKELETON PLACEHOLDER:
                 Mounts instantly with zero network network requests, preventing layout jumps or glitches! 
              <svg 
                className={styles.qrLoaderSvg} 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM21 21v-3a2 2 0 0 0-2-2h-3M21 15h-3M15 21v-3" />
              </svg>
            )}
          </div>*/}
        </div> 

        {/* CARD FOOTER */}
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
            <FaShieldAlt className="text-success" />
            <span>VERIFIED</span>
          </div>
        </div>
      </div>
    </div>
  );
}
