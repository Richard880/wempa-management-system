import { useState } from "react";

import ROLES from "../../../../constants/roles";

import useAdminManagement from "../../hooks/useAdminManagement";

import AdminManagementHeader from "../../components/adminManagement/AdminManagementHeader";
import AdminList from "../../components/adminManagement/AdminList";
import UserSearch from "../../components/adminManagement/UserSearch";
import AdminRoleAction from "../../components/adminManagement/AdminRoleAction";

import styles from "./AdminManagementPage.module.css";

function AdminManagementPage() {
  const {
    admins,
    users,
    loadingAdmins,
    loadingUsers,
    updatingRole,
    error,
    searchUsers,
    updateUserRole,
    clearError,
  } = useAdminManagement();

  const [selectedUser, setSelectedUser] = useState(null);
  const [actionMode, setActionMode] = useState(null);

  const handleSearch = async (searchTerm) => {
    clearError();

    try {
      await searchUsers(searchTerm);
    } catch {
      // Error is already handled by useAdminManagement.
    }
  };

  const handleSelectUser = (user) => {
    clearError();

    if (user.role === ROLES.SUPER_ADMIN) {
      return;
    }

    setSelectedUser(user);

    if (user.role === ROLES.ADMIN) {
      setActionMode("revoke");
      return;
    }

    setActionMode("promote");
  };

  const handleRevokeAdmin = (admin) => {
    clearError();

    if (admin.role === ROLES.SUPER_ADMIN) {
      return;
    }

    setSelectedUser(admin);
    setActionMode("revoke");
  };

  const handleConfirmRoleAction = async ({
    newRole,
    reason,
  }) => {
    if (!selectedUser) {
      return;
    }

    clearError();

    try {
      await updateUserRole({
        targetUserId: selectedUser.id,
        newRole,
        reason,
      });

      setSelectedUser(null);
      setActionMode(null);
    } catch {
      // Error is already handled by useAdminManagement.
    }
  };

  const handleCancelRoleAction = () => {
    if (updatingRole) {
      return;
    }

    clearError();
    setSelectedUser(null);
    setActionMode(null);
  };

  return (
    <section className={styles.adminManagementPage}>
      <AdminManagementHeader styles={styles} />

      {error && (
        <div
          className={`alert alert-danger ${styles.alert}`}
          role="alert"
        >
          {error}
        </div>
      )}

      <div className={styles.content}>
        <div className={styles.card}>
          <AdminList
            admins={admins}
            loading={loadingAdmins}
            onRevoke={handleRevokeAdmin}
            disabled={updatingRole}
            styles={styles}
          />
        </div>

        <div className={styles.card}>
          <UserSearch
            users={users}
            loading={loadingUsers}
            onSearch={handleSearch}
            onSelectUser={handleSelectUser}
            disabled={updatingRole}
            styles={styles}
          />
        </div>

        <AdminRoleAction
          selectedUser={selectedUser}
          mode={actionMode}
          onConfirm={handleConfirmRoleAction}
          onCancel={handleCancelRoleAction}
          loading={updatingRole}
          styles={styles}
        />
      </div>
    </section>
  );
}

export default AdminManagementPage;