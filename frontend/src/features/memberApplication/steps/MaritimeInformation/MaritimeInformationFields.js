import MARITIME_CATEGORIES from "../../../../constants/maritimeCategories";

const maritimeInformationFields = [
  /*
  ----------------------------------------
  Maritime Profile
  ----------------------------------------
  */

  {
    name: "maritimeCategory",
    label: "Maritime Category",
    type: "select",
    options: MARITIME_CATEGORIES,
    required: true,
  },

  {
    name: "currentOccupation",
    label: "Current Occupation",
    type: "text",
    placeholder: "Enter current occupation",
    required: true,
  },

  {
    name: "organization",
    label: "Organization / Company",
    type: "text",
    placeholder: "Employer or Organization",
  },

  {
    name: "designation",
    label: "Position / Rank",
    type: "text",
    placeholder: "Current designation",
  },

  {
    name: "yearsOfExperience",
    label: "Years of Maritime Experience",
    type: "number",
    placeholder: "Years",
    required: true,
  },

  {
    name: "maritimeQualifications",
    label: "Maritime Qualifications",
    type: "textarea",
    placeholder: "Certificates, Diplomas, Degrees...",
  },

  {
    name: "professionalMembership",
    label: "Professional Membership",
    type: "text",
    placeholder: "Professional bodies",
  },

  {
    name: "vesselTypes",
    label: "Vessel Types Worked With",
    type: "textarea",
    placeholder: "Fishing Boats, Ferries, Cargo Vessels...",
  },

  {
    name: "maritimeLicenseNumber",
    label: "License / Certificate Number",
    type: "text",
    placeholder: "If applicable",
  },

  {
    name: "additionalInformation",
    label: "Additional Maritime Information",
    type: "textarea",
    placeholder: "Anything else relevant",
  },
];

export default maritimeInformationFields;