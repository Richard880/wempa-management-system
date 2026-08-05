import PropTypes from "prop-types";
import styles from "./PageHeader.module.css";

function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  badge,
  progress,
  actions,
  children,
  className = "",
}) {
  return (
    <header
      className={`${styles.pageHeader} ${className}`}
    >
      {breadcrumbs && (
        <nav
          className={styles.breadcrumbs}
          aria-label="Breadcrumb"
        >
          {breadcrumbs}
        </nav>
      )}

      <div className={styles.topRow}>
        <div className={styles.heading}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>
              {title}
            </h1>

            {badge}
          </div>

          {subtitle && (
            <p className={styles.subtitle}>
              {subtitle}
            </p>
          )}
        </div>

        {actions && (
          <div className={styles.actions}>
            {actions}
          </div>
        )}
      </div>

      {typeof progress === "number" && (
        <div className={styles.progressSection}>
          <div className={styles.progressHeader}>
            <span>Completion Progress</span>

            <strong>{progress}%</strong>
          </div>

          <div
            className={styles.progressTrack}
            aria-label="Application progress"
          >
            <div
              className={styles.progressBar}
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>
      )}

      {children && (
        <div className={styles.footer}>
          {children}
        </div>
      )}
    </header>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  breadcrumbs: PropTypes.node,
  badge: PropTypes.node,
  progress: PropTypes.number,
  actions: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default PageHeader;