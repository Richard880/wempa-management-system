import MemberStatusBadge from "./MemberStatusBadge";


/* ==========================================
   Date Formatter
========================================== */

function formatAuditDate(timestamp) {
  if (!timestamp) {
    return "—";
  }

  try {
    const date =
      typeof timestamp?.toDate === "function"
        ? timestamp.toDate()
        : new Date(timestamp);

    if (Number.isNaN(date.getTime())) {
      return "—";
    }

    return new Intl.DateTimeFormat(
      "en-KE",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    ).format(date);
  } catch {
    return "—";
  }
}


/* ==========================================
   Audit Field
========================================== */

function AuditField({ label, children }) {
  return (
    <div className="col-md-6 mb-4">
      <p className="text-muted small fw-semibold text-uppercase mb-1">
        {label}
      </p>

      <div className="mb-0">
        {children}
      </div>
    </div>
  );
}


/* ==========================================
   Membership Status Audit
========================================== */

function MembershipStatusAudit({ audit }) {
  if (!audit) {
    return (
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="d-flex align-items-center gap-2 mb-2">
            <i
              className="bi bi-clock-history fs-5"
              aria-hidden="true"
            />

            <h2 className="h5 fw-bold mb-0">
              Membership Status Audit
            </h2>
          </div>

          <p className="text-muted mb-0">
            No membership status changes have been recorded yet.
          </p>
        </div>
      </div>
    );
  }


  const {
    previousStatus,
    newStatus,
    reason,
    changedByName,
    changedByEmail,
    changedAt,
  } = audit;


  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body p-4">
        <div className="d-flex align-items-center gap-2 mb-4">
          <i
            className="bi bi-clock-history fs-5"
            aria-hidden="true"
          />

          <div>
            <h2 className="h5 fw-bold mb-1">
              Membership Status Audit
            </h2>

            <p className="text-muted mb-0">
              Details of the latest membership status change.
            </p>
          </div>
        </div>


        <div className="row">
          {/* Previous Status */}

          <AuditField label="Previous Status">
            {previousStatus ? (
              <MemberStatusBadge
                status={previousStatus}
              />
            ) : (
              "—"
            )}
          </AuditField>


          {/* New Status */}

          <AuditField label="New Status">
            {newStatus ? (
              <MemberStatusBadge
                status={newStatus}
              />
            ) : (
              "—"
            )}
          </AuditField>


          {/* Reason */}

          <AuditField label="Reason">
            <p className="mb-0">
              {reason || "—"}
            </p>
          </AuditField>


          {/* Administrator */}

          <AuditField label="Changed By">
            <p className="mb-1">
              {changedByName || "—"}
            </p>

            {changedByEmail && (
              <p className="text-muted small mb-0">
                {changedByEmail}
              </p>
            )}
          </AuditField>


          {/* Date */}

          <AuditField label="Date and Time">
            {formatAuditDate(changedAt)}
          </AuditField>
        </div>
      </div>
    </div>
  );
}


export default MembershipStatusAudit;