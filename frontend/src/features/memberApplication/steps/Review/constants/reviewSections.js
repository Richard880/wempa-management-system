// src/features/application/steps/Review/constants/reviewSections.js

export default [
  {
    id: "personal", // Matches database key
    title: "Personal Information",
    editStep: 1,    // Matches APPLICATION_STEPS id for Personal
    fields: [
      { key: "firstName", label: "First Name" },
      { key: "middleName", label: "Middle Name" },
      { key: "lastName", label: "Last Name" },
      { key: "gender", label: "Gender" },
      { key: "dateOfBirth", label: "Date of Birth" },
      { key: "nationality", label: "Nationality" },
      { key: "idNumber", label: "National ID" },
      { key: "kraPin", label: "KRA PIN" },
    ],
  },

  {
    id: "contact", // Matches database key
    title: "Contact Information",
    editStep: 2,   // Matches APPLICATION_STEPS id for Contact
    fields: [
      { key: "email", label: "Email Address" },
      { key: "phoneNumber", label: "Phone Number" },
      { key: "alternativePhoneNumber", label: "Alternative Phone" },
      { key: "county", label: "County" },
      { key: "subCounty", label: "Sub County" },
      { key: "ward", label: "Ward" },
      { key: "town", label: "Town" },
      { key: "physicalAddress", label: "Physical Address" },
      { key: "postalAddress", label: "Postal Address" },
      { key: "postalCode", label: "Postal Code" },
    ],
  },

  {
    id: "employment", // Matches database key
    title: "Employment Information",
    editStep: 3,      // Matches APPLICATION_STEPS id for Employment
    fields: [
      { key: "employmentStatus", label: "Employment Status" },
      { key: "employerName", label: "Employer" },
      { key: "organizationType", label: "Organization Type" },
      { key: "jobTitle", label: "Job Title" },
      { key: "department", label: "Department" },
      { key: "workStation", label: "Work Station" },
      { key: "staffNumber", label: "Staff Number" },
      { key: "employmentDate", label: "Employment Date" },
      { key: "monthlyIncome", label: "Monthly Income" },
    ],
  },

  {
    id: "maritime", // Matches database key
    title: "Maritime Information",
    editStep: 4,    // Matches APPLICATION_STEPS id for Maritime
    fields: [
      { key: "maritimeCategory", label: "Maritime Category" },
      { key: "currentOccupation", label: "Current Occupation" },
      { key: "organization", label: "Organization" },
      { key: "designation", label: "Designation" },
      { key: "yearsOfExperience", label: "Years of Experience" },
      { key: "maritimeQualifications", label: "Qualifications" },
      { key: "professionalMembership", label: "Professional Membership" },
      { key: "vesselTypes", label: "Vessel Types" },
      { key: "maritimeLicenseNumber", label: "License Number" },
      { key: "additionalInformation", label: "Additional Information" },
    ],
  },

  {
    id: "emergencyContact", // Added to catch missing summary row block
    title: "Emergency Contact",
    editStep: 5,            // Matches APPLICATION_STEPS id for Emergency Contact
    fields: [
      { key: "fullName", label: "Full Name" },
      { key: "relationship", label: "Relationship" },
      { key: "phoneNumber", label: "Phone Number" },
      { key: "alternativePhoneNumber", label: "Alternative Phone" },
    ],
  },

  {
    id: "nextOfKin", // Matches database key
    title: "Next of Kin",
    editStep: 6,     // Matches APPLICATION_STEPS id for Next of Kin
    fields: [
      { key: "fullName", label: "Full Name" },
      { key: "relationship", label: "Relationship" },
      { key: "phoneNumber", label: "Phone Number" },
      { key: "alternativePhoneNumber", label: "Alternative Phone" },
      { key: "email", label: "Email" },
      { key: "nationalId", label: "National ID" },
      { key: "county", label: "County" },
      { key: "town", label: "Town" },
      { key: "physicalAddress", label: "Physical Address" },
      { key: "postalAddress", label: "Postal Address" },
      { key: "postalCode", label: "Postal Code" },
    ],
  },

  {
    id: "documents", // Matches database key
    title: "Supporting Documents",
    editStep: 7,     // Matches APPLICATION_STEPS id for Documents
    fields: [],
  },
];
