
import useApplicationForm from "../../../memberApplication/hooks/useApplicationForm"; // Kept relative path intact
import Spinner from "../../../../components/ui/Spinner"; // Escapes 4 levels up to root components folder

// FIX: Added an extra layer of step-backs (../../../) to target your global components folder correctly
import DashboardStats from "../../components/DashboardStats";
import ProfileSummary from "../../components/ProfileSummary";
import MembershipCard from "../../components/MembershipCard";
import QuickActions from "../../components/QuickActions";
import RecentActivity from "../../components/RecentActivity";
import NotificationPanel from "../../components/NotificationPanel";

import styles from "./Dashboard.module.css"; // Double check that this file is capitalized 'Dashboard.module.css'

export default function Dashboard() {
  const { 
    profile, 
    application, 
    loading, 
    progress, 
    isLocked, 
    error 
  } = useApplicationForm();

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <Spinner size="lg" label="Syncing secure dashboard profile matrix..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorAlert}>
        <i className="fas fa-exclamation-triangle me-2"></i>
        <span>Failed to sync profile: {error}</span>
      </div>
    );
  }

  return (
    <main className={styles.mainContainer}>
      {/* Dashboard Section Header */}
      <header className={styles.dashboardHeader}>
        <div>
          <h1 className={styles.title}>Member Dashboard</h1>
          <p className={styles.subtitle}>
            Welcome back to the WEMPA portal, {profile?.firstName || "Member"}. Track your profile, activities, and status.
          </p>
        </div>
      </header>

      {/* Grid Layout Container */}
      <div className={styles.dashboardGrid}>
        
        {/* ROW 1: TOP PROFILE SUMMARY & CARD OVERVIEW */}
        <div className={styles.rowFullWidth}>
          <ProfileSummary 
            profile={profile} 
            application={application} 
            progress={progress} 
            isLocked={isLocked} 
          />
          <MembershipCard 
            profile={profile} 
            application={application} 
            isLocked={isLocked} 
          />
        </div>

        {/* ROW 2: CORE ANALYTIC METRICS STATS */}
        <div className={styles.rowFullWidth}>
          <DashboardStats 
            application={application} 
            progress={progress} 
            isLocked={isLocked} 
          />
        </div>

        {/* COLUMN GROUPS: PRIMARY WORKSPACE VS ACTION SIDEBAR */}
        {/* LEFT COMPONENT COLUMN (Primary Tracking Data Timeline Elements) */}
        <div className={styles.mainColumn}>
          <RecentActivity application={application} isLocked={isLocked} />
        </div>

        {/* RIGHT COMPONENT COLUMN (Action Panels & Secondary Widgets) */}
        <div className={styles.sidebarColumn}>
          <QuickActions isLocked={isLocked} progress={progress} />
          <NotificationPanel application={application} isLocked={isLocked} />
        </div>

      </div>
    </main>
  );
}
