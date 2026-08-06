import PropTypes from "prop-types";
import styles from "./authCard.module.css";

function AuthCard({
  title,
  subtitle,
  children,
  className = "",
}) {
  return (
    <div className={`${styles.card} ${className}`}>
      {(title || subtitle) && (
        <div className={styles.header}>
          {title && (
            <h1 className={styles.title}>
              {title}
            </h1>
          )}

          {subtitle && (
            <p className={styles.subtitle}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className={styles.body}>
        {children}
      </div>
    </div>
  );
}

AuthCard.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default AuthCard;