import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "../../../firebase";

import FIREBASE_COLLECTIONS from "../../../constants/firebaseCollections";
import STATUS from "../../../constants/status";


const getCollectionCount = async (
  collectionName,
  constraints = []
) => {
  const collectionRef = collection(db, collectionName);

  const firestoreQuery =
    constraints.length > 0
      ? query(collectionRef, ...constraints)
      : query(collectionRef);

  const snapshot = await getDocs(firestoreQuery);

  return snapshot.size;
};


const getTotalRevenue = async () => {
  const paymentsRef = collection(
    db,
    FIREBASE_COLLECTIONS.PAYMENTS
  );

  const snapshot = await getDocs(paymentsRef);

  return snapshot.docs.reduce(
    (total, document) => {
      const payment = document.data();

      return total + Number(payment.amount || 0);
    },
    0
  );
};


const getTimestampValue = (timestamp) => {
  if (!timestamp) {
    return 0;
  }

  if (typeof timestamp.toDate === "function") {
    return timestamp.toDate().getTime();
  }

  if (timestamp instanceof Date) {
    return timestamp.getTime();
  }

  const date = new Date(timestamp);

  return Number.isNaN(date.getTime())
    ? 0
    : date.getTime();
};


const getRecentApplications = async () => {
  const membersRef = collection(
    db,
    FIREBASE_COLLECTIONS.MEMBERS
  );

  const snapshot = await getDocs(membersRef);

  return snapshot.docs
    .map((document) => ({
      id: document.id,
      ...document.data(),
    }))
    .sort((first, second) => {
      const firstDate = getTimestampValue(
        first.submittedAt ||
        first.updatedAt ||
        first.createdAt
      );

      const secondDate = getTimestampValue(
        second.submittedAt ||
        second.updatedAt ||
        second.createdAt
      );

      return secondDate - firstDate;
    })
    .slice(0, 5);
};


const getPaymentDate = (payment) => {
  const timestamp =
    payment.paidAt ||
    payment.paymentDate ||
    payment.createdAt;

  if (!timestamp) {
    return null;
  }

  if (typeof timestamp.toDate === "function") {
    return timestamp.toDate();
  }

  if (timestamp instanceof Date) {
    return timestamp;
  }

  const date = new Date(timestamp);

  return Number.isNaN(date.getTime())
    ? null
    : date;
};


const getMonthlyRevenue = async () => {
  const paymentsRef = collection(
    db,
    FIREBASE_COLLECTIONS.PAYMENTS
  );

  const snapshot = await getDocs(paymentsRef);

  const now = new Date();

  // Create the current month plus the previous 5 months.
  const months = Array.from(
    { length: 6 },
    (_, index) => {
      const date = new Date(
        now.getFullYear(),
        now.getMonth() - (5 - index),
        1
      );

      return {
        key: `${date.getFullYear()}-${date.getMonth()}`,
        label: date.toLocaleDateString("en-KE", {
          month: "short",
        }),
        revenue: 0,
      };
    }
  );


  const monthMap = new Map(
    months.map((month) => [
      month.key,
      month,
    ])
  );


  snapshot.docs.forEach((document) => {
    const payment = document.data();

    const paymentDate =
      getPaymentDate(payment);

    if (!paymentDate) {
      return;
    }

    const key =
      `${paymentDate.getFullYear()}-${paymentDate.getMonth()}`;

    const month = monthMap.get(key);

    if (!month) {
      return;
    }

    month.revenue += Number(
      payment.amount || 0
    );
  });


  return months;
};


const adminDashboardService = {

  async getDashboardStats() {
    const [
      totalMembers,
      activeMembers,
      pendingApplications,
      totalRevenue,
    ] = await Promise.all([

      getCollectionCount(
        FIREBASE_COLLECTIONS.USERS,
        [
          where("role", "==", "member"),
        ]
      ),

      getCollectionCount(
        FIREBASE_COLLECTIONS.USERS,
        [
          where(
            "membershipStatus",
            "==",
            STATUS.ACTIVE
          ),
        ]
      ),

      getCollectionCount(
        FIREBASE_COLLECTIONS.MEMBERS,
        [
          where(
            "applicationStatus",
            "in",
            ["draft", "submitted"]
          ),
        ]
      ),

      getTotalRevenue(),
    ]);

    return {
      totalMembers,
      activeMembers,
      pendingApplications,
      totalRevenue,
    };
  },


  async getRecentApplications() {
    return getRecentApplications();
  },


  async getDashboardData() {
  const [
    stats,
    recentApplications,
    monthlyRevenue,
  ] = await Promise.all([
    this.getDashboardStats(),
    this.getRecentApplications(),
    getMonthlyRevenue(),
  ]);

  return {
    stats,
    recentApplications,
    monthlyRevenue,
  };
},
};


export default adminDashboardService;