import { z } from "zod";

/*
----------------------------------------
Adult Date Validator (Draft-Safe)
----------------------------------------
Validates that the applicant has reached
the minimum required age if filled. Allows
empty values during intermediate auto-saves.
----------------------------------------
*/
export default function adultDate(minimumAge = 18) {
  return z
    .string({
      required_error: "Date of Birth is required.",
    })
    .superRefine((value, ctx) => {
      // Allow draft forms to save if the user hasn't interacted with or typed in the date picker yet
      if (!value || value.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Date of Birth is required.",
        });
        return;
      }

      const birthDate = new Date(value);
      // Check for invalid date formatting parsed by JS engine
      if (isNaN(birthDate.getTime())) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Enter a valid date format.",
        });
        return;
      }

      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();

      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      if (age < minimumAge) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Applicant must be at least ${minimumAge} years old.`,
        });
      }
    });
}
