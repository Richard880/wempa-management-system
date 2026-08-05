import { useMemo } from 'react';
import WizardContext from './WizardContext';
import PropTypes from 'prop-types';

export default function WizardProvider({ 
  children, 
  steps, 
  currentStep, 
  completedSteps, 
  progress, 
  nextStep, 
  previousStep, 
  goToStep, 
  submit 
}) {
  
  // Memoize the value to prevent unnecessary re-renders of the entire sidebar/footer
  const value = useMemo(() => ({
    state: {
      steps,
      currentStep,
      completedSteps,
      progress,
      isFirstStep: currentStep === 1,
      isLastStep: currentStep === steps.length,
    },
    actions: {
      nextStep,
      previousStep,
      goToStep, // This ensures actions.goToStep exists!
      submit,
    }
  }), [steps, currentStep, completedSteps, progress, nextStep, previousStep, goToStep, submit]);

  return (
    <WizardContext.Provider value={value}>
      {children}
    </WizardContext.Provider>
  );
}

WizardProvider.propTypes = {
  children: PropTypes.node.isRequired,
  steps: PropTypes.array.isRequired,
  currentStep: PropTypes.number.isRequired,
  completedSteps: PropTypes.array.isRequired,
  progress: PropTypes.number.isRequired,
  nextStep: PropTypes.func.isRequired,
  previousStep: PropTypes.func.isRequired,
  goToStep: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
};
