import { z } from "zod";

import {
  NAME_REGEX,
  KRA_PIN_REGEX,
  NATIONAL_ID_REGEX,
  KENYAN_PHONE_REGEX,
} from "./regex";

import { isAdult } from "./validators";

/*
|--------------------------------------------------------------------------
| Required Text
|--------------------------------------------------------------------------
*/

export const requiredText = (
  label,
  min = 2,
  max = 255
) =>
  z
    .string()
    .trim()
    .min(min, `${label} is required.`)
    .max(max, `${label} cannot exceed ${max} characters.`);

/*
|--------------------------------------------------------------------------
| Required Name
|--------------------------------------------------------------------------
*/

export const requiredName = (label) =>
  requiredText(label, 2, 50).regex(
    NAME_REGEX,
    `${label} contains invalid characters.`
  );

/*
|--------------------------------------------------------------------------
| Required Email
|--------------------------------------------------------------------------
*/

export const requiredEmail = () =>
  z
    .string()
    .trim()
    .email("Please enter a valid email address.");

/*
|--------------------------------------------------------------------------
| Required Phone
|--------------------------------------------------------------------------
*/

export const requiredPhone = () =>
  z
    .string()
    .trim()
    .regex(
      KENYAN_PHONE_REGEX,
      "Please enter a valid Kenyan phone number."
    );

/*
|--------------------------------------------------------------------------
| National ID
|--------------------------------------------------------------------------
*/

export const nationalId = () =>
  z
    .string()
    .trim()
    .regex(
      NATIONAL_ID_REGEX,
      "Please enter a valid National ID."
    );

/*
|--------------------------------------------------------------------------
| KRA PIN
|--------------------------------------------------------------------------
*/

export const kraPin = () =>
  z
    .string()
    .trim()
    .toUpperCase()
    .regex(
      KRA_PIN_REGEX,
      "Please enter a valid KRA PIN."
    );

/*
|--------------------------------------------------------------------------
| Adult Date
|--------------------------------------------------------------------------
*/

export const adultDate = () =>
  z
    .string()
    .min(1, "Date of birth is required.")
    .refine(
      (value) => !Number.isNaN(Date.parse(value)),
      "Invalid date."
    )
    .refine(
      (value) => !isNaN(new Date(value).getTime()),
      "Invalid date."
    )
    .refine(
      (value) => new Date(value) <= new Date(),
      "Date of birth cannot be in the future."
    )
    .refine(
      (value) => isAdult(value),
      "Applicant must be at least 18 years old."
    );

/*
|--------------------------------------------------------------------------
| Required Select
|--------------------------------------------------------------------------
*/

export const requiredSelect = (label) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required.`);