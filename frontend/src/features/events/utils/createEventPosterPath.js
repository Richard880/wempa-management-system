import EVENT_POSTER_CONFIG from "../constants/eventPosterConfig";

/**
 * ==========================================
 * Create Event Poster Storage Path
 * ==========================================
 *
 * Generates the Firebase Storage path for
 * an event poster.
 *
 * Example:
 *
 * events/event-123/poster/conference.jpg
 */

export default function createEventPosterPath({
  eventId,
  fileName,
}) {
  if (!eventId) {
    throw new Error(
      "An event ID is required to create the poster storage path."
    );
  }

  if (!fileName) {
    throw new Error(
      "A poster file name is required to create the storage path."
    );
  }

  return [
    EVENT_POSTER_CONFIG.storageFolder,
    eventId,
    EVENT_POSTER_CONFIG.posterFolder,
    fileName,
  ].join("/");
}