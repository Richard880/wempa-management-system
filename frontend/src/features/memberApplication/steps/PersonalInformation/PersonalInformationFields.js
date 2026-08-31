// src/features/members/steps/PersonalInformation/PersonalInformationFields.js
import GENDERS from "../../../../constants/genders";

const personalInformationFields = [

    {
    name: "membershipNumber",
    label: "Membership Number",
    type: "text",
    placeholder: "Assigning registry identity...",
    readOnly: true, // Prevents manual editing while still submitting cleanly
    required: false,
  },
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Enter first name",
    autoComplete: "given-name",
    required: true,
    className: "col-3", /* Sits horizontally on a 3-column row */
  },
  {
    name: "middleName",
    label: "Middle Name",
    type: "text",
    placeholder: "Enter middle name",
    autoComplete: "additional-name",
    className: "col-3",
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Enter last name",
    autoComplete: "family-name",
    required: true,
    className: "col-3",
  },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    required: true,
    options: GENDERS,
    className: "col-2", /* Sits side-by-side with Date of Birth */
  },
  {
    name: "dateOfBirth",
    label: "Date of Birth",
    type: "date",
    required: true,
    className: "col-2",
  },
  {
    name: "nationality",
    label: "Nationality",
    type: "text",
    placeholder: "Enter your nationality",
    required: true,
    className: "col-2", /* Sits side-by-side with ID/Passport */
  },
  {
    name: "idNumber",
    label: "National ID / Passport",
    type: "text",
    placeholder: "Enter ID or Passport Number",
    required: true,
    className: "col-2",
  },
];

export default personalInformationFields;
