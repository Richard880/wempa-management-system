/*
|--------------------------------------------------------------------------
| Membership Status
|--------------------------------------------------------------------------
|
| Official membership lifecycle statuses.
| Used by administrators and the member
| management system.
|
*/

const MEMBERSHIP_STATUS = {
  PENDING: "pending",

  ACTIVE: "active",

  SUSPENDED: "suspended",

  EXPIRED: "expired",

  REJECTED: "rejected",

  TERMINATED: "terminated",

  INACTIVE: "inactive",
};

export default MEMBERSHIP_STATUS;