
import styles from "./WizardBody.module.css";
function WizardBody({ children }) {
  return (
    <main className={styles.body}>
      {children}
    </main>
  );
}

export default WizardBody;