import { useContext } from "react";

import WizardContext from "./WizardContext";

export default function useWizard() {
  const context = useContext(WizardContext);

  if (!context) {
    throw new Error(
      "useWizard must be used inside WizardProvider."
    );
  }

  return context;
}