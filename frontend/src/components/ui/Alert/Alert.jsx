import PropTypes from "prop-types";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiAlertTriangle,
  FiX,
} from "react-icons/fi";
import "./alert.css";

const icons = {
  success: <FiCheckCircle />,
  error: <FiAlertCircle />,
  warning: <FiAlertTriangle />,
  info: <FiInfo />,
};

function Alert({
  variant = "info",
  title,
  children,
  dismissible = false,
  onClose,
  className = "",
}) {
  return (
    <div
      className={`wempa-alert wempa-alert-${variant} ${className}`}
      role="alert"
    >
      <div className="wempa-alert-icon">
        {icons[variant]}
      </div>

      <div className="wempa-alert-content">
        {title && (
          <h6 className="wempa-alert-title">
            {title}
          </h6>
        )}

        <div className="wempa-alert-message">
          {children}
        </div>
      </div>

      {dismissible && (
        <button
          type="button"
          className="wempa-alert-close"
          aria-label="Close alert"
          onClick={onClose}
        >
          <FiX />
        </button>
      )}
    </div>
  );
}

Alert.propTypes = {
  variant: PropTypes.oneOf([
    "success",
    "error",
    "warning",
    "info",
  ]),
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  dismissible: PropTypes.bool,
  onClose: PropTypes.func,
  className: PropTypes.string,
};

export default Alert;