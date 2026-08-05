import styles from "../Declaration.module.css";

/*
--------------------------------------------------
Submission Notice
--------------------------------------------------

Provides applicants with information about
what happens after their membership
application is submitted.

Presentation only.

Responsibilities

• Display post-submission information
• Set applicant expectations
• No state
• No business logic
• No navigation

--------------------------------------------------
*/

function SubmissionNotice() {
  return (
    <section className={styles.notice}>
      <h3 className={styles.sectionTitle}>
        What Happens Next?
      </h3>

      <p className={styles.paragraph}>
        Once you submit your application, it
        will be received by WEMPA for review.
      </p>

      <ul className={styles.noticeList}>
        <li>
          Your application and supporting
          documents will be verified.
        </li>

        <li>
          Additional information may be
          requested if required.
        </li>

        <li>
          You will be notified of the outcome
          once the review process is complete.
        </li>

        <li>
          Successful applicants will receive
          membership approval and further
          instructions regarding activation and
          membership benefits.
        </li>
      </ul>

      <p className={styles.noticeFooter}>
        Please ensure all information provided
        is accurate before submitting your
        application.
      </p>
    </section>
  );
}

export default SubmissionNotice;