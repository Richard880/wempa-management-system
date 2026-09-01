// frontend/src/features/members/steps/payments/MpesaPayment.jsx
import { useState } from "react";
import { FaReceipt, FaCheckCircle, FaExclamationCircle, FaInfoCircle } from "react-icons/fa";
import styles from "./MpesaPayment.module.css";

// Your definitive business logic pricing matrix
const MEMBERSHIP_PRICING = {
  student: { key: "student", title: "Student Member", fee: 500 },
  associate: { key: "associate", title: "Associate Member", fee: 1000 },
  professional: { key: "professional", title: "Certified Professional Member", fee: 1500 },
  corporate: { key: "corporate", title: "Corporate Member", fee: 10500 },
  fellow: { key: "fellow", title: "Fellow Member", fee: 3500 },
  honorary: { key: "honorary", title: "Honorary Member", fee: 4000 }
};

export default function MpesaPayment({ application, saveSection, submitApplication }) {
  const [transactionCode, setTransactionCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusType, setStatusType] = useState("info");
  const [statusMessage, setStatusMessage] = useState("");
  const [selectedCategoryKey, setSelectedCategoryKey] = useState("student");

  const activeTier = MEMBERSHIP_PRICING[selectedCategoryKey];
  const membershipName = activeTier.title;
  const amountToPay = activeTier.fee;

  /* ==========================================================================
     🟢 MANUAL PAYBILL TRANSACTION CODE RECEIPT HANDLER
     ========================================================================== */
  const handleManualPaymentSubmit = async (e) => {
    e.preventDefault();

    // Clean and validate the M-Pesa Transaction Code Format
    const cleanCode = transactionCode.trim().toUpperCase();
    
    // M-Pesa codes are exactly 10 characters long alphanumeric strings (e.g. SAA123XYZ9)
    if (cleanCode.length !== 10) {
      setStatusType("error");
      setStatusMessage("❌ Invalid code. Please enter a valid 10-character M-Pesa transaction reference.");
      return;
    }

    setLoading(true);
    setStatusType("info");
    setStatusMessage("Recording transaction tokens to secure storage...");

    try {
      // Save both selected tier data and code reference straight to Firestore
      await saveSection("payment", {
        mpesaReceipt: cleanCode,
        amountCharged: amountToPay,
        membershipCategory: membershipName,
        paymentStatus: "PENDING_VERIFICATION", // Tells the Admin panel to review this manually
        submittedAt: new Date().toISOString()
      }, 6);

      setStatusType("success");
      setStatusMessage("🎉 Payment details filed successfully! Locking application and finalizing setup...");

      // Small breather delay for smooth visual transition
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Lock down the multi-step form wizard and push them straight to the Member Dashboard
      await submitApplication();

    } catch (error) {
      console.error("Manual payment logging error:", error);
      setStatusType("error");
      setStatusMessage(`Submission Failed: ${error.message || "Please check connection and try again."}`);
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerBlock}>
        <h3 className={styles.title}>Payment & Category Settlement</h3>
        <p className={styles.subtitle}>Select your preferred membership allocation category, follow instructions to clear dues via Lipa Na M-Pesa, then paste your confirmation code below.</p>
      </div>
      
      {/* Category Selection Dropdown Menu */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Choose Your Membership Category</label>
        <select
          value={selectedCategoryKey}
          onChange={(e) => setSelectedCategoryKey(e.target.value)}
          disabled={loading}
          className={styles.selectInput}
        >
          {Object.values(MEMBERSHIP_PRICING).map((tier) => (
            <option key={tier.key} value={tier.key}>
              {tier.title} — KES {tier.fee.toLocaleString("en-KE")}
            </option>
          ))}
        </select>
      </div>

      {/* EXPLICIT PAYMENT INSTRUCTIONS CARD */}
      <div className={styles.invoiceCard}>
        <h5 className={styles.invoiceInstructionsTitle}>💡 Lipa Na M-Pesa Paybill Instructions</h5>
        <div className={styles.invoiceRow}>
          <span>1. Select Payment Method:</span>
          <strong>M-Pesa Paybill</strong>
        </div>
        <div className={styles.invoiceRow}>
          <span>2. Enter Business Number (Shortcode):</span>
          <strong className={styles.greenText}>522533</strong>
        </div>
        <div className={styles.invoiceRow}>
          <span>3. Enter Account Number:</span>
          <strong className={styles.greenText}>8134088</strong>
        </div>
        <div className={styles.invoiceRow}>
          <span>4. Amount to pay:</span>
          <strong className={styles.blueText}>KES {amountToPay.toLocaleString("en-KE")}</strong>
        </div>
      </div>

      {/* Manual Code Verification Input Field Form Section */}
      <form onSubmit={handleManualPaymentSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>M-Pesa Transaction Code</label>
          <div className={styles.inputWrapper}>
            <div className={styles.inputIconBox}>
              <FaReceipt className="text-muted" style={{ fontSize: "16px" }} />
            </div>
            <input
              type="text"
              placeholder="Example: QAL71MX8K3"
              value={transactionCode}
              onChange={(e) => setTransactionCode(e.target.value)}
              disabled={loading}
              className={styles.inputField}
              maxLength={10}
              required
            />
          </div>
          <small className={styles.hintText}>
            Paste the 10-character code from your Safaricom payment confirmation message.
          </small>
        </div>

        <button type="submit" disabled={loading} className={styles.submitBtn}>
          {loading ? "Processing Pipeline Updates..." : "Complete Application"}
        </button>
      </form>

      {/* DYNAMIC FORM RUNTIME STATUS RIBBON */}
      {statusMessage && (
        <div 
          className={`${styles.statusContainer} ${
            statusType === "success" ? styles.statusSuccess : statusType === "error" ? styles.statusError : styles.statusInfo
          }`}
        >
          <div className={styles.statusInnerRow}>
            {statusType === "success" ? <FaCheckCircle /> : statusType === "error" ? <FaExclamationCircle /> : <FaInfoCircle />}
            <span>{statusMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}











// import { useState } from "react";
// import styles from "./MpesaPayment.module.css";

// const MEMBERSHIP_PRICING = {
//   student: { key: "student", title: "Student Member", fee: 500 },
//   associate: { key: "associate", title: "Associate Member", fee: 1000 },
//   professional: { key: "professional", title: "Certified Professional Member", fee: 1500 },
//   corporate: { key: "corporate", title: "Corporate Member", fee: 10500 },
//   fellow: { key: "fellow", title: "Fellow Member", fee: 3500 },
//   honorary: { key: "honorary", title: "Honorary Member", fee: 4000 }
// };

// export default function MpesaPayment({ application, saveSection, submitApplication }) {
//   const [phone, setPhone] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [statusType, setStatusType] = useState("info");
//   const [statusMessage, setStatusMessage] = useState("");
//   const [selectedCategoryKey, setSelectedCategoryKey] = useState("student");

//   const activeTier = MEMBERSHIP_PRICING[selectedCategoryKey];
//   const membershipName = activeTier.title;
//   const amountToPay = activeTier.fee;

// // Inside frontend/src/features/members/steps/payments/MpesaPayment.jsx -> handleStkPush

//   const handleStkPush = async (e) => {
//     e.preventDefault();
    
//     // 🟢 HARDENED REGEX: Strip everything except pure digits
//     let cleanedPhone = phone.replace(/[^\d]/g, "");

//     // Automatically convert common entries (e.g. 0712345678 or 712345678) into strict 254XXXXXXXXX format
//     if (cleanedPhone.startsWith("0")) {
//       cleanedPhone = `254${cleanedPhone.slice(1)}`;
//     } else if (cleanedPhone.startsWith("7") || cleanedPhone.startsWith("1")) {
//       // Handles if user omitted the zero completely (e.g., entered 712345678 directly)
//       cleanedPhone = `254${cleanedPhone}`;
//     }

//     // Validation gate: Ensure it hits the strict 12-digit requirement (2547XXXXXXXX)
//     if (cleanedPhone.length !== 12 || !cleanedPhone.startsWith("254")) {
//       setStatusType("error");
//       setStatusMessage("Please enter a valid 9 or 10-digit mobile number (e.g., 07XXXXXXXX).");
//       return;
//     }

//     setLoading(true);
//     setStatusType("info");
//     // ... rest of your code remains exactly the same ...

//   setStatusMessage("Registering transaction tokens...");
  
//   try {
//     // 🟢 Step 1: Generate the exact structural ID token on the client-side
//     const localCheckoutId = `Wempa_STK_${Date.now()}`;
//     const userUid = application?.id || application?.uid;

//     if (!userUid) {
//       throw new Error("User identifier reference is missing. Re-authenticate session.");
//     }

//     // 🟢 Step 2: Write PENDING state to Firestore first so the backend can map the callback
//     await saveSection("payment", {
//       amountCharged: amountToPay,
//       membershipCategory: membershipName,
//       paymentStatus: "PENDING",
//       checkoutRequestId: localCheckoutId, // ⏳ Crucial hook token used by where() query
//       paidAt: new Date().toISOString()
//     }, 6);

//     setStatusMessage("Requesting M-Pesa secure PIN entry window on your device...");

//     // 🟢 Step 3: Trigger your Express serverless backend route
//     const res = await fetch("/api/stkpush", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         phone: cleanedPhone,
//         amount: amountToPay,
//         category: membershipName,
//         uid: userUid,
//         customCheckoutId: localCheckoutId // Pass the predetermined reference forward
//       }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       throw new Error(data.details || data.error || "Safaricom gateway connection failure.");
//     }

//         // ... Keep your fetch, res.json(), and saveSection lines exactly the same ...

//     setStatusMessage("Prompt pushed! Enter your M-Pesa PIN on your phone to complete your payment.");
//     await submitApplication();

//   } catch (error) {
//     console.error("🚨 Full client-side transaction error:", error);
//     setStatusType("error");

//     // 🟢 FIX: Check if the error message itself is an object, or pull descriptive fields safely
//     if (error && typeof error === 'object') {
//       const detailedMessage = error.details || error.error || error.message || JSON.stringify(error);
//       setStatusMessage(`Transaction Failed: ${detailedMessage}`);
//     } else {
//       setStatusMessage(`Transaction Failed: ${error || "Network connection timeout."}`);
//     }
    
//     setLoading(false);
//   }
// };



//   return (
//     <div className={styles.container}>
//       <h3 className={styles.title}>Payment Settlement</h3>
//       <p className={styles.subtitle}>Choose your registration tier and authorize your application invoice below via M-Pesa.</p>
      
//       <div className={styles.formGroup}>
//         <label className={styles.label}>Choose Your Membership Category</label>
//         <select
//           value={selectedCategoryKey}
//           onChange={(e) => setSelectedCategoryKey(e.target.value)}
//           disabled={loading}
//           className={styles.selectInput}
//         >
//           {Object.values(MEMBERSHIP_PRICING).map((tier) => (
//             <option key={tier.key} value={tier.key}>
//               {tier.title} — KES {tier.fee.toLocaleString()}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className={styles.invoiceCard}>
//         <div className={styles.invoiceRow}>
//           <span>Description</span>
//           <strong>{membershipName} Allocation</strong>
//         </div>
//         <div className={styles.invoiceRow}>
//           <span>Method</span>
//           <span>M-Pesa STK Push Express (Direct)</span>
//         </div>
//         <div className={styles.invoiceRowDivider}></div>
//         <div className={styles.invoiceTotalRow}>
//           <span className={styles.totalLabel}>Total Due</span>
//           <strong className={styles.totalAmount}>KES {amountToPay.toLocaleString()}</strong>
//         </div>
//       </div>

//       <form onSubmit={handleStkPush}>
//         <div className={styles.formGroup}>
//           <label className={styles.label}>M-Pesa Mobile Number</label>
//           <div className={styles.phoneInputWrapper}>
//             <div className={styles.flagPrefix}>
//               <span className={styles.flagEmoji}>🇰🇪</span>
//               <span>+254</span>
//             </div>
//             <input
//               type="tel"
//               placeholder="712345678"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               disabled={loading}
//               className={styles.input}
//               required
//             />
//           </div>
//         </div>

//         <button type="submit" disabled={loading} className={styles.submitBtn}>
//           {loading ? "Awaiting PIN Input..." : `Pay KES ${amountToPay.toLocaleString()} via M-Pesa`}
//         </button>
//       </form>

//       {statusMessage && (
//         <div className={`${styles.statusContainer} ${statusType === "error" ? styles.statusError : styles.statusInfo}`}>
//           <div>{statusMessage}</div>
//         </div>
//       )}
//     </div>
//   );
// }
