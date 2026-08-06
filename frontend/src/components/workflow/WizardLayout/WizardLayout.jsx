import PropTypes from "prop-types";

import styles from "./WizardLayout.module.css";

export default function WizardLayout({ children }) {
  return (
    <div className={styles.layout}>
      {children}
    </div>
  );
}

WizardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};