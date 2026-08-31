// src/features/members/steps/Review/Review.jsx
import PropTypes from "prop-types";
import useWizard from "../../../../components/workflow/WizardProvider/useWizard";
import useApplicationForm from "../../hooks/useApplicationForm"; 
import reviewSections from "./constants/reviewSections"; // 🟢 IMPORT: Dynamic section configurations map
import styles from "./Review.module.css"; 

export default function Review() {
  const { actions } = useWizard();
  
  // Directly extracts live data context vectors from the parent registry custom hook
  const { application, documents, loading } = useApplicationForm();

  const handleJumpToStep = (stepNumber) => {
    if (actions?.goToStep) {
      actions.goToStep(stepNumber);
    }
  };

  const renderRow = (label, value) => (
    <div className={styles.reviewRow}>
      <span className={styles.reviewLabel}>{label}</span>
      <span className={styles.reviewValue}>{value || "—"}</span>
    </div>
  );

  const displayStatusLabel = (status) => {
    switch (status?.toLowerCase()) {
      case "uploaded":
      case "success":
        return "✓ Uploaded";
      case "verified":
        return "✓ Verified";
      case "failed":
        return "✕ Failed";
      case "uploading":
      case "queued":
        return "⏳ Uploading...";
      default:
        return "Pending";
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className="spinner-border text-info spinner-border-sm me-2" role="status" />
        <span className={styles.loadingText}>Compiling maritime file directory review summary...</span>
      </div>
    );
  }

  return (
    <div className={styles.reviewWrapper}>
      {/* 🟢 DYNAMIC FORM ELEMENT LOOPS: Processes Personal, Contact, and Employment segments sequentially */}
      {reviewSections
        .filter((sec) => sec.id !== "documents") // Isolates traditional text fields from file maps
        .map((section, idx) => {
          const sectionData = application?.[section.id] || {};

          return (
            <section key={section.id} className={styles.reviewSection}>
              <header className={styles.sectionHeader}>
                <div>
                  <h3 className={styles.sectionTitle}>
                    {idx + 1}. {section.title}
                  </h3>
                  <p className={styles.sectionDescription}>
                    Verified system parameters under {section.title.toLowerCase()}.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleJumpToStep(section.editStep)}
                  className={styles.editSectionButton}
                >
                  Modify Section
                </button>
              </header>
              
              <div className={styles.sectionBody}>
                {section.fields.map((field) =>
                  renderRow(field.label, sectionData[field.key])
                )}
              </div>
            </section>
          );
        })}

      {/* 💎 4. Supporting Documentation (Handled independently via dynamic thumbnail loops) */}
      <section className={styles.reviewSection}>
        <header className={styles.sectionHeader}>
          <div>
            <h3 className={styles.sectionTitle}>4. Uploaded Certificates & Documents</h3>
            <p className={styles.sectionDescription}>Live directory verification check of submitted digital assets.</p>
          </div>
          {/* 🟢 FIXED: Routes modification requests directly to step index 4 */}
          <button type="button" onClick={() => handleJumpToStep(4)} className={styles.editSectionButton}>
            Modify Assets
          </button>
        </header>
        
        <div className={styles.reviewDocuments}>
          {documents && Object.keys(documents).length > 0 ? (
            Object.entries(documents).map(([key, doc]) => {
              if (typeof doc !== "object" || doc === null) return null;

              const dbStatus = doc?.status || "pending";
              const statusClass = styles[dbStatus.toLowerCase()] || styles.pending;
              
              const cleanTitle = key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())
                .trim();

              return (
                <div key={key} className={styles.documentCard}>
                  <div className={styles.documentInfo}>
                    <h4 className={styles.documentTitle}>{cleanTitle}</h4>
                    <p className={styles.documentFileName} title={doc?.fileName}>
                      {doc?.fileName || "Attached_Asset_Certificate.pdf"}
                    </p>
                  </div>
                  <div className={styles.documentStatus}>
                    <span className={`${styles.reviewStatusBadge} ${statusClass}`}>
                      {displayStatusLabel(dbStatus)}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className={styles.emptyDocuments}>
              ✕ No digital certificates or passport photos discovered in the application registry.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

Review.propTypes = {
  formId: PropTypes.string,
};
