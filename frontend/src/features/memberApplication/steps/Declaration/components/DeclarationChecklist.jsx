import PropTypes from "prop-types";
import Checkbox from "../../../../../components/ui/Checkbox/Checkbox";
import styles from "../Declaration.module.css";

function DeclarationChecklist({ register, errors }) {
  return (
    <section className={styles.checklist}>
      <Checkbox
        id="declarationAccepted"
        label="I declare that all information provided in this application is true and complete."
        // Spread the entire register object. 
        // forwardRef in Checkbox.jsx will automatically catch the 'ref' property.
        {...register("declarationAccepted")}
        error={errors?.declarationAccepted?.message}
      />

      <Checkbox
        id="informationAccurate"
        label="I understand that WEMPA may verify the information and supporting documents submitted."
        {...register("informationAccurate")}
        error={errors?.informationAccurate?.message}
      />

      <Checkbox
        id="termsAccepted"
        label="I agree to abide by the WEMPA Constitution, Membership Policies, Code of Conduct, and Terms & Conditions."
        {...register("termsAccepted")}
        error={errors?.termsAccepted?.message}
      />
    </section>
  );
}

DeclarationChecklist.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default DeclarationChecklist;
