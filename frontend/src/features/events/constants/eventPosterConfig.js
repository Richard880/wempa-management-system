/**
 * ==========================================
 * Event Poster Upload Configuration
 * ==========================================
 *
 * Centralized configuration for event poster
 * validation and Firebase Storage metadata.
 */

const EVENT_POSTER_CONFIG = {
  /*
  ----------------------------------------
  Accepted File Types
  ----------------------------------------
  */

  acceptedTypes: [
    "image/jpeg",
    "image/png",
    "image/webp",
  ],

  acceptedExtensions: [
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
  ],

  /*
  ----------------------------------------
  File Size
  ----------------------------------------
  */

  maxSizeInMB: 5,

  maxSizeInBytes: 5 * 1024 * 1024,

  /*
  ----------------------------------------
  Upload Configuration
  ----------------------------------------
  */

  storageFolder: "events",

  posterFolder: "poster",
};

export default EVENT_POSTER_CONFIG;