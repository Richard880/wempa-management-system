import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

async function countCollection(name) {
  try {
    const snapshot = await getDocs(collection(db, name));
    return snapshot.size;
  } catch (error) {
    console.error(`Error loading ${name}:`, error);
    return 0;
  }
}

export async function getStatistics() {
  const users = await countCollection("users");
  const applications = await countCollection("memberships");
  const events = await countCollection("events");

  const activeMembersSnapshot = await getDocs(
    query(collection(db, "users"), where("membershipStatus", "==", "Active")),
  );

  return {
    users,
    activeMembers: activeMembersSnapshot.size,
    applications,
    events,
  };
}
