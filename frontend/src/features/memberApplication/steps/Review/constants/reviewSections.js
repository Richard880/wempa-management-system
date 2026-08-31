// src/features/application/steps/Review/constants/reviewSections.js

export default [
  {
    id: "personal", // Matches Firestore document database branch key
    title: "Personal Information",
    editStep: 1,    // Points perfectly to Step 1 in APPLICATION_STEPS 
    fields: [
      { key: "membershipNumber", label: "Membership Number" }, // Auto-assigned identification
      { key: "firstName", label: "First Name" },
      { key: "middleName", label: "Middle Name" },
      { key: "lastName", label: "Last Name" },
      { key: "gender", label: "Gender" },
      { key: "dateOfBirth", label: "Date of Birth" },
      { key: "nationality", label: "Nationality" },
      { key: "idNumber", label: "National ID / Passport" },
    ],
  },

  {
    id: "contact", // Matches Firestore document database branch key
    title: "Contact Information",
    editStep: 2,   // Points perfectly to Step 2 in APPLICATION_STEPS
    fields: [
      { key: "email", label: "Email Address" },
      { key: "phoneNumber", label: "Phone Number" },
      { key: "alternativePhoneNumber", label: "Alternative Phone" },
      { key: "physicalAddress", label: "Physical Address" },
    ],
  },

  {
    id: "employment", // Matches Firestore document database branch key
    title: "Employment Information",
    editStep: 3,      // Points perfectly to Step 3 in APPLICATION_STEPS
    fields: [
      { key: "employmentStatus", label: "Employment Status" },
      { key: "employerName", label: "Employer / Institution" },
      { key: "organizationType", label: "Organization Type" },
      { key: "jobTitle", label: "Job Title" },
      { key: "department", label: "Course / Department" },
      { key: "Specialization", label: "Area of Specialization" }, // 🟢 FIXED: Casing matched exactly to input name
      { key: "Years Of Maritime Experience", label: "Years of Experience" }, // 🟢 RESTORED: Space-cased string key linked safely
    ],
  },

  {
    id: "documents", // Matches Firestore document database branch key
    title: "Supporting Documents",
    editStep: 4,     // 🟢 OPTIMIZED: Synchronized with Step 4 tracking targets
    fields: [],      // Handled independently via your custom file thumbnail gallery mapping loops
  },
];
