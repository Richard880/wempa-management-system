/*
|--------------------------------------------------------------------------
| Application Status
|--------------------------------------------------------------------------
|
| Centralized application lifecycle statuses.
| These values should be used throughout the
| application instead of hardcoded strings.
|
*/

const APPLICATION_STATUS = {
  DRAFT: "draft",

  IN_PROGRESS: "in_progress",

  SUBMITTED: "submitted",

  UNDER_REVIEW: "under_review",

  APPROVED: "approved",

  REJECTED: "rejected",

  RETURNED: "returned",

  CANCELLED: "cancelled",
};

export default APPLICATION_STATUS;