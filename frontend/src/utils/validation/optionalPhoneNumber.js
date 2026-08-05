import { z } from "zod";

const PHONE_REGEX =
  /^(?:\+254|254|0)(7|1)\d{8}$/;

export default function optionalPhoneNumber(
  fieldName = "Phone Number"
) {
  return z
    .string()
    .trim()
    .refine(
      (value) =>
        value === "" ||
        PHONE_REGEX.test(value),
      {
        message: `Please enter a valid Kenyan ${fieldName.toLowerCase()}.`,
      }
    )
    .optional();
}