// src/utils/generateMembershipNumber.js
import { doc, runTransaction } from "firebase/firestore";
import { db } from "../firebase"; // Adjust path to your firebase file

export async function generateMembershipNumber() {
  // Point to a persistent tracker document in your DB
  const counterRef = doc(db, "system_metadata", "membership_counter");

  try {
    const nextNumber = await runTransaction(db, async (transaction) => {
      const counterDoc = await transaction.get(counterRef);

      // 🟢 THE FIX: If the document doesn't exist yet, initialize it inside the transaction!
      if (!counterDoc.exists()) {
        const initialCount = 1001; // Start membership numbers at 1001
        transaction.set(counterRef, { currentCount: initialCount });
        return `WMP-${initialCount}`;
      }

      // If it exists, read the existing count and increment it safely [1]
      const currentCount = counterDoc.data().currentCount;
      const updatedCount = currentCount + 1;

      transaction.update(counterRef, { currentCount: updatedCount });
      
      // Return padded string layout format (e.g., WMP-1002)
      return `WMP-${updatedCount}`;
    });

    console.log("🎯 SAFELY ACQUIRED TRANSACTION ID:", nextNumber);
    return nextNumber;

  } catch (error) {
    console.error("❌ TRANSACTION CRASH DETAILS:", error);
    // Return a timestamp fallback so the user registration never locks out completely
    return `WMP-${Date.now().toString().slice(-6)}`;
  }
}
