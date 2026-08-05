// src/features/application/steps/Review/utils/formatReviewValue.js

/**
 * --------------------------------------------------------
 * Format Review Value
 * --------------------------------------------------------
 *
 * Normalizes values for display within the
 * application review step.
 *
 * Responsibilities:
 * - Handle null/undefined values
 * - Format booleans
 * - Format dates
 * - Format arrays
 * - Format numbers
 * - Return safe display strings
 *
 * This utility never mutates the input.
 * --------------------------------------------------------
 */

export default function formatReviewValue(value) {
  /*
  ----------------------------------------
  Empty Values
  ----------------------------------------
  */

  if (value === null || value === undefined) {
    return "—";
  }

  /*
  ----------------------------------------
  Empty String
  ----------------------------------------
  */

  if (typeof value === "string") {
    const trimmed = value.trim();

    return trimmed.length > 0
      ? trimmed
      : "—";
  }

  /*
  ----------------------------------------
  Boolean
  ----------------------------------------
  */

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  /*
  ----------------------------------------
  Number
  ----------------------------------------
  */

  if (typeof value === "number") {
    return Number.isFinite(value)
      ? value.toLocaleString()
      : "—";
  }

  /*
  ----------------------------------------
  Date
  ----------------------------------------
  */

  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) {
      return "—";
    }

    return new Intl.DateTimeFormat("en-KE", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(value);
  }

  /*
  ----------------------------------------
  Timestamp (milliseconds)
  ----------------------------------------
  */

  if (
    typeof value === "number" &&
    value > 100000000000
  ) {
    return new Intl.DateTimeFormat("en-KE", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(value));
  }

  /*
  ----------------------------------------
  Array
  ----------------------------------------
  */

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return "—";
    }

    return value.join(", ");
  }

  /*
  ----------------------------------------
  Object
  ----------------------------------------
  */

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  /*
  ----------------------------------------
  Fallback
  ----------------------------------------
  */

  return String(value);
}