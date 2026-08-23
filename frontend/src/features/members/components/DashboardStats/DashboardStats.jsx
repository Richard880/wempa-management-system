// src/features/members/components/DashboardStats/DashboardStats.jsx

import styles from './DashboardStats.module.css';

export default function DashboardStats({ progress = 0, isLocked = false, application = null }) {
  
  const stats = [
    {
      label: "Application Progress",
      value: `${progress}%`,
      icon: "bi-percent",
      colorClass: styles.blueIcon, // 🟢 FIXED: Added the dot '' for CSS Modules
      progress: progress,
      barColor: "#" // WEMPA Brand Navy
    },
    {
      label: "Status",
      value: isLocked ? "Submitted" : "In Progress",
      icon: isLocked ? "bi-shield-check" : "bi-pencil-square",
      colorClass: isLocked ? styles.greenIcon : styles.orangeIcon, // 🟢 FIXED: Added dots
      progress: isLocked ? 100 : progress, // 🟢 FIXED: Added  for the true case
      barColor: isLocked ? "#aa" : "#feb"
    },
    {
      label: "Upcoming Events",
      value: "", // 🟢 FIXED: Added placeholder value
      icon: "bi-calendar-event",
      colorClass: styles.purpleIcon, // 🟢 FIXED: Added dot
      progress: 0,// 🟢 FIXED: Added 
      barColor: "#caed"
    },
    {
      label: "CPD Points",
      value: "", // 🟢 FIXED: Added placeholder value
      icon: "bi-award",
      colorClass: styles.blueIcon, // 🟢 FIXED: Added dot
      progress:0, // 🟢 FIXED: Added 
      barColor: "#"
    }
  ];

  return (
    <div className={styles.statsGrid}>
      {stats.map((stat, index) => (
        <div key={index} className={styles.statCard}>
          <div className={`${styles.iconWrapper} ${stat.colorClass}`}>
            <i className={`bi ${stat.icon}`}></i>
          </div>
          
          <div className={styles.content}>
            <span className={styles.label}>{stat.label}</span>
            <span className={styles.value}>{stat.value}</span>
            
            <div className={styles.progressBarContainer}>
              <div 
                className={styles.progressBar} 
                style={{ 
                  width: `${stat.progress}%`, 
                  backgroundColor: stat.barColor 
                }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
