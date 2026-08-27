import PropTypes from "prop-types";
import useWizard from "../../../../components/workflow/WizardProvider/useWizard";
import WizardFooter from "../../../../components/workflow/WizardFooter";
import useApplicationForm from "../../hooks/useApplicationForm"; 
import styles from "./Review.module.css"; 

export default function Review({ formId }) {
  const { actions } = useWizard();
  
  // FIX: Destructure the independent 'documents' object directly from the custom hook return statement
  const { application, documents, loading } = useApplicationForm();

  const handleNextStep = (e) => {
    e.preventDefault();
    if (actions?.nextStep) {
      actions.nextStep();
    } else {
      console.warn("Wizard navigation tracking failed: nextStep action missing.");
    }
  };

  const handleJumpToStep = (stepNumber) => {
    if (actions?.goToStep) {
      actions.goToStep(stepNumber);
    }
  };

  // Safe wrapper to prevent empty text fields from throwing layout alignment issues
  const renderRow = (label, value) => (
    <div className={styles.reviewRow}>
      <span className={styles.reviewLabel}>{label}</span>
      <span className={styles.reviewValue}>{value || "—"}</span>
    </div>
  );

  /*
  ----------------------------------------
  Status Badge Label Formatter
  ----------------------------------------
  Translates system status keys into crisp readable text badges.
  */
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
        <i className="fas fa-spinner fa-spin me-2"></i> Loading application review panel...
      </div>
    );
  }

  return (
    <form id={formId} onSubmit={handleNextStep} className={styles.container}>
      {/* 1. Personal Information */}
      <section className={styles.reviewSection}>
        <header className={styles.sectionHeader}>
          <div>
            <h3 className={styles.sectionTitle}>1. Personal Information</h3>
            <p className={styles.sectionDescription}>Identity and background details.</p>
          </div>
          <button type="button" onClick={() => handleJumpToStep(1)} className={styles.editSectionButton}>
            Edit
          </button>
        </header>
        <div className={styles.sectionBody}>
          {renderRow("First Name", application?.personal?.firstName)}
          {renderRow("Middle Name", application?.personal?.middleName)}
          {renderRow("Last Name", application?.personal?.lastName)}
          {renderRow("Gender", application?.personal?.gender)}
          {renderRow("Date of Birth", application?.personal?.dateOfBirth)}
          {renderRow("Nationality", application?.personal?.nationality)}
          {renderRow("ID/Passport Number", application?.personal?.idNumber)}
        </div>
      </section>

      {/* 2. Contact Information */}
      <section className={styles.reviewSection}>
        <header className={styles.sectionHeader}>
          <div>
            <h3 className={styles.sectionTitle}>2. Contact Information</h3>
            <p className={styles.sectionDescription}>Address and mobile routing metrics.</p>
          </div>
          <button type="button" onClick={() => handleJumpToStep(2)} className={styles.editSectionButton}>
            Edit
          </button>
        </header>
        <div className={styles.sectionBody}>
          {renderRow("Email Address", application?.contact?.email)}
          {renderRow("Phone Number", application?.contact?.phoneNumber)}
          {renderRow("Alternative Phone", application?.contact?.alternativePhoneNumber)}
          {renderRow("Physical Address", application?.contact?.physicalAddress)}
        </div>
      </section>

      {/* 3. Supporting Documentation */}
      <section className={styles.reviewSection}>
        <header className={styles.sectionHeader}>
          <div>
            <h3 className={styles.sectionTitle}>3. Uploaded Documents</h3>
            <p className={styles.sectionDescription}>Live verification of required compliance files.</p>
          </div>
          <button type="button" onClick={() => handleJumpToStep(3)} className={styles.editSectionButton}>
            Edit
          </button>
        </header>
        
        <div className={styles.reviewDocuments}>
          {documents && Object.keys(documents).length > 0 ? (
            Object.entries(documents).map(([key, doc]) => {
              // Ignore administrative primitive structural variables if they slip into the map loop
              if (typeof doc !== 'object' || doc === null) return null;

              const dbStatus = doc?.status || "pending";
              const statusClass = styles[dbStatus.toLowerCase()] || styles.pending;
              
              // Formatting camelCase database tokens (e.g. nationalId -> National Id)
              const cleanTitle = key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())
                .trim();

              return (
                <div key={key} className={styles.documentCard}>
                  <div className={styles.documentInfo}>
                    <h4 className={styles.documentTitle}>{cleanTitle}</h4>
                    <p className={styles.documentFileName}>
                      {doc?.fileName || "Missing_Asset_File.pdf"}
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
              No digital certificates found in the application database tree.
            </div>
          )}
        </div>
      </section>



      {/* Tell footer this is the last verification page before final submission */}
      <WizardFooter isLastStep={true} loading={false} />
    </form>
  );
}

Review.propTypes = {
  formId: PropTypes.string.isRequired,
};
