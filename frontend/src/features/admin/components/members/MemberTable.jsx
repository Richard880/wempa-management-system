import MemberStatusBadge from "./MemberStatusBadge";
import { Link } from "react-router-dom";

import ROUTES from "../../../../constants/routes";


function getMemberName(member) {
  const personal = member.personal || {};

  const fullName = [
    personal.firstName,
    personal.middleName,
    personal.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  return fullName || member.displayName || "Unnamed Member";
}


function getMemberEmail(member) {
  return (
    member.contact?.email ||
    member.email ||
    "—"
  );
}


function formatDate(timestamp) {
  if (!timestamp) {
    return "—";
  }

  if (typeof timestamp?.toDate === "function") {
    return timestamp
      .toDate()
      .toLocaleDateString();
  }

  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleDateString();
}


function MemberTable({
  members = [],
}) {
  if (!members.length) {
    return (
      <div className="card border-0 shadow-sm">
        <div className="card-body p-5 text-center">
          <i
            className="bi bi-people fs-1 text-muted d-block mb-3"
            aria-hidden="true"
          />

          <h5 className="mb-2">
            No members found
          </h5>

          <p className="text-muted mb-0">
            No members match the current filters.
          </p>
        </div>
      </div>
    );
  }


  return (
    <div className="card border-0 shadow-sm">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th className="ps-4">
                Member
              </th>

              <th>
                Membership No.
              </th>

              <th>
                Contact
              </th>

              <th>
                Status
              </th>

              <th>
                Joined
              </th>

              <th className="text-end pe-4">
                Actions
              </th>
            </tr>
          </thead>


          <tbody>
            {members.map((member) => {
              const memberName =
                getMemberName(member);

              const memberEmail =
                getMemberEmail(member);

              return (
                <tr key={member.id}>
                  {/* ==========================================
                      MEMBER
                      ========================================== */}
                  <td className="ps-4">
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="rounded-circle bg-light d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{
                          width: "42px",
                          height: "42px",
                        }}
                      >
                        <i
                          className="bi bi-person fs-5 text-muted"
                          aria-hidden="true"
                        />
                      </div>

                      <div>
                        <div className="fw-semibold">
                          {memberName}
                        </div>

                        <small className="text-muted">
                          {memberEmail}
                        </small>
                      </div>
                    </div>
                  </td>


                  {/* ==========================================
                      MEMBERSHIP NUMBER
                      ========================================== */}
                  <td>
                    <span className="fw-medium">
                      {member.membershipNumber || "—"}
                    </span>
                  </td>


                  {/* ==========================================
                      CONTACT
                      ========================================== */}
                  <td>
                    <div>
                      {member.contact?.phoneNumber || "—"}
                    </div>

                    {member.contact?.county && (
                      <small className="text-muted">
                        {member.contact.county}
                      </small>
                    )}
                  </td>


                  {/* ==========================================
                      STATUS
                      ========================================== */}
                  <td>
                    <MemberStatusBadge
                      status={member.membershipStatus}
                    />
                  </td>


                  {/* ==========================================
                      JOINED DATE
                      ========================================== */}
                  <td>
                    {formatDate(
                      member.joinedAt ||
                      member.approvedAt ||
                      member.createdAt
                    )}
                  </td>


                  {/* ==========================================
                      ACTIONS
                      ========================================== */}
                  <td className="text-end pe-4">
                    <Link
                        to={ROUTES.ADMIN_MEMBER_DETAILS.replace(
                            ":memberId",
                            member.id
                        )}
                        className="btn btn-sm btn-outline-primary"
                        >
                        <i
                            className="bi bi-eye me-1"
                            aria-hidden="true"
                        />

                        View
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}


export default MemberTable;