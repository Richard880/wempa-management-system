// src/components/workflow/WizardBody.jsx

import PropTypes from "prop-types";
import styles from "./WizardBody.module.css";

function WizardBody({ children }) {
  return (
    <div className={styles.body}>
      {children}
    </div>
  );
}

WizardBody.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WizardBody;
