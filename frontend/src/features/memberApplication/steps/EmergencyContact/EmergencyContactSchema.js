import { z } from "zod";
import {
  requiredText,
  requiredSelect,
} from "../../../../utils/validation";

// Safe drafting fallback wrappers for optional properties
const optionalPhoneNumber = () => 
  z.string().trim().optional().or(z.literal(""));

const optionalEmail = () =>
  z.string()
    .trim()
    .superRefine((value, ctx) => {
      // If the field is blank or being typed, let the draft pass validation cleanly
      if (!value || value === "") return;

      // Only evaluate structural syntax requirements once characters are keyed in
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid email format",
        });
      }
    });

const emergencyContactSchema = z.object({
  fullName: requiredText("Emergency Contact Name", 2, 150),
  relationship: requiredSelect("Relationship"),
  
  // Custom non-blocking phone validation pattern
  phoneNumber: z.string().trim().min(1, "Primary Phone Number is required."),
  
  alternativePhoneNumber: optionalPhoneNumber(),
  email: optionalEmail(),
  physicalAddress: requiredText("Physical Address", 5, 255),
});

export default emergencyContactSchema;
