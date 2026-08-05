import { z } from "zod";
import {
  requiredSelect,
  requiredText,
} from "../../../../utils/validation";

// Safe fallback layout wrappers for optional properties
const optionalText = (max = 255) => 
  z.string().trim().max(max).optional().or(z.literal(""));

const employmentInformationSchema = z.object({
  employmentStatus: requiredSelect("Employment Status"),
  employerName: requiredText("Employer", 2, 150),
  organizationType: requiredSelect("Organization Type"),
  jobTitle: requiredText("Job Title", 2, 100),
  department: optionalText(100),
  workStation: optionalText(150),
  staffNumber: optionalText(50),
  
  // Non-blocking date logic
  employmentDate: z.string().trim().superRefine((val, ctx) => {
    if (!val || val === "") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Employment Start Date is required." });
    }
  }),
  
  // Non-blocking income layout logic
  monthlyIncome: z.string().trim().optional().or(z.literal("")),
  
  maritimeSector: requiredSelect("Maritime Sector"),
  professionalLevel: requiredSelect("Professional Level"),
});

export default employmentInformationSchema;
