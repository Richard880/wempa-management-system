import { z } from "zod";

/*
----------------------------------------
Required Select Validator (Draft-Safe)
----------------------------------------
Validates option dropdown selections ensuring 
a value is chosen without blocking draft auto-saves.
----------------------------------------
*/
export default function requiredSelect(label) {
  return z
    .string({
      required_error: `Please select ${label}.`,
    })
    .trim()
    .superRefine((value, ctx) => {
      // Check if a valid option string was selected
      if (!value || value === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Please select ${label}.`,
        });
      }
    });
}
