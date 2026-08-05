import { collection, getCountFromServer, query, where } from "firebase/firestore";
import { db } from "../firebase";

async function countCollection(name) {
  try {
    // getCountFromServer performs the math on the server instead of downloading documents
    const coll = collection(db, name);
    const snapshot = await getCountFromServer(coll);
    return snapshot.data().count;
  } catch (error) {
    console.error(`Error loading ${name}:`, error);
    return 0;
  }
}

export async function getStatistics() {
  // 1. Run counts efficiently
  const users = await countCollection("users");
  const applications = await countCollection("memberships");
  const events = await countCollection("events");

  // 2. Count active members efficiently using a query
  let activeMembers = 0;
  try {
    const activeQuery = query(collection(db, "users"), where("membershipStatus", "==", "Active"));
    const activeSnapshot = await getCountFromServer(activeQuery);
    activeMembers = activeSnapshot.data().count;
  } catch (error) {
    console.error("Error loading active members:", error);
  }

  return {
    users,
    activeMembers,
    applications,
    events,
  };
}
