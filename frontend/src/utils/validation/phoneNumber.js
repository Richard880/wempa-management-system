import { z } from "zod";

export default function phoneNumber(
  fieldName = "Phone Number"
) {
  return z
    .string({
      required_error: `${fieldName} is required.`,
    })
    .trim()
    .regex(
      /^(?:\+254|254|0)(7|1)\d{8}$/,
      "Please enter a valid Kenyan phone number."
    );
}