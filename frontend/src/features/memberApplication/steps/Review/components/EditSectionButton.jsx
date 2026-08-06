import PropTypes from "prop-types";

import styles from "../Review.module.css";

/*
--------------------------------------------------
Edit Section Button
--------------------------------------------------

A lightweight action button used within the
Review step to allow the user to navigate
back and edit a specific application section.

Responsibilities

• Render an edit action
• Invoke the supplied callback
• Remain completely presentational

Navigation logic belongs to the parent.
--------------------------------------------------
*/

function EditSectionButton({
  onClick,
  disabled = false,
  children = "Edit",
}) {
  return (
    <button
      type="button"
      className={styles.editSectionButton}
      onClick={onClick}
      disabled={disabled}
      aria-label="Edit section"
    >
      {children}
    </button>
  );
}

EditSectionButton.propTypes = {
  onClick: PropTypes.func.isRequired,

  disabled: PropTypes.bool,

  children: PropTypes.node,
};

export default EditSectionButton;