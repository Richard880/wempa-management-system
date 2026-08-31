// src/features/members/utils/applicationHelpers.js
// 🟢 FIXED: Explicitly destructured the named export to match applicationSteps.js precisely
import { APPLICATION_STEPS } from "../config/applicationSteps";

const STEPS = Array.isArray(APPLICATION_STEPS) ? APPLICATION_STEPS : [];

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

/**
 * 🟢 HARDENED ARITHMETIC PROGRESS ENGINE
 * Aggregates step weights and ensures standard precision values are rounded correctly
 * to avoid floating-point errors.
 */
export function calculateProgress(completedSections = []) {
  if (!Array.isArray(completedSections) || completedSections.length === 0) {
    return 0;
  }

  const exactSum = STEPS.reduce(
    (total, step) =>
      completedSections.includes(step.key)
        ? total + (Number(step.weight) || 0)
        : total,
    0
  );

  // Math.round strips out micro decimal artifacts (e.g., 99.99999999% scales perfectly to 100%)
  return Math.round(exactSum * 100) / 100;
}
