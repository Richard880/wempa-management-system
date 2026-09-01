// src/features/admin/components/AdminProfile/AdminProfile.jsx
import { useMemo, useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../../auth/hooks/useAuth";

/* ==========================================================================
   HELPERS (Hardened with clean mapping fallbacks)
   ========================================================================== */
function getAdminName(currentUser, databaseProfile) {
  if (databaseProfile?.fullName?.trim()) return databaseProfile.fullName.trim();
  if (databaseProfile?.name?.trim()) return databaseProfile.name.trim();
  
  const personal = databaseProfile?.personal || {};
  if (personal.firstName) {
    return [personal.firstName, personal.middleName, personal.lastName]
      .filter(Boolean)
      .join(" ");
  }
  
  if (currentUser?.displayName?.trim()) return currentUser.displayName.trim();
  if (currentUser?.email) return currentUser.email.split("@")[0];
  return "Administrator";
}

function getInitials(name) {
  if (!name) return "A";
  const nameParts = name.trim().split(/\s+/).filter(Boolean);
  if (nameParts.length === 0) return "A";
  if (nameParts.length === 1) return nameParts[0].slice(0, 2).toUpperCase();
  return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
}

/* ==========================================================================
   ADMIN PROFILE COMPONENT LAYER
   ========================================================================== */
export default function AdminProfile() {
  const { auth } = useAuth(); 
  const db = getFirestore();
  
  const [dbProfile, setDbProfile] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentUser = auth?.currentUser || auth?.user || null;
  const activeUid = currentUser?.uid;

  useEffect(() => {
    if (!activeUid) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    async function fetchAdminMetadata() {
      try {
        const userRef = doc(db, "users", activeUid);
        const adminRef = doc(db, "admins", activeUid);
        const memberRef = doc(db, "members", activeUid);

        // Fetch snapshots across all relevant collections concurrently
        const [userSnap, adminSnap, memberSnap] = await Promise.all([
          getDoc(userRef),
          getDoc(adminRef),
          getDoc(memberRef)
        ]);

        if (!isMounted) return;

        let compiledProfileData = {};
        let targetUrl = null;

        // 1. Unpack basic user and admin details
        if (userSnap.exists()) {
          compiledProfileData = { ...userSnap.data() };
        }
        
        if (adminSnap.exists()) {
          compiledProfileData = { ...compiledProfileData, ...adminSnap.data() };
        }

        // 2. Drill explicitly into the deep nested member document tree
        if (memberSnap.exists()) {
          const memberData = memberSnap.data();
          compiledProfileData = { ...compiledProfileData, ...memberData };

          const docsNode = memberData.documents || {};
          targetUrl = 
            docsNode.passportPhoto?.downloadURL || 
            docsNode.documents?.passportPhoto?.downloadURL || 
            memberData.passportPhoto?.downloadURL ||
            null;
        }

        // 3. Fallback checks for flat keys or fallback tokens
        if (!targetUrl && compiledProfileData) {
          targetUrl = compiledProfileData.photoUrl || compiledProfileData.photoURL || null;
        }
        if (!targetUrl && currentUser?.photoURL) {
          targetUrl = currentUser.photoURL;
        }

        // Commit all resolved nodes to state parameters at once
        setDbProfile(compiledProfileData);
        setPhotoUrl(targetUrl);
      } catch (err) {
        console.error("Failed to dynamically sync administrative roster nodes:", err);
      } finally {
        if (isMounted) {
          setLoading(false); // Clear the loading state flag only when the data is fully populated
        }
      }
    }

    fetchAdminMetadata();

    return () => {
      isMounted = false;
    };
  }, [activeUid, db, currentUser?.photoURL]);

  const adminName = useMemo(
    () => getAdminName(currentUser, dbProfile),
    [currentUser, dbProfile]
  );

  const initials = useMemo(
    () => getInitials(adminName),
    [adminName]
  );

  const userRole = dbProfile?.role || currentUser?.role || auth?.profile?.role || "admin";
  const displayRoleLabel = userRole === "super_admin" ? "Super Admin" : "System Administrator";

  return (
    <div 
      className="d-inline-flex align-items-center position-relative admin-profile-container"
      style={{ minWidth: "160px", minHeight: "42px" }}
    >
      {/* 🟢 STEP 1: PERSISTENT SKELETON PLACEHOLDER CARD 
          Fades out cleanly without causing layout shifts or elements to jump on load */}
      <div 
        className="d-flex align-items-center gap-2 position-absolute top-50 start-0 translate-middle-y w-100"
        style={{
          transition: "opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          opacity: loading ? 1 : 0,
          pointerEvents: loading ? "auto" : "none",
          zIndex: loading ? 2 : 0
        }}
      >
        <div 
          className="rounded-circle placeholder-glow bg-secondary-subtle" 
          style={{ width: "40px", height: "40px", animation: "pulse 1.5s infinite" }} 
        />
        <div className="d-none d-md-flex flex-column gap-1 text-start">
          <div className="bg-secondary-subtle rounded" style={{ width: "85px", height: "12px" }} />
          <div className="bg-secondary-subtle rounded" style={{ width: "55px", height: "8px" }} />
        </div>
      </div>

      {/* ==========================================================================
          🟢 STEP 2: PERSISTENT DYNAMIC AVATAR & METADATA CONTENT PANEL 
          Fades in smoothly only when all background asset parameters have fully loaded
          ========================================================================== */}
      <div 
        className="d-flex align-items-center gap-2 w-100"
        style={{
          transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          opacity: loading ? 0 : 1,
          transform: loading ? "translateY(2px)" : "translateY(0)",
          pointerEvents: loading ? "none" : "auto",
          zIndex: loading ? 0 : 1
        }}
      >
        {/* AVATAR BOX HOUSING */}
        <div
          className="rounded-circle overflow-hidden d-flex align-items-center justify-content-center flex-shrink-0"
          style={{
            width: "40px",
            height: "40px",
            background: "linear-gradient(135deg, #f28a2b 0%, #e0761b 100%)", 
            border: "2px solid #ffffff",
            boxShadow: "0 2px 8px rgba(15, 23, 42, 0.06)",
          }}
          aria-label={`${adminName} profile`}
        >
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={`${adminName} profile`}
              className="w-100 h-100 object-fit-cover"
              style={{ display: "block", borderRadius: "50%" }}
              onError={(e) => {
                console.warn("Avatar image failed to load, falling back to initials.");
                e.target.style.display = "none";
                const sibling = e.target.parentElement.querySelector('.fallback-initials');
                if (!sibling) {
                  e.target.insertAdjacentHTML('afterend', `<span class="fw-bold text-white fallback-initials">${initials}</span>`);
                }
              }}
            />
          ) : (
            <span
              className="fw-bold text-white font-monospace"
              aria-hidden="true"
              style={{ fontSize: "0.9rem", letterSpacing: "0.5px" }}
            >
              {initials}
            </span>
          )}
        </div>

        {/* TEXT DETAILS MODULE TRACK */}
        <div className="d-none d-md-block text-start" style={{ lineHeight: "1.3" }}>
          <p className="mb-0 fw-bold text-dark" style={{ fontSize: "0.875rem", color: "#0f172a" }}>
            {adminName}
          </p>
          <small className="text-muted fw-bold" style={{ fontSize: "0.7rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            {displayRoleLabel}
          </small>
        </div>
      </div>

    </div>
  );
}
