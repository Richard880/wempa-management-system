import { z } from "zod";

/*
----------------------------------------
Required Name Validator (Draft-Safe)
----------------------------------------
Validates name fields ensuring they meet length
and character constraints without killing auto-saves.
----------------------------------------
*/
export default function requiredName(label, min = 2, max = 100) {
  return z
    .string({
      required_error: `${label} is required.`,
    })
    .trim()
    .superRefine((value, ctx) => {
      // 1. Explicit empty string handling
      if (!value || value === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${label} is required.`,
        });
        return;
      }

      // 2. Minimum length restriction check
      if (value.length < min) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${label} must be at least ${min} characters.`,
        });
      }

      // 3. Maximum length restriction check
      if (value.length > max) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${label} cannot exceed ${max} characters.`,
        });
      }

      // 4. Character safety check matching alphabetic letters and symbols
      const nameRegex = /^[A-Za-zÀ-ÿ' -]+$/;
      if (!nameRegex.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${label} contains invalid characters.`,
        });
      }
    });
}
