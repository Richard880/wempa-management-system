import { z } from "zod";

const optionalCurrency = () =>
  z.preprocess(
    (value) => {
      if (value === "" || value == null) {
        return undefined;
      }
      return Number(value);
    },
    z
      .number({
        invalid_type_error: "Enter a valid amount.",
      })
      .nonnegative("Amount cannot be negative.")
      .optional()
  );

export default optionalCurrency;
