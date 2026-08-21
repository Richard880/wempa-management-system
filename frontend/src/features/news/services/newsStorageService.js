import { getFirestore, collection, doc, setDoc, getDocs, query, orderBy, limit, where } from "firebase/firestore";

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
  async getAllNews() {
    const q = query(collection(db, NEWS_COLLECTION), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data());
  },

  // Fetches recommendations based on category, excluding current article
  async getRecommendations(category, currentNewsId) {
    const q = query(
      collection(db, NEWS_COLLECTION),
      where("category", "==", category),
      where("id", "!=", currentNewsId),
      limit(3)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data());
  }
};
