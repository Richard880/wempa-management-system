import { z } from "zod";

export default function optionalText(
  max = 255
) {
  return z.preprocess(
    (value) =>
      value === "" ? undefined : value,
    z
      .string()
      .trim()
      .max(max)
      .optional()
  );
}