import { z } from "zod";
import { KRA_PIN_REGEX } from "./regex";

/*
----------------------------------------
KRA PIN Validator (Draft-Safe)
----------------------------------------
Validates a Kenya Revenue Authority
Personal Identification Number (PIN).
----------------------------------------
*/
export default function kraPin(fieldName = "KRA PIN") {
  return z
    .string({
      required_error: `${fieldName} is required.`,
    })
    .trim()
    .superRefine((value, ctx) => {
      // Guard condition: if string is empty, trigger a missing error but let the model structure parse safely
      if (!value || value === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${fieldName} is required.`,
        });
        return;
      }

      // Enforce the strict alphanumeric pattern if characters exist
      if (!KRA_PIN_REGEX.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Enter a valid ${fieldName}.`,
        });
      }
    });
}
