/*
--------------------------------------------------
Declaration Default Values
--------------------------------------------------

Provides the initial values for the
Declaration step of the WEMPA member
application.

These values are managed by React Hook Form
and persisted through the shared application
workflow.

--------------------------------------------------
*/

const defaultValues = {
  /*
  ----------------------------------------
  Applicant Declaration
  ----------------------------------------
  */

  declarationAccepted: false,

  /*
  ----------------------------------------
  Information Accuracy
  ----------------------------------------
  */

  informationAccurate: false,

  /*
  ----------------------------------------
  Terms & Conditions
  ----------------------------------------
  */

  termsAccepted: false,
};

export default defaultValues;