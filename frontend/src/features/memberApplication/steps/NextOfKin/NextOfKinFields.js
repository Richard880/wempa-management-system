import COUNTIES from "../../../../constants/counties";
import RELATIONSHIPS from "../../../../constants/relationships";

const nextOfKinFields = [
  /*
  ----------------------------------------
  Personal Details
  ----------------------------------------
  */

  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    placeholder: "Enter Full Name",
    required: true,
  },

  {
    name: "relationship",
    label: "Relationship",
    type: "select",
    options: RELATIONSHIPS,
    required: true,
  },

  /*
  ----------------------------------------
  Contact Information
  ----------------------------------------
  */

  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "tel",
    placeholder: "e.g. 0712345678",
    required: true,
  },

  {
    name: "alternativePhoneNumber",
    label: "Alternative Phone Number",
    type: "tel",
    placeholder: "Optional",
  },

  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "Optional",
  },

  {
    name: "nationalId",
    label: "National ID / Passport Number",
    type: "text",
    placeholder: "Optional",
  },

  /*
  ----------------------------------------
  Address
  ----------------------------------------
  */

  {
    name: "county",
    label: "County",
    type: "select",
    options: COUNTIES,
    required: true,
  },

  {
    name: "town",
    label: "Town / City",
    type: "text",
    placeholder: "Town or City",
    required: true,
  },

  {
    name: "physicalAddress",
    label: "Physical Address",
    type: "textarea",
    placeholder: "Street, Building, Landmark...",
    required: true,
  },

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

export default nextOfKinFields;