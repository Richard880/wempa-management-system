function AdminManagementHeader({ styles }) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        Admin Management
      </h1>

      <p className={styles.description}>
        Manage administrator access and review users with
        administrative privileges.
      </p>
    </header>
  );
}

export default AdminManagementHeader;