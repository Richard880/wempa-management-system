//import COUNTIES from "../../../../constants/counties";

const contactInformationFields = [
  /*
  ----------------------------------------
  Communication Information
  ----------------------------------------
  */

  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "Email Address",
    autoComplete: "email",
    required: true,
    readOnly: true,
    helperText:
      "Retrieved from your registered account and cannot be changed here.",
  },

  {
    name: "phoneNumber",
    label: "Primary Phone Number",
    type: "tel",
    placeholder: "0712345678",
    autoComplete: "tel",
    required: true,
    readOnly: true,
    helperText:
      "Retrieved from your registered account and cannot be changed here.",
  },

  {
    name: "alternativePhoneNumber",
    label: "Alternative Phone Number",
    type: "tel",
    placeholder: "Optional",
    autoComplete: "tel",
  },

  /*
  ----------------------------------------
  Residential Address
  ----------------------------------------
  */

  // {
  //   name: "county",
  //   label: "County",
  //   type: "select",
  //   options: COUNTIES,
  //   required: true,
  // },

  // {
  //   name: "subCounty",
  //   label: "Sub County",
  //   type: "text",
  //   placeholder: "Enter Sub County",
  //   required: true,
  // },

  // {
  //   name: "ward",
  //   label: "Ward",
  //   type: "text",
  //   placeholder: "Enter Ward",
  //   required: true,
  // },

  // {
  //   name: "town",
  //   label: "Town / City",
  //   type: "text",
  //   placeholder: "Enter Town or City",
  //   required: true,
  // },

  {
    name: "physicalAddress",
    label: "Physical Address",
    type: "textarea",
    placeholder:
      "Street, Building, Estate, Landmark...",
    required: true,
  },

  /*
  ----------------------------------------
  Postal Address
  ----------------------------------------
  */

  {
    name: "postalAddress",
    label: "Postal Address",
    type: "text",
    placeholder: "P.O. Box",
  },

  {
    name: "postalCode",
    label: "Postal Code",
    type: "text",
    placeholder: "Postal Code",
  },
];

export default contactInformationFields;