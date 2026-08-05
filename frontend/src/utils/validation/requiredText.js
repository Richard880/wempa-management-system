import { z } from "zod";

export default function requiredText(
  label,
  min = 2,
  max = 255
) {
  return z
    .string({
      required_error: `${label} is required.`,
    })
    .trim()
    .min(min, `${label} is required.`)
    .max(max, `${label} is too long.`);
}