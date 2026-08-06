import { z } from "zod";

const EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function optionalEmail() {
  return z
    .string()
    .trim()
    .refine(
      (value) =>
        value === "" ||
        EMAIL_REGEX.test(value),
      {
        message:
          "Enter a valid email address.",
      }
    );
}