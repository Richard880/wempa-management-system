import EMPLOYMENT_STATUS from "../../../../constants/employmentStatus";
import ORGANIZATION_TYPES from "../../../../constants/organizationTypes";
import MARITIME_SECTORS from "../../../../constants/maritimeSectors";
import PROFESSIONAL_LEVELS from "../../../../constants/professionalLevels";

const employmentInformationFields = [
  /*
  ----------------------------------------
  Employment
  ----------------------------------------
  */

  {
    name: "employmentStatus",
    label: "Employment Status",
    type: "select",
    options: EMPLOYMENT_STATUS,
    required: true,
  },

  {
    name: "employerName",
    label: "Employer / Organization",
    type: "text",
    placeholder: "Employer Name",
    required: true,
  },

  {
    name: "organizationType",
    label: "Organization Type",
    type: "select",
    options: ORGANIZATION_TYPES,
    required: true,
  },

  {
    name: "jobTitle",
    label: "Job Title",
    type: "text",
    placeholder: "Current Position",
    required: true,
  },

  {
    name: "department",
    label: "Department",
    type: "text",
    placeholder: "Department",
  },

  {
    name: "workStation",
    label: "Work Station",
    type: "text",
    placeholder: "Duty Station",
  },

  {
    name: "staffNumber",
    label: "Staff Number",
    type: "text",
    placeholder: "If Applicable",
  },

  {
    name: "employmentDate",
    label: "Employment Start Date",
    type: "date",
    required: true,
  },

  {
    name: "monthlyIncome",
    label: "Monthly Income (KES)",
    type: "number",
    placeholder: "Optional",
  },

  /*
  ----------------------------------------
  WEMPA Professional Classification
  ----------------------------------------
  */

  {
    name: "maritimeSector",
    label: "Maritime Sector",
    type: "select",
    options: MARITIME_SECTORS,
    required: true,
  },

  {
    name: "professionalLevel",
    label: "Professional Level",
    type: "select",
    options: PROFESSIONAL_LEVELS,
    required: true,
  },
];

export default employmentInformationFields;