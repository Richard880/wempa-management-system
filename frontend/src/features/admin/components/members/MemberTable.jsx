// src/features/admin/components/members/MemberTable.jsx
import PropTypes from "prop-types";
import MemberStatusBadge from "./MemberStatusBadge";
import { Link } from "react-router-dom";
import { FaUser, FaEye } from "react-icons/fa";
import ROUTES from "../../../../constants/routes";

function formatDate(timestamp) {
  if (!timestamp) {
    return "—";
  }

  if (typeof timestamp?.toDate === "function") {
    return timestamp.toDate().toLocaleDateString("en-KE", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  }

  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleDateString("en-KE", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function MemberTable({ members = [] }) {
  if (!members || !members.length) {
    return (
      <div className="card border-0 shadow-sm bg-white rounded-3">
        <div className="card-body p-5 text-center">
          <i
            className="bi bi-people fs-1 text-muted d-block mb-3"
            aria-hidden="true"
          />
          <h5 className="fw-bold text-dark mb-2">No members found</h5>
          <p className="text-muted small mb-0">
            No registered members match the selected filter criteria.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light text-uppercase fs-7" style={{ letterSpacing: "0.5px" }}>
          <tr>
            <th scope="col" className="ps-4 text-secondary fw-bold">Member & Email</th>
            <th scope="col" className="text-secondary fw-bold">Membership No.</th>
            <th scope="col" className="text-secondary fw-bold">Contact & Location</th>
            <th scope="col" className="text-secondary fw-bold">Status</th>
            <th scope="col" className="text-secondary fw-bold">Joined</th>
            <th scope="col" className="text-end pe-4 text-secondary fw-bold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {members.map((member) => {
            // Read pre-extracted and memoized values from parent sanitizer array
            const displayName = member.memberName;
            const membershipID = member.membershipNumber;
            const emailAddress = member.emailAddress;

            // Extract custom passport photo securely from documents mapping paths fallback 
            const documentsNode = member.documents || {};
            const passportUrl = 
              documentsNode.passportPhoto?.downloadURL || 
              documentsNode.documents?.passportPhoto?.downloadURL || 
              member.passportPhoto?.downloadURL ||
              member.photoUrl || 
              null;

            return (
              <tr key={member.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                {/* MEMBER AVATAR FRAME AND ACCOUNT METADATA */}
                <td className="ps-4 py-3">
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="rounded-circle overflow-hidden d-flex align-items-center justify-content-center flex-shrink-0 bg-light border"
                      style={{
                        width: "42px",
                        height: "42px",
                        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.03)"
                      }}
                    >
                      {passportUrl ? (
                        <img
                          src={passportUrl}
                          alt={`${displayName} profile`}
                          className="w-100 h-100 object-fit-cover"
                        />
                      ) : (
                        <FaUser className="text-muted" style={{ fontSize: "1.1rem" }} />
                      )}
                    </div>

                    <div>
                      <div className="fw-bold text-dark mb-0.5" style={{ fontSize: "0.9375rem" }}>
                        {displayName}
                      </div>
                      <small className="text-muted font-monospace" style={{ fontSize: "0.8rem" }}>
                        {emailAddress}
                      </small>
                    </div>
                  </div>
                </td>

                {/* MEMBERSHIP ID SPECIFIC BADGE CELL */}
                <td>
                  <span 
                    className="badge bg-light text-secondary font-monospace border fw-bold text-xs"
                    style={{ letterSpacing: "0.2px", padding: "0.3rem 0.6rem" }}
                  >
                    {membershipID}
                  </span>
                </td>

                {/* CONTACT DETAILS & COUNTY BASE SECTION */}
                <td>
                  <div className="text-dark fw-medium font-monospace" style={{ fontSize: "0.85rem" }}>
                    {member.contact?.phoneNumber || "—"}
                  </div>
                  {member.contact?.physicalAddress && (
                    <small className="text-muted fw-semibold">
                      {member.contact.physicalAddress}
                    </small>
                  )}
                </td>

                {/* REGULATORY STATUS STATE INDICATORS */}
                <td>
                  <MemberStatusBadge status={member.membershipStatus} />
                </td>

                {/* JOINED TIMESTAMP */}
                <td className="text-secondary small font-monospace">
                  {formatDate(member.joinedAt || member.approvedAt || member.createdAt)}
                </td>

                {/* INTERACTIVE NAVIGATION CONTROL */}
                <td className="text-end pe-4">
                  <Link
                    to={ROUTES.ADMIN_MEMBER_DETAILS.replace(
                      ":memberId",
                      member.id
                    )}
                    className="btn btn-sm btn-primary fw-bold px-3 d-inline-flex align-items-center gap-1.5"
                    style={{ borderRadius: "8px", fontSize: "0.8125rem", padding: "0.45rem 1rem" }}
                  >
                    <FaEye style={{ fontSize: "0.85rem" }} />
                    View Profile
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

MemberTable.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      memberName: PropTypes.string,
      membershipNumber: PropTypes.string,
      emailAddress: PropTypes.string,
      membershipStatus: PropTypes.string,
      contact: PropTypes.shape({
        phoneNumber: PropTypes.string,
        physicalAddress: PropTypes.string,
      }),
      joinedAt: PropTypes.any,
      approvedAt: PropTypes.any,
      createdAt: PropTypes.any,
    })
  ),
};

export default MemberTable;
