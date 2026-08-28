import { db } from '../../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Aligned directly with your Firestore Security Rules match block
const SETTINGS_COLLECTION = 'settings'; 
const GENERAL_DOC_ID = 'general';

export const settingsService = {
  /**
   * Fetches general system configurations
   */
  async getGeneralSettings() {
    try {
      const docRef = doc(db, SETTINGS_COLLECTION, GENERAL_DOC_ID);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return docSnap.data();
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching general settings:', error);
      throw error;
    }
  },

  /**
   * Updates or initializes general system configurations
   */
  async updateGeneralSettings(settingsData) {
    try {
      const docRef = doc(db, SETTINGS_COLLECTION, GENERAL_DOC_ID);
      await setDoc(docRef, {
        ...settingsData,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      return true;
    } catch (error) {
      console.error('Error updating general settings:', error);
      throw error;
    }
  }
};
