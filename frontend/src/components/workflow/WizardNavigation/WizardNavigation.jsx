// import styles from "./WizardNavigation.module.css";

// import useWizard from "../WizardProvider/useWizard";

// export default function WizardNavigation() {
//   const { state, actions } = useWizard();

//   const {
//     currentStep,
//     totalSteps,
//     isFirstStep,
//     isLastStep,
//   } = state;

//   return (
//     <footer className={styles.navigation}>
//       <button
//         type="button"
//         className="btn btn-outline-secondary"
//         onClick={actions.previousStep}
//         disabled={isFirstStep}
//       >
//         Previous
//       </button>

//       <div className={styles.info}>
//         Step {currentStep} of {totalSteps}
//       </div>

//       {!isLastStep ? (
//         <button
//           type="button"
//           className="btn btn-primary"
//           onClick={actions.nextStep}
//         >
//           Next
//         </button>
//       ) : (
//         <button
//           type="button"
//           className="btn btn-success"
//           onClick={actions.submit}
//         >
//           Submit Application
//         </button>
//       )}
//     </footer>
//   );
// }