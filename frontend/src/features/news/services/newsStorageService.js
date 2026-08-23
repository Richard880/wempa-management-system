// src/features/news/services/newsStorageService.js
import { getFirestore, collection, doc, setDoc, getDocs, query,  limit, where } from "firebase/firestore";

const db = getFirestore();
const NEWS_COLLECTION = "news";

export const newsStorageService = {
  // Saves news metadata and poster details
  async saveNews(newsId, newsData) {
    const newsRef = doc(db, NEWS_COLLECTION, newsId);
    const payload = {
      id: newsId,
      ...newsData,
      updatedAt: new Date().toISOString(),
      createdAt: newsData.createdAt || new Date().toISOString()
    };
    await setDoc(newsRef, payload, { merge: true });
    return payload;
  },

  // Fetches all news ordered by creation date
 // src/features/news/services/newsStorageService.js

  // Fetches all news ordered by creation date safely
  async getAllNews() {
    try {
      // 🟢 Fix: Query the raw collection without ordering parameters to bypass index limits
      const q = query(collection(db, NEWS_COLLECTION));
      const snapshot = await getDocs(q);
      const docsData = snapshot.docs.map(doc => doc.data());
      
      // 🟢 Client-Side Sorting: Order chronologically inside local browser cache memory
      return docsData.sort((a, b) => {
        const dateA = new Date(a.createdAt || a.updatedAt || 0);
        const dateB = new Date(b.createdAt || b.updatedAt || 0);
        return dateB - dateA; // Sorts descending (newest articles first)
      });
    } catch (err) {
      console.error("Failed to fetch news index array collection:", err);
      throw err;
    }
  },


  // Fetches recommendations based on category, excluding current article safely
  async getRecommendations(category, currentNewsId) {
    try {
      // 🟢 Fix: Query only by category and limit to 4 items max
      const q = query(
        collection(db, NEWS_COLLECTION),
        where("category", "==", category),
        limit(4) 
      );
      
      const snapshot = await getDocs(q);
      const rawDocs = snapshot.docs.map(doc => doc.data());
      
      // 🟢 Client-Side Filtering: Remove the active article and slice back down to 3 items
      return rawDocs
        .filter(item => item.id !== currentNewsId)
        .slice(0, 3);

    } catch (err) {
      console.error("Failed to fetch recommendation collections block:", err);
      return []; // Return empty array gracefully if it encounters errors
    }
  }
};
