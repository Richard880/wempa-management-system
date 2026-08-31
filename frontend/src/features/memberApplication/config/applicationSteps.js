// src/features/members/config/applicationSteps.js

export const APPLICATION_STEPS = [
  {
    id: 1,
    key: "personal",
    title: "Personal Information",
    weight: 16.66,
  },
  {
    id: 2,
    key: "contact",
    title: "Contact Information",
    weight: 16.66,
  },
  {
    id: 3,
    key: "employment",
    title: "Employment Information",
    weight: 16.66,
  },
  {
    id: 4,
    key: "documents",
    title: "Supporting Documents",
    weight: 16.66,
  },
  {
    id: 5,
    key: "review",
    title: "Review & Declaration", // Unified summary checkpoint
    weight: 16.66,
  },
  {
    id: 6,
    key: "payment",
    title: "M-Pesa Payment", // True linear final application action
    weight: 16.70, // Adjusted to round up perfectly to exactly 100.00%
  },
];

export default APPLICATION_STEPS;
