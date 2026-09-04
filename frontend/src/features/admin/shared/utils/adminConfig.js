// src/features/admin/shared/utils/adminConfig.js

/**
 * WEMPA Administration System Configuration Core
 * Central configuration for the administration workspace.
 */

import ROLES from "../../../../constants/roles";

export const ADMIN_ROLES = {
  SUPER_ADMIN: ROLES.SUPER_ADMIN,
  ADMIN: ROLES.ADMIN,
};

export const SIDEBAR_STRUCTURE = [
  {
    type: "link",
    label: "Dashboard",
    path: "/admin",
    icon: "bi-speedometer",
  },

  {
    type: "group",
    label: "Members Management",
    icon: "bi-people",
    id: "membersGroup",
    children: [
      {
        label: "All Members",
        path: "/admin/members",
      },
      {
        label: "Add Member",
        path: "/admin/members/new",
      },
      {
        label: "Categories",
        path: "/admin/members/categories",
      },
    ],
  },
  
  {
    type: "link",
    label: "Interested Parties",
    path: "/admin/interested-parties",
    icon: "bi-person-clock", // 🟢 HIGH-CONTRAST INDICATION ICON TOKEN
  },

  {
    type: "group",
    label: "Applications",
    icon: "bi-file-earmark-text",
    id: "applicationsGroup",
    children: [
      {
        label: "Pending Review",
        path: "/admin/applications?status=pending",
      },
      {
        label: "Approved",
        path: "/admin/applications?status=approved",
      },
      {
        label: "Rejected",
        path: "/admin/applications?status=rejected",
      },
    ],
  },

  {
    type: "group",
    label: "Financials & Revenue",
    icon: "bi-credit-card",
    id: "paymentsGroup",
    /* 🟢 REALIGNMENT TO YOUR NEW FINANCIALS DASHBOARD ROUTER: 
       Maps the nested array sub-paths straight to your operational /admin/financials view */
    children: [
      {
        label: "Transactions Ledger",
        path: "/admin/financials", // Points to the main table workspace
      },
      {
        label: "Pending Approvals",
        path: "/admin/financials?status=PENDING_VERIFICATION", // Forces instant filter matching
      },
    ],
  },

  {
    type: "link",
    label: "Events Engine",
    path: "/admin/events",
    icon: "bi-calendar-event",
  },

  {
    type: "link",
    label: "News & Media",
    path: "/admin/news",
    icon: "bi-newspaper",
  },

  // {
  //   type: "link",
  //   label: "Reports Generator",
  //   path: "/admin/reports",
  //   icon: "bi-graph-up",
  // },

  // {
  //   type: "link",
  //   label: "Credential Verification",
  //   path: "/admin/verification",
  //   icon: "bi-shield-check",
  // },

  {
    id: "admin-management",
    type: "link",
    label: "Admin Management",
    path: "/admin/management",
    icon: "bi-person-gear",
    allowedRoles: [ROLES.SUPER_ADMIN],
  },

  {
    id: "global-settings",
    type: "link",
    label: "Global Settings",
    path: "/admin/settings/general",
    icon: "bi-gear",
    allowedRoles: [ROLES.SUPER_ADMIN],
  },
];
