import AdminListItem from "./AdminListItem";

function AdminList({
  admins = [],
  loading = false,
  onRevoke,
  disabled = false,
  styles,
}) {
  if (loading) {
    return <p>Loading administrators...</p>;
  }

  return (
    <section>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          Current Administrators
        </h2>
      </div>

      {admins.length === 0 ? (
        <p>No administrators were found.</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={`table ${styles.adminTable}`}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th className={styles.actionColumn}>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {admins.map((admin) => (
                <AdminListItem
                  key={admin.id}
                  admin={admin}
                  onRevoke={onRevoke}
                  disabled={disabled}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default AdminList;