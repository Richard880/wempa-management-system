// src/constants/routes.js

const ROUTES = {
  /* ==========================================
   * Public Routes
   * ========================================== */
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  VERIFY_EMAIL: "/verify-email",
  PUBLIC_NEWS_DETAIL: "/news/:newsId",
  PUBLIC_PROFILE: "/profile/:userId", // Added for viewing member directories publicly if needed
      
  /* ==========================================
   * Member Routes
   * ========================================== */
  MEMBER_DASHBOARD: "/member",
  MEMBER_APPLICATION: "/member/application",
  MEMBER_PROFILE: "/member/profile",
  MEMBER_SETTINGS: "/member/settings",
  MEMBER_CARD: "/member/card",

  /* ==========================================
   * Admin Routes
   * ========================================== */
  ADMIN_DASHBOARD: "/admin",
  ADMIN_PROFILE: "/admin/profile", // Added so admins can manage their own profile details separate from members

  ADMIN_MEMBERS: "/admin/members",
  ADMIN_MEMBER_NEW: "/admin/members/new",
  ADMIN_MEMBER_CATEGORIES: "/admin/members/categories",
  ADMIN_MEMBER_DETAILS: "/admin/members/:memberId",
  ADMIN_INTERESTED_PARTIES: "/admin/interested-parties",

  ADMIN_APPLICATIONS: "/admin/applications",
  ADMIN_APPLICATION_REVIEW: "/admin/applications/:applicationId",

  ADMIN_MANAGEMENT: "/admin/management",

  /* ==========================================
   * Admin Events Management Routes
   * ========================================== */
  ADMIN_EVENTS: "/admin/events",
  ADMIN_EVENTS_NEW: "/admin/events/new",
  ADMIN_EVENTS_EDIT: "/admin/events/edit/:eventId",

  /* ==========================================
   * Admin News Management Routes
   * ========================================== */
  ADMIN_NEWS: "/admin/news",
  ADMIN_NEWS_NEW: "/admin/news/new",
  ADMIN_NEWS_EDIT: "/admin/news/edit/:newsId", 

 /* ==========================================
   * Admin Financials Routes
   * ========================================== */
  ADMIN_FINANCIALS: "/admin/financials", 
  ADMIN_FINANCIALS_DETAIL: "/admin/financials/:applicationId", 


 /* ==========================================
   * Admin Settings Routes
   * ========================================== */

   ADMIN_SETTINGS: '/admin/settings',
  ADMIN_SETTINGS_GENERAL: '/admin/settings/general',

  /* ==========================================
   * Miscellaneous
   * ========================================== */
  NOT_FOUND: "*",
};

export default ROUTES;
