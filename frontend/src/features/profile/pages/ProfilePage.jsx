// src/features/profile/pages/ProfilePage.jsx
import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaPhone, FaBuilding, FaSignOutAlt, FaIdCard, FaMapMarkerAlt, FaAnchor, FaBriefcase, FaCalendarCheck } from "react-icons/fa";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import styles from "./ProfilePage.module.css";

export default function ProfilePage() {
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState("Authenticating...");

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      navigate("/login");
      return;
    }

    async function resolveUserProfile() {
      try {
        setLoading(true);
        
        // 1. Step A: Check the 'members' collection first (Full Application Records)
        const memberRef = doc(db, "members", currentUser.uid);
        const memberSnap = await getDoc(memberRef);
        
        if (memberSnap.exists()) {
          const data = memberSnap.data();
          
          const personal = data.personal || {};
          const contact = data.contact || {};
          const employment = data.employment || {};
          const docs = data.documents || {};

          const constructedName = [personal.firstName, personal.middleName, personal.lastName]
            .filter(Boolean)
            .join(" ");

          setProfile({
            fullName: constructedName || currentUser.displayName || "WEMPA Member",
            email: contact.email || currentUser.email,
            phone: contact.phoneNumber || "Not Provided",
            membershipNumber: personal.membershipNumber || "Pending Issuance",
            membershipType: data.payment?.membershipCategory || "Professional Member",
            organization: employment.employerName || "Independent Professional",
            jobTitle: employment.jobTitle || "Professional",
            specialization: employment.Specialization || "General Sector",
            experience: employment["Years Of Maritime Experience"] || "0",
            location: contact.physicalAddress || "Kenya",
            // 🟢 TIMESTAMP STANDARDIZATION: Normalizes Firebase timestamp variables safely
            joinedAt: data.createdAt || data.updatedAt || currentUser.metadata.creationTime,
            profileCompletion: data.profileCompletion || 0,
            // 🟢 PHOTO SYNC FIX: Target the double-nested "documents" object map accurately
            photoUrl: docs.passportPhoto?.downloadURL || docs.documents?.passportPhoto?.downloadURL || currentUser.photoURL || null
          });
          
          setDataSource("WEMPA Certified Membership Roster");
          return;
        }

        // 2. Step B: Fallback to check the basic 'users' registration collection
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          const data = userSnap.data();
          setProfile({
            fullName: data.fullName || data.name || currentUser.displayName || "WEMPA User",
            email: data.email || currentUser.email,
            phone: "Not Provided",
            membershipNumber: "Incomplete Application",
            membershipType: "Standard Registered Account",
            organization: "General Member",
            jobTitle: "Account Registered",
            specialization: "Not Configured",
            experience: "0",
            location: "Kenya",
            joinedAt: data.createdAt || currentUser.metadata.creationTime,
            profileCompletion: 0,
            photoUrl: currentUser.photoURL || null
          });
          setDataSource("Registered Accounts Directory");
          return;
        }

        // 3. Step C: Hard fallback directly to active browser Auth Token values
        setProfile({
          fullName: currentUser.displayName || "WEMPA User",
          email: currentUser.email,
          phone: "Not Provided",
          membershipNumber: "No Registry Found",
          membershipType: "Basic Account",
          organization: "Pending Profile Completion",
          jobTitle: "Guest Account",
          specialization: "Not Configured",
          experience: "0",
          location: "Kenya",
          joinedAt: currentUser.metadata.creationTime,
          profileCompletion: 0,
          photoUrl: currentUser.photoURL || null
        });
        setDataSource("Firebase Authentication Session Token");

      } catch (err) {
        console.error("Critical error parsing profile documents:", err);
      } finally {
        setLoading(false);
      }
    }

    resolveUserProfile();
  }, [auth, db, navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  /**
   * Helper function to format any variation of dates or Firestore Timestamps safely
   */
  /**
   * Helper function to format any variation of dates or Firestore Timestamps safely.
   * Handles native Firebase Timestamp class instances, ISO strings, and integer milliseconds.
   */
  const formatRegistrationDate = (dateValue) => {
    if (!dateValue) return "Recent Account";
    
    try {
      // 1. 🟢 FIRESTORE CLASS INSTANCE GUARD: Check if it's a native Timestamp class object
      if (typeof dateValue.toDate === "function") {
        return dateValue.toDate().toLocaleDateString("en-KE", {
          day: "numeric",
          month: "long",
          year: "numeric"
        });
      }

      // 2. Fallback check for plain serialized timestamp objects ({ seconds, nanoseconds })
      if (typeof dateValue === "object" && dateValue.seconds !== undefined) {
        return new Date(dateValue.seconds * 1000).toLocaleDateString("en-KE", {
          day: "numeric",
          month: "long",
          year: "numeric"
        });
      }

      // 3. Fallback check for standard ISO Strings, Date instances, or Millisecond numbers
      return new Date(dateValue).toLocaleDateString("en-KE", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    } catch (e) {
      console.warn("Date formatting fell back:", e);
      return "Recent Account";
    }
  };


  if (loading || !profile) {
    return (
      <div className={styles.loadingContainer}>
        <div className="spinner-border text-info mb-3" role="status" style={{ width: "3rem", height: "3rem" }} />
        <span className={styles.loadingText}>SYNCHRONIZING MARITIME REGISTRY PROFILE...</span>
      </div>
    );
  }

  // Extract initials for placeholder fallback avatars
  const initials = profile.fullName
    ? profile.fullName.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()
    : "WP";

  return (
    <div className={styles.profilePageWrapper}>
      <div className={styles.profileLayoutGrid}>
        
        {/* Left Side Column: Interactive Passport Photo Frame Panel */}
        <div className={styles.leftPane}>
          <div className={styles.passportCard}>
            <div className={styles.avatarContainer}>
              {profile.photoUrl ? (
                <img src={profile.photoUrl} alt="Passport Avatar" className={styles.avatarImage} />
              ) : (
                <span className={styles.avatarInitials}>{initials}</span>
              )}
            </div>
            
            <h4 className={styles.userName}>{profile.fullName}</h4>
            <div className={styles.membershipBadge}>
              <FaAnchor className="me-2" style={{ fontSize: "0.75rem" }} />
              <span>{profile.membershipType}</span>
            </div>
            
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>ID:</span>
              <span className={styles.metaValue}>{profile.membershipNumber}</span>
            </div>

            <div className={styles.progressContainer}>
              <div className={styles.progressHeader}>
                <span>File Sync Progress</span>
                <span>{Math.round(profile.profileCompletion || 0)}%</span>
              </div>
              <div className={styles.progressTrack}>
                <div className={styles.progressFill} style={{ width: `${profile.profileCompletion || 0}%` }} />
              </div>
            </div>

            <p className={styles.verifyFooter}>Account verified via {dataSource}</p>

            <button type="button" className={styles.signOutButton} onClick={handleLogout}>
              <FaSignOutAlt /> <span>Secure Sign Out</span>
            </button>
          </div>
        </div>

        {/* Right Side Column: Core Membership Metrics Details Card */}
        <div className={styles.rightPane}>
          <div className={styles.detailsCard}>
            <h3 className={styles.cardTitle}>Official Identification Details</h3>
            <p className={styles.cardSubtitle}>Verified credentials securely synchronized from the database registry.</p>
            
            <div className={styles.infoList}>
              {/* Row 1: Membership Number */}
              <div className={styles.infoItem}>
                <div className={`${styles.iconBox} ${styles.blueIcon}`}><FaIdCard /></div>
                <div className={styles.itemContent}>
                  <span className={styles.itemLabel}>Registry Membership ID</span>
                  <strong className={styles.itemValue}>{profile.membershipNumber}</strong>
                </div>
              </div>

              {/* Row 2: Full Name */}
              <div className={styles.infoItem}>
                <div className={`${styles.iconBox} ${styles.cyanIcon}`}><FaUser /></div>
                <div className={styles.itemContent}>
                  <span className={styles.itemLabel}>Full Legal Name</span>
                  <strong className={styles.itemValue}>{profile.fullName}</strong>
                </div>
              </div>

              {/* Row 3: Email Address */}
              <div className={styles.infoItem}>
                <div className={`${styles.iconBox} ${styles.tealIcon}`}><FaEnvelope /></div>
                <div className={styles.itemContent}>
                  <span className={styles.itemLabel}>Email Address</span>
                  <strong className={styles.itemValue}>{profile.email}</strong>
                </div>
              </div>

              {/* Row 4: Phone Number */}
              <div className={styles.infoItem}>

                <div className={`${styles.iconBox} ${styles.emeraldIcon}`}><FaPhone /></div>
                <div className={styles.itemContent}>
                  <span className={styles.itemLabel}>Contact Number</span>
                  <strong className={styles.itemValue}>{profile?.phone}</strong>
                </div>
              </div>

              {/* Row 5: Company Affiliation */}
              <div className={styles.infoItem}>
                <div className={`${styles.iconBox} ${styles.purpleIcon}`}><FaBuilding /></div>
                <div className={styles.itemContent}>
                  <span className={styles.itemLabel}>Organization / Company Affiliation</span>
                  <strong className={styles.itemValue}>{profile?.organization}</strong>
                </div>
              </div>

              {/* Row 6: Job Title (🟢 FIXED STRAY TAGS) */}
              <div className={styles.infoItem}>
                <div className={`${styles.iconBox} ${styles.indigoIcon}`}><FaBriefcase /></div>
                <div className={styles.itemContent}>
                  <span className={styles.itemLabel}>Professional Job Title</span>
                  <strong className={styles.itemValue}>{profile?.jobTitle || "Professional"}</strong>
                </div>
              </div>

              {/* Row 7: Base Location */}
              <div className={styles.infoItem}>
                <div className={`${styles.iconBox} ${styles.orangeIcon}`}><FaMapMarkerAlt /></div>
                <div className={styles.itemContent}>
                  <span className={styles.itemLabel}>Location / Base Station</span>
                  <strong className={styles.itemValue}>{profile?.location}</strong>
                </div>
              </div>

              {/* Row 8: Registration Date */}
              <div className={styles.infoItem}>
                <div className={`${styles.iconBox} ${styles.slateIcon}`}><FaCalendarCheck /></div>
                <div className={styles.itemContent}>
                  <span className={styles.itemLabel}>Registration Timestamp</span>
                  <strong className={styles.itemValue}>
                    {profile?.joinedAt && profile.joinedAt.seconds
                      ? new Date(profile.joinedAt.seconds * 1000).toLocaleDateString("en-KE", { day: "numeric", month: "long", year: "numeric" })
                      : profile?.joinedAt 
                        ? new Date(profile.joinedAt).toLocaleDateString("en-KE", { day: "numeric", month: "long", year: "numeric" })
                        : "Recent Account"
                    }
                  </strong>
                </div>
              </div>

            </div> {/* End of .infoList */}
          </div> {/* End of .detailsCard */}
        </div> {/* End of .rightPane */}

      </div> {/* End of .profileLayoutGrid */}
    </div> /* End of .profilePageWrapper (🟢 FIXED COMMENT TOKENS) */
  );
}
