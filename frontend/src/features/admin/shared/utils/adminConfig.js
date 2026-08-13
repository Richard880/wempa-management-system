/**
 * WEMPA Administration System Configuration Core
 * Designed for easy multi-tenant and corporate white-label re-branding.
 */

/**
 * WEMPA Administration System Configuration Core
 *
 * Central configuration for the administration workspace.
 * Role definitions remain centralized in src/constants/roles.js.
 */

import ROLES from "../../../../constants/roles";

export const ADMIN_ROLES = {
  SUPER_ADMIN: ROLES.SUPER_ADMIN,
  ADMIN: ROLES.ADMIN,
};

export const SIDEBAR_STRUCTURE = [
  {
    type: 'link',
    label: 'Dashboard',
    path: '/admin',
    icon: 'bi-speedometer2',
  },
  {
    type: 'group',
    label: 'Members Management',
    icon: 'bi-people',
    id: 'membersGroup',
    children: [
      { label: 'All Members', path: '/admin/members' },
      { label: 'Add Member', path: '/admin/members/new' },
      { label: 'Categories', path: '/admin/members/categories' }
    ]
  },
  {
    type: 'group',
    label: 'Applications',
    icon: 'bi-file-earmark-text',
    id: 'applicationsGroup',
    children: [
      { label: 'Pending Review', path: '/admin/applications?status=pending' },
      { label: 'Approved', path: '/admin/applications?status=approved' },
      { label: 'Rejected', path: '/admin/applications?status=rejected' }
    ]
  },
  {
    type: 'group',
    label: 'Financials',
    icon: 'bi-credit-card',
    id: 'paymentsGroup',
    children: [
      { label: 'Transactions', path: '/admin/payments' },
      { label: 'Pending Approvals', path: '/admin/payments?status=pending' },
      { label: 'Revenue Analytics', path: '/admin/payments/revenue' }
    ]
  },
  {
    type: 'link',
    label: 'Events Engine',
    path: '/admin/events',
    icon: 'bi-calendar-event',
  },
  {
    type: 'link',
    label: 'News & Media',
    path: '/admin/news',
    icon: 'bi-newspaper',
  },
  {
    type: 'link',
    label: 'Reports Generator',
    path: '/admin/reports',
    icon: 'bi-graph-up',
  },
  {
    type: 'link',
    label: 'Credential Verification',
    path: '/admin/verification',
    icon: 'bi-shield-check',
  },
  {
    type: 'link',
    label: 'Global Settings',
    path: '/admin/settings',
    icon: 'bi-gear',
  }
];
