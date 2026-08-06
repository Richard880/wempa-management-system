import { useCallback, useState } from "react";

import applicationService from "../../../services/applicationService";

/*
--------------------------------------------------
Declaration Hook
--------------------------------------------------

Coordinates the final submission of a member
application.

Responsibilities

• Submit completed application
• Track submission state
• Surface submission errors

This hook does not:

• Create forms
• Validate fields
• Navigate
• Fetch application data

--------------------------------------------------
*/

export default function useDeclaration() {
  /*
  ----------------------------------------
  Submission State
  ----------------------------------------
  */

  const [submitting, setSubmitting] =
    useState(false);

  /*
  ----------------------------------------
  Submit Application
  ----------------------------------------
  */

  const submitApplication =
    useCallback(async (uid) => {
      if (!uid) {
        throw new Error(
          "User ID is required."
        );
      }

      setSubmitting(true);

      try {
        return await applicationService.submitApplication(
          uid
        );
      } finally {
        setSubmitting(false);
      }
    }, []);

  return {
    submitApplication,

    submitting,
  };
}