import APPLICATION_STEPS_CONFIG from "../config/applicationSteps";

// Safe fallback wrapper for default vs named import discrepancies
const STEPS = Array.isArray(APPLICATION_STEPS_CONFIG) 
  ? APPLICATION_STEPS_CONFIG 
  : (APPLICATION_STEPS_CONFIG?.APPLICATION_STEPS || []);

export function getStepById(stepId) {
  return STEPS.find((step) => step.id === stepId) || null;
}

export function getStepByKey(key) {
  return STEPS.find((step) => step.key === key) || null;
}

export function getNextStep(currentStep) {
  return STEPS.find((step) => step.id === currentStep + 1) || null;
}

export function getPreviousStep(currentStep) {
  return STEPS.find((step) => step.id === currentStep - 1) || null;
}

export function isFirstStep(currentStep) {
  return currentStep === 1;
}

export function isLastStep(currentStep) {
  return currentStep === STEPS.length;
}

export function calculateProgress(completedSections = []) {
  return STEPS.reduce(
    (total, step) =>
      completedSections.includes(step.key)
        ? total + (step.weight || 0)
        : total,
    0
  );
}
