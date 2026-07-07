import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../firebase/config";

function Payments() {
  const makePayment = async () => {
    const user = auth.currentUser;

    await addDoc(collection(db, "payments"), {
      userId: user.uid,
      membershipNumber: "WEMPA-2026-0001",
      amount: 1000,
      mpesaCode: "TEST12345",
      status: "Paid",
      paymentDate: new Date(),
    });

    alert("Payment Recorded");
  };

  return (
    <div>
      <h1>Payments</h1>

      <button onClick={makePayment}>Simulate Payment</button>
    </div>
  );
}

export default Payments;
