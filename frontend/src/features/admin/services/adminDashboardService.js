// src/features/admin/services/adminDashboardService.js
import {
  collection,
  getDocs,
  query,
  where,
  getCountFromServer, // 🟢 IMPORT AGGREGATION ENGINE FOR LIGHTNING-FAST COUNTING
} from "firebase/firestore";

import { db } from "../../../firebase";
import FIREBASE_COLLECTIONS from "../../../constants/firebaseCollections";
import STATUS from "../../../constants/status";

const membersCollectionRef = collection(db, FIREBASE_COLLECTIONS.MEMBERS);
const usersCollectionRef = collection(db, FIREBASE_COLLECTIONS.USERS);

const getTimestampValue = (timestamp) => {
  if (!timestamp) return 0;
  if (typeof timestamp.toDate === "function") return timestamp.toDate().getTime();
  if (timestamp instanceof Date) return timestamp.getTime();
  const date = new Date(timestamp);
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
};

const getPaymentDate = (paymentNode) => {
  const timestamp = paymentNode?.verifiedAt || paymentNode?.submittedAt || paymentNode?.paidAt || null;
  if (!timestamp) return null;
  if (typeof timestamp.toDate === "function") return timestamp.toDate();
  if (timestamp instanceof Date) return timestamp;
  const date = new Date(timestamp);
  return Number.isNaN(date.getTime()) ? null : date;
};

const getConfirmedRevenueMetrics = async () => {
  const snapshot = await getDocs(membersCollectionRef);
  let totalRevenue = 0;

  const now = new Date();
  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
    return {
      key: `${date.getFullYear()}-${date.getMonth()}`,
      label: date.toLocaleDateString("en-KE", { month: "short" }),
      revenue: 0,
    };
  });

  const monthMap = new Map(months.map((m) => [m.key, m]));

  snapshot.docs.forEach((document) => {
    const data = document.data();
    const payment = data.payment || {};
    const status = String(payment.paymentStatus || "").toUpperCase();

    if (status !== "SUCCESS" && status !== "VERIFIED") return;

    const cashValue = Number(payment.amountCharged || payment.amount || 0);
    totalRevenue += cashValue;

    const paymentDate = getPaymentDate(payment) || getPaymentDate(data);
    if (paymentDate) {
      const key = `${paymentDate.getFullYear()}-${paymentDate.getMonth()}`;
      const monthObject = monthMap.get(key);
      if (monthObject) {
        monthObject.revenue += cashValue;
      }
    }
  });

  return { totalRevenue, monthlyRevenueArray: months };
};

/* ==========================================================================
   Admin Dashboard Service Engine
   ========================================================================== */
const adminDashboardService = {
  
    // Place this directly inside the adminDashboardService object structure:

  async getDashboardStats() {
    try {
      // 1. Establish the clean server-side query filters constraints
      const totalBaseUsersQuery = query(usersCollectionRef, where("role", "==", "member"));
      const approvedMembersQuery = query(membersCollectionRef, where("applicationStatus", "==", "approved"));
      const activeMembershipQuery = query(membersCollectionRef, where("applicationStatus", "==", "approved"), where("membershipStatus", "==", STATUS.ACTIVE || "active"));
      const pendingReviewQuery = query(membersCollectionRef, where("applicationStatus", "==", "submitted"));

      // 🟢 FIXED PROMISE SECTOR: Natively executes getCountFromServer() on Firebase servers
      const [
        totalBaseUsersSnap,
        approvedMembersSnap,
        activeMembershipSnap,
        pendingReviewSnap,
        revenueMetrics
      ] = await Promise.all([
        getCountFromServer(totalBaseUsersQuery),
        getCountFromServer(approvedMembersQuery),
        getCountFromServer(activeMembershipQuery),
        getCountFromServer(pendingReviewQuery),
        getConfirmedRevenueMetrics(),
      ]);

      // Unpack the atomic integer values from the server snapshots data maps
      const totalBaseUsersCount = totalBaseUsersSnap.data().count;
      const approvedMembersCount = approvedMembersSnap.data().count;

      // 🟢 COMPUTE THE TARGET USERS LEADS SCORE: Total signups minus verified approved members
      const basicUsersCount = Math.max(0, totalBaseUsersCount - approvedMembersCount);

      return {
        totalMembers: approvedMembersCount,
        activeMembers: activeMembershipSnap.data().count,
        basicUsers: basicUsersCount, // Dynamic interested parties lead metric
        pendingApplications: pendingReviewSnap.data().count,
        totalRevenue: revenueMetrics.totalRevenue,
        monthlyRevenue: revenueMetrics.monthlyRevenueArray
      };
    } catch (error) {
      console.error("Failed to compute admin dashboard metrics profile:", error);
      throw error;
    }
  },


  // 🟢 RETRIEVE UNFINISHED SIGNUPS FOR BROADCAST MESSAGING
  async getInterestedPartiesList() {
    try {
      const usersSnap = await getDocs(query(usersCollectionRef, where("role", "==", "member")));
      const membersSnap = await getDocs(membersCollectionRef);

      const completedUids = new Set(
        membersSnap.docs
          .filter(doc => doc.data().applicationStatus === "approved" || doc.data().applicationStatus === "submitted")
          .map(doc => doc.id)
      );

      // Return only basic users who haven't completed or submitted their applications
      return usersSnap.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(user => !completedUids.has(user.id));
    } catch (error) {
      console.error("Failed to fetch interested parties list:", error);
      throw error;
    }
  },

  async getRecentApplications() {
    try {
      const snapshot = await getDocs(membersCollectionRef);
      return snapshot.docs
        .map((document) => ({ id: document.id, ...document.data() }))
        .filter(app => app.personal?.firstName || app.applicationStatus === "submitted")
        .sort((first, second) => {
          const firstDate = getTimestampValue(first.submittedAt || first.updatedAt || first.createdAt);
          const secondDate = getTimestampValue(second.submittedAt || second.updatedAt || second.createdAt);
          return secondDate - firstDate;
        })
        .slice(0, 5);
    } catch (error) {
      console.error("Failed to fetch recent member applications:", error);
      throw error;
    }
  },

  async getDashboardData() {
    try {
      const [stats, recentApplications] = await Promise.all([
        this.getDashboardStats(),
        this.getRecentApplications(),
      ]);

      return {
        stats,
        recentApplications,
        monthlyRevenue: stats.monthlyRevenue,
      };
    } catch (error) {
      console.error("Dashboard orchestration pipeline encountered a failure:", error);
      throw error;
    }
  },
};

export default adminDashboardService;
