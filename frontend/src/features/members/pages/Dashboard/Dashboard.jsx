// src/features/dashboard/pages/Dashboard.jsx
import { useAuth } from "../../../auth/hooks/useAuth"; 
import useApplicationForm from "../../../memberApplication/hooks/useApplicationForm"; 
import Spinner from "../../../../components/ui/Spinner"; 
import Button from "../../../../components/ui/Button"; 

import DashboardStats from "../../components/DashboardStats/DashboardStats";
import ProfileSummary from "../../components/ProfileSummary";
import MembershipCard from "../../components/MembershipCard/MembershipCard";
import QuickActions from "../../components/QuickActions/QuickActions";
import RecentActivity from "../../components/RecentActivity/RecentActivity";
import NotificationPanel from "../../components/NotificationPanel";

import styles from "./Dashboard.module.css"; 

export default function Dashboard() {
  const { logout } = useAuth();
  const { 
    profile, 
    application, 
    loading, 
    progress, 
    isLocked, 
    error 
  } = useApplicationForm();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Failed to safely sign out:", err);
    }
  };

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
      {/* HEADER CARD: THEME SYNCED WITH SIDEBAR */}
      <header className={styles.dashboardHeader}>
        <div className="d-flex align-items-center gap-4">
          <div className="d-none d-md-flex align-items-center justify-content-center bg-white bg-opacity-10 rounded-circle" 
               style={{ width: "64px", height: "64px", border: "1px solid rgba(255,255,255,0.1)" }}>
            <i className="bi bi-person-workspace text-warning fs-2"></i>
          </div>
          
          <div className="text-start">
            <h1 className={styles.title}>
              Welcome back, {profile?.firstName || "Member"}
            </h1>
            <p className={styles.subtitle}>
              <i className="bi bi-shield-check text-success me-2"></i>
              WEMPA Workspace: Professional Maritime Dashboard
            </p>
          </div>
        </div>
        
        <div className={styles.headerActions}>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className={styles.logoutButton}
          >
            <i className="bi bi-box-arrow-right me-2"></i>
            Secure Sign Out
          </Button>
        </div>
      </header>

      {/* MAIN GRID CONTAINER */}
      <div className={styles.dashboardGrid}>
        
        {/* ROW 1: PROFILE & MEMBERSHIP CARD */}
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

        {/* ROW 2: QUICK ACTIONS (2/3) & RECENT ACTIVITY (1/3) */}
        <div className={styles.actionRow}>
          <div className={styles.quickActionsColumn}>
            <QuickActions isLocked={isLocked} progress={progress} />
          </div>
          
          <div className={styles.activityColumn}>
            <RecentActivity />
          </div>
        </div>

        {/* ROW 3: STATS & NOTIFICATIONS */}
        <div className={styles.mainColumn}>
           <DashboardStats 
            application={application} 
            progress={progress} 
            isLocked={isLocked} 
          />
        </div>

        <div className={styles.sidebarColumn}>
          <NotificationPanel application={application} isLocked={isLocked} />
        </div>

      </div>
    </main>
  );
}
