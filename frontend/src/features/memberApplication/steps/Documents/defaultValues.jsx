import initializeDocumentState from "./utils/initializeDocumentState";

/*
--------------------------------------------------
Documents Step Default Values
--------------------------------------------------

Provides the initial form values for the
Documents application step.

The upload engine manages the detailed
document state while React Hook Form
stores the section value consistently with
every other application step.
--------------------------------------------------
*/

const defaultValues = {
  documents: initializeDocumentState(),
};

export default defaultValues;