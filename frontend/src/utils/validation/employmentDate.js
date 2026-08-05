import { z } from "zod";

export default function employmentDate() {
  return z
    .string({
      required_error: "Employment start date is required.",
    })
    .min(1, "Employment start date is required.")
    .refine(
      (value) => {
        const dateValue = new Date(value);
        return !isNaN(dateValue.getTime()) && dateValue <= new Date();
      },
      {
        message: "Employment date cannot be in the future.",
      }
    );
}
