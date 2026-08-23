// src/features/members/components/RecentActivity/RecentActivity.jsx

import { Button } from 'react-bootstrap';
import styles from './RecentActivity.module.css';

// 🟢 FIXED: Added '[]' as the default value for the activities prop
export default function RecentActivity({ activities = [] }) {
  
  // Demo data to show if no real activities exist in Firestore yet
  const displayActivities = activities.length > 0 ? activities : [
    { 
      id: '1', 
      title: "Membership application submitted", 
      time: "2 hours ago" 
    },
    { 
      id: '2', 
      title: "Profile photo updated", 
      time: "Yesterday" 
    },
    { 
      id: '3', 
      title: "Registered for Maritime Safety Workshop", 
      time: "3 days ago" 
    }
  ];

  return (
    <div className={styles.activityCard}>
      <div className={styles.header}>
        <h5>Recent Activity</h5>
        <span className="badge bg-light text-primary border px-2 py-1">Live</span>
      </div>

      <div className={styles.timeline}>
        {displayActivities.map((activity) => (
          <div key={activity.id} className={styles.activityItem}>
            <p className={styles.activityTitle}>{activity.title}</p>
            <span className={styles.activityTime}>
              <i className="bi bi-clock me-1"></i>
              {activity.time}
            </span>
          </div>
        ))}
      </div>

      <Button className={styles.viewAllButton}>
        See Full History
        <i className="bi bi-arrow-right ms-2"></i>
      </Button>
    </div>
  );
}
