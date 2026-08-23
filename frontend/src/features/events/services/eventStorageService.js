// src/features/events/services/eventStorageService.js
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  query, 
  orderBy,
  where // 🟢 1. Added missing where import
} from "firebase/firestore";

const db = getFirestore();
const EVENTS_COLLECTION = "events";
const REGISTRATIONS_COLLECTION = "registrations"; // 🟢 2. Declared missing collection string variable

export const eventStorageService = {
  /**
   * Save consolidated metadata fields along with the nested image details
   */
  async saveEvent(eventId, eventData) {
    if (!eventId) throw new Error("eventId is mandatory to sync structural items.");
    
    const eventRef = doc(db, EVENTS_COLLECTION, eventId);
    const documentPayload = {
      id: eventId,
      ...eventData,
      updatedAt: new Date().toISOString()
    };

    await setDoc(eventRef, documentPayload, { merge: true });
    return documentPayload;
  },

  /**
   * Pulls structural chronological list of all saved events
   */
  async getAllEvents() {
    const eventsRef = collection(db, EVENTS_COLLECTION);
    const q = query(eventsRef, orderBy("date", "asc"));
    const querySnapshot = await getDocs(q);
    
    const events = [];
    querySnapshot.forEach((doc) => {
      events.push(doc.data());
    });
    
    return events;
  },

  /**
   * Pulls registrations filtered by eventId
   */
  // src/features/events/services/eventStorageService.js

async getEventRegistrations(eventId) {
  try {
    const q = query(
      collection(db, REGISTRATIONS_COLLECTION),
      where("eventId", "==", eventId) // 🟢 Removed the .orderBy() to bypass index requirements
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data());
  } catch (err) {
    console.error(`Failed to fetch attendees for event ${eventId}:`, err);
    throw err;
  }
}

}; // 🟢 3. Cleaned up trailing brackets syntax error here
