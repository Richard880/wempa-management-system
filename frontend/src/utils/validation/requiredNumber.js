import { z } from "zod";

/*
----------------------------------------
Required Number Validator
----------------------------------------

Validates required numeric inputs and
coerces HTML input values from strings
to numbers.

Example:

yearsOfExperience:
requiredNumber("Years of Maritime Experience")
----------------------------------------
*/

export default function requiredNumber(
  label = "This field"
) {
  return z.coerce.number({
    required_error: `${label} is required.`,
    invalid_type_error: `${label} must be a valid number.`,
  })
  .int(`${label} must be a whole number.`)
  .min(0, `${label} cannot be negative.`);
}