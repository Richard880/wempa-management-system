// src/features/members/steps/EmploymentInformation/EmploymentInformationSchema.js
import { z } from "zod";
import {
  requiredSelect,
  requiredText,
} from "../../../../utils/validation";

// Safe fallback layout wrappers for optional properties
const optionalText = (max = 255) => 
  z.string().trim().max(max).optional().or(z.literal(""));

const employmentInformationSchema = z.object({
  // 🟢 REQUIRED FIELDS (Present in your UI fields array configuration)
  employmentStatus: requiredSelect("Employment Status"),
  employerName: requiredText("Employer / Institution", 2, 150),
  organizationType: requiredSelect("Organization Type"),
  jobTitle: requiredText("Job Title", 2, 100),
  
  // 🟢 OPTIONAL FIELDS (Present in your UI fields array configuration)
  department: optionalText(100),
  Specialization: optionalText(150),

  // 🟢 NUMERIC RANGE INTEGRATION (Matches your specific custom space-cased string name indicator)
  "Years Of Maritime Experience": z.union([z.number(), z.string()])
    .transform((val) => {
      if (val === "" || val === undefined || val === null) return 0;
      return Number(val);
    })
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "Years of experience must be a valid positive number.",
    }),
});

export default employmentInformationSchema;
