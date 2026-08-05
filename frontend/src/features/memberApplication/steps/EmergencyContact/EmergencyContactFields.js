import RELATIONSHIPS from "../../../../constants/relationships";

const emergencyContactFields = [
  /*
  ----------------------------------------
  Emergency Contact Details
  ----------------------------------------
  */

  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    placeholder: "Enter full name",
    autoComplete: "name",
    required: true,
  },

  {
    name: "relationship",
    label: "Relationship",
    type: "select",
    options: RELATIONSHIPS,
    required: true,
  },

  {
    name: "phoneNumber",
    label: "Primary Phone Number",
    type: "tel",
    placeholder: "e.g. 0712345678",
    autoComplete: "tel",
    required: true,
  },

  {
    name: "alternativePhoneNumber",
    label: "Alternative Phone Number",
    type: "tel",
    placeholder: "Optional",
    autoComplete: "tel",
  },

  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "Enter email address",
    autoComplete: "email",
  },

  {
    name: "physicalAddress",
    label: "Physical Address",
    type: "textarea",
    placeholder:
      "Street, Building, Landmark or Village",
    required: true,
  },
];

export default emergencyContactFields;