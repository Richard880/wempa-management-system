import ROLES from "../../../../constants/roles";

function AdminListItem({
  admin,
  onRevoke,
  disabled = false,
}) {
  const isSuperAdmin =
    admin.role === ROLES.SUPER_ADMIN;

  const fullName =
    admin.displayName ||
    [admin.firstName, admin.lastName]
      .filter(Boolean)
      .join(" ") ||
    admin.email;

  return (
    <tr>
      <td>{fullName}</td>

      <td>{admin.email}</td>

      <td>
        {isSuperAdmin
          ? "Super Admin"
          : "Admin"}
      </td>

      <td>
        {!isSuperAdmin && (
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={() => onRevoke(admin)}
            disabled={disabled}
          >
            Revoke Admin
          </button>
        )}
      </td>
    </tr>
  );
}

export default AdminListItem;