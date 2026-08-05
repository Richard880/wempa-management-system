import { z } from "zod";

export default function email(fieldName = "Email Address") {
  return z
    .string({
      required_error: `${fieldName} is required.`,
    })
    .trim()
    .min(1, `${fieldName} is required.`)
    .email("Please enter a valid email address.");
}
