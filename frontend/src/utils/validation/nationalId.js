import { z } from "zod";
import { NATIONAL_ID_REGEX, PASSPORT_REGEX } from "./regex";

/*
----------------------------------------
National ID / Passport Validator (Draft-Safe)
----------------------------------------
Validates either a Kenyan National ID
or Passport Number. Safe for auto-save loops.
----------------------------------------
*/
export default function nationalId(fieldName = "National ID / Passport Number") {
  return z
    .string({
      required_error: `${fieldName} is required.`,
    })
    .trim()
    .superRefine((value, ctx) => {
      // 1. Check if the field is completely empty
      if (!value || value === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${fieldName} is required.`,
        });
        return;
      }

      // 2. Validate against regex rules if characters are present
      const isValidId = NATIONAL_ID_REGEX.test(value);
      const isValidPassport = PASSPORT_REGEX.test(value);

      if (!isValidId && !isValidPassport) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Enter a valid ${fieldName}.`,
        });
      }
    });
}
