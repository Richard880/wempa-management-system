
import PropTypes from "prop-types";
import useWizard from "../../../../components/workflow/WizardProvider/useWizard";
import WizardFooter from "../../../../components/workflow/WizardFooter";
import styles from "./Review.module.css"; // Successfully wired up with your existing styles

export default function Review({ application, formId }) {
  const { actions } = useWizard();

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

  return (
    <form id={formId} onSubmit={handleNextStep}>
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
          {renderRow("KRA PIN", application?.personal?.kraPin)}
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
          {renderRow("County", application?.contact?.county)}
          {renderRow("Sub-County", application?.contact?.subCounty)}
          {renderRow("Ward", application?.contact?.ward)}
          {renderRow("Town", application?.contact?.town)}
          {renderRow("Physical Address", application?.contact?.physicalAddress)}
        </div>
      </section>

      {/* 3. Employment Details */}
      <section className={styles.reviewSection}>
        <header className={styles.sectionHeader}>
          <div>
            <h3 className={styles.sectionTitle}>3. Employment Information</h3>
            <p className={styles.sectionDescription}>Current professional engagement profile.</p>
          </div>
          <button type="button" onClick={() => handleJumpToStep(3)} className={styles.editSectionButton}>
            Edit
          </button>
        </header>
        <div className={styles.sectionBody}>
          {renderRow("Employer Name", application?.employment?.employerName)}
          {renderRow("Job Title/Designation", application?.employment?.jobTitle)}
          {renderRow("Work Station", application?.employment?.workStation)}
          {renderRow("Years of Experience", application?.employment?.experienceYears)}
        </div>
      </section>

      {/* 4. Maritime Background */}
      <section className={styles.reviewSection}>
        <header className={styles.sectionHeader}>
          <div>
            <h3 className={styles.sectionTitle}>4. Maritime Background</h3>
            <p className={styles.sectionDescription}>Qualifications and seafaring certifications.</p>
          </div>
          <button type="button" onClick={() => handleJumpToStep(4)} className={styles.editSectionButton}>
            Edit
          </button>
        </header>
        <div className={styles.sectionBody}>
          {renderRow("Rank/Capacity", application?.maritime?.rank)}
          {renderRow("CDC Number", application?.maritime?.cdcNumber)}
          {renderRow("Vessel Type Experience", application?.maritime?.vesselType)}
        </div>
      </section>

      {/* 5. Emergency Contact */}
      <section className={styles.reviewSection}>
        <header className={styles.sectionHeader}>
          <div>
            <h3 className={styles.sectionTitle}>5. Emergency Contact</h3>
            <p className={styles.sectionDescription}>Immediate emergency point of contact.</p>
          </div>
          <button type="button" onClick={() => handleJumpToStep(5)} className={styles.editSectionButton}>
            Edit
          </button>
        </header>
        <div className={styles.sectionBody}>
          {renderRow("Full Name", application?.emergencyContact?.fullName)}
          {renderRow("Relationship", application?.emergencyContact?.relationship)}
          {renderRow("Phone Number", application?.emergencyContact?.phoneNumber)}
        </div>
      </section>

      {/* 6. Next of Kin */}
      <section className={styles.reviewSection}>
        <header className={styles.sectionHeader}>
          <div>
            <h3 className={styles.sectionTitle}>6. Next of Kin</h3>
            <p className={styles.sectionDescription}>Legally recognized next of kin assignment.</p>
          </div>
          <button type="button" onClick={() => handleJumpToStep(6)} className={styles.editSectionButton}>
            Edit
          </button>
        </header>
        <div className={styles.sectionBody}>
          {renderRow("Full Name", application?.nextOfKin?.fullName)}
          {renderRow("Relationship", application?.nextOfKin?.relationship)}
          {renderRow("Phone Number", application?.nextOfKin?.phoneNumber)}
        </div>
      </section>

      {/* 7. Supporting Documentation */}
      <section className={styles.reviewSection}>
        <header className={styles.sectionHeader}>
          <div>
            <h3 className={styles.sectionTitle}>7. Uploaded Documents</h3>
            <p className={styles.sectionDescription}>Metadata check for required compliance certificates.</p>
          </div>
          <button type="button" onClick={() => handleJumpToStep(7)} className={styles.editSectionButton}>
            Edit
          </button>
        </header>
        <div className={styles.reviewDocuments}>
          {application?.documents && Object.keys(application.documents).length > 0 ? (
            Object.entries(application.documents).map(([key, doc]) => {
              // Derive custom badge state classes (fallback safely to 'pending' if undetermined)
              const statusClass = styles[doc?.status?.toLowerCase()] || styles.pending;
              const formattedLabel = key.replace(/([A-Z])/g, " $1").trim();

              return (
                <div key={key} className={styles.documentCard}>
                  <div className={styles.documentInfo}>
                    <h4 className={styles.documentTitle}>{formattedLabel}</h4>
                    <p className={styles.documentFileName}>{doc?.fileName || "upload_file.pdf"}</p>
                  </div>
                  <div className={styles.documentStatus}>
                    <span className={`${styles.reviewStatusBadge} ${statusClass}`}>
                      {doc?.status || "Pending"}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className={styles.emptyDocuments}>
              No digital certificates found in the application buffer tree.
            </div>
          )}
        </div>
      </section>

      {/* 
        CRITICAL: Encapsulated inside the form so that Save & Next button 
        automatically executes handleNextStep natively to reach Step 9.
      */}
      <WizardFooter loading={false} />
    </form>
  );
}

Review.propTypes = {
  application: PropTypes.object.isRequired,
  formId: PropTypes.string.isRequired,
};
