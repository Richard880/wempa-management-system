import ROLES from "../../../../constants/roles";

function AdminRoleAction({
  selectedUser,
  mode,
  onConfirm,
  onCancel,
  loading = false,
  styles,
}) {
  if (!selectedUser) {
    return null;
  }

  const fullName =
    selectedUser.displayName ||
    [selectedUser.firstName, selectedUser.lastName]
      .filter(Boolean)
      .join(" ") ||
    selectedUser.email;

  const isPromotion = mode === "promote";

  const newRole = isPromotion
    ? ROLES.ADMIN
    : ROLES.MEMBER;

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    onConfirm({
      newRole,
      reason:
        formData.get("reason")?.trim() || "",
    });
  };

  return (
    <section className={styles.roleAction}>
      <h2 className={styles.roleActionTitle}>
        {isPromotion
          ? "Promote User to Admin"
          : "Revoke Admin Access"}
      </h2>

      <p className={styles.roleActionDescription}>
        {isPromotion
          ? `You are about to grant administrator access to ${fullName}.`
          : `You are about to remove administrator access from ${fullName}.`}
      </p>

      <form onSubmit={handleSubmit}>
        <div className={styles.reasonField}>
          <label
            className={styles.reasonLabel}
            htmlFor="admin-role-reason"
          >
            Reason
          </label>

          <textarea
            id="admin-role-reason"
            name="reason"
            className={`form-control ${styles.reasonTextarea}`}
            rows="4"
            placeholder="Enter a reason for this change"
            disabled={loading}
          />
        </div>

        <div className={styles.actionButtons}>
          <button
            type="submit"
            className={
              isPromotion
                ? "btn btn-primary"
                : "btn btn-danger"
            }
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : isPromotion
                ? "Confirm Promotion"
                : "Confirm Revocation"}
          </button>

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

export default AdminRoleAction;