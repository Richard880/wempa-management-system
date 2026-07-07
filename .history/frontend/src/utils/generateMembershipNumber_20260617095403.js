import { doc, runTransaction } from "firebase/firestore";
import { db } from "../firebase/config";

export async function generateMembershipNumber() {
  const counterRef = doc(db, "counters", "membershipCounter");

  let membershipNumber = "";

  await runTransaction(db, async (transaction) => {
    const counterDoc = await transaction.get(counterRef);

    if (!counterDoc.exists()) {
      throw new Error("membershipCounter document does not exist");
    }

    const current = counterDoc.data().lastNumber || 0;

    const next = current + 1;

    transaction.update(counterRef, {
      lastNumber: next,
    });

    membershipNumber = `WEMPA-${new Date().getFullYear()}-${String(next).padStart(4, "0")}`;
  });

  return membershipNumber;
}
