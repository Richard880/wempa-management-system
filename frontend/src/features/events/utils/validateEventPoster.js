import EVENT_POSTER_CONFIG from "../constants/eventPosterConfig";

/**
 * ==========================================
 * Validate Event Poster
 * ==========================================
 *
 * Validates poster files before they enter
 * the upload queue.
 */

export default function validateEventPoster(file) {
  if (!file) {
    throw new Error(
      "Please select an event poster."
    );
  }

  /*
  ----------------------------------------
  Validate File Type
  ----------------------------------------
  */

  if (
    !EVENT_POSTER_CONFIG.acceptedTypes.includes(
      file.type
    )
  ) {
    throw new Error(
      "Only JPG, PNG, and WEBP images are allowed."
    );
  }

  /*
  ----------------------------------------
  Validate File Size
  ----------------------------------------
  */

  if (
    file.size >
    EVENT_POSTER_CONFIG.maxSizeInBytes
  ) {
    throw new Error(
      `The event poster must not exceed ${EVENT_POSTER_CONFIG.maxSizeInMB} MB.`
    );
  }

  return true;
}