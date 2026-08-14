import { useMemo } from "react";

import { useAuth } from "../../../auth/hooks/useAuth";


/* ==========================================
   HELPERS
========================================== */

function getAdminName(user) {
  if (user?.displayName?.trim()) {
    return user.displayName.trim();
  }

  if (user?.name?.trim()) {
    return user.name.trim();
  }

  if (user?.email) {
    return user.email.split("@")[0];
  }

  return "Administrator";
}


function getInitials(name) {
  if (!name) {
    return "A";
  }

  const nameParts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (nameParts.length === 0) {
    return "A";
  }

  if (nameParts.length === 1) {
    return nameParts[0]
      .slice(0, 2)
      .toUpperCase();
  }

  return `${nameParts[0][0]}${nameParts[
    nameParts.length - 1
  ][0]}`.toUpperCase();
}


/* ==========================================
   ADMIN PROFILE
========================================== */

function AdminProfile() {
  const { user } = useAuth();


  const adminName = useMemo(
    () => getAdminName(user),
    [user]
  );


  const initials = useMemo(
    () => getInitials(adminName),
    [adminName]
  );


  const photoURL = user?.photoURL?.trim();


  return (
    <div className="d-flex align-items-center gap-2">
      {/* ==========================================
          AVATAR
      ========================================== */}

      <div
        className="rounded-circle overflow-hidden bg-primary text-white d-flex align-items-center justify-content-center flex-shrink-0"
        style={{
          width: "40px",
          height: "40px",
        }}
        aria-label={`${adminName} profile`}
      >
        {photoURL ? (
          <img
            src={photoURL}
            alt={`${adminName} profile`}
            className="w-100 h-100 object-fit-cover"
          />
        ) : (
          <span
            className="fw-semibold"
            aria-hidden="true"
          >
            {initials}
          </span>
        )}
      </div>


      {/* ==========================================
          ADMIN NAME
      ========================================== */}

      <div className="d-none d-md-block text-start">
        <p className="mb-0 fw-semibold text-dark">
          {adminName}
        </p>

        <small className="text-muted">
          Administrator
        </small>
      </div>
    </div>
  );
}


export default AdminProfile;