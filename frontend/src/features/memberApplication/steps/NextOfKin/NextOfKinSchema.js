import { z } from "zod";
import {
  requiredText,
  requiredSelect,
} from "../../../../utils/validation";

// Safe drafting fallback wrappers for optional properties
const optionalText = (max = 255) => 
  z.string().trim().max(max).optional().or(z.literal(""));

const optionalPhoneNumber = () => 
  z.string().trim().optional().or(z.literal(""));

const optionalEmail = () =>
  z.string()
    .trim()
    .superRefine((value, ctx) => {
      // If the field is blank or being typed, don't crash the draft validation
      if (!value || value === "") return;

      // Only validate syntax rules if characters are present
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid email format",
        });
      }
    });

const nextOfKinSchema = z.object({
  fullName: requiredText("Full Name"),
  relationship: requiredSelect("Relationship"),
  
  // Custom non-blocking phone wrapper
  phoneNumber: z.string().trim().min(1, "Phone Number is required."), 
  
  alternativePhoneNumber: optionalPhoneNumber(),
  email: optionalEmail(),
  nationalId: optionalText(30),
  county: requiredSelect("County"),
  town: requiredText("Town / City"),
  
  physicalAddress: requiredText("Physical Address", 5, 500),
  postalAddress: optionalText(),
  postalCode: optionalText(10),
});

export default nextOfKinSchema;
