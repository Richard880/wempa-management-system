import styles from "../Declaration.module.css";

/*
--------------------------------------------------
Declaration Agreement
--------------------------------------------------

Displays the official declaration statement
that every applicant must read before
submitting a membership application.

This component is presentation only.

Responsibilities

• Display declaration text
• Render informational content
• No state
• No validation
• No business logic

--------------------------------------------------
*/

function DeclarationAgreement() {
  return (
    <section className={styles.agreement}>
      <h3 className={styles.sectionTitle}>
        Applicant Declaration
      </h3>

      <p className={styles.paragraph}>
        I hereby declare that the information
        provided in this membership application
        is true, complete, and accurate to the
        best of my knowledge.
      </p>

      <p className={styles.paragraph}>
        I understand that the Western Maritime
        Employers &amp; Professionals Association
        (WEMPA) may verify the information and
        supporting documents submitted as part
        of this application.
      </p>

      <p className={styles.paragraph}>
        I acknowledge that providing false,
        misleading, or incomplete information
        may result in rejection of my
        application, suspension, or termination
        of membership where applicable.
      </p>

      <p className={styles.paragraph}>
        By proceeding, I confirm that I have
        read and understood this declaration
        and agree to comply with the
        Constitution, Membership Policies,
        Code of Conduct, and any other
        applicable regulations of WEMPA.
      </p>
    </section>
  );
}

export default DeclarationAgreement;