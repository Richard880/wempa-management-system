import GENDERS from "../../../../constants/genders";

const personalInformationFields = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Enter your first name",
    autoComplete: "given-name",
    required: true,
  },

  {
    name: "middleName",
    label: "Middle Name",
    type: "text",
    placeholder: "Enter your middle name",
    autoComplete: "additional-name",
  },

  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Enter your last name",
    autoComplete: "family-name",
    required: true,
  },

  {
    name: "gender",
    label: "Gender",
    type: "select",
    required: true,
    options: GENDERS,
  },

  {
    name: "dateOfBirth",
    label: "Date of Birth",
    type: "date",
    required: true,
  },

  {
    name: "nationality",
    label: "Nationality",
    type: "text",
    placeholder: "Enter your nationality",
    required: true,
  },

  {
    name: "idNumber",
    label: "National ID / Passport",
    type: "text",
    placeholder: "Enter your ID or Passport Number",
    required: true,
  },

  {
    name: "kraPin",
    label: "KRA PIN",
    type: "text",
    placeholder: "Example: A123456789B",
    required: true,
  },
];

export default personalInformationFields;