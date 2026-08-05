import DashboardStats from "../components/DashboardStats";
import RevenueChart from "../components/RevenueChart";
import RecentActivity from "../components/RecentActivity";

export default function Dashboard() {
  return (
    <main className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <DashboardStats />

      <RevenueChart />

      <RecentActivity />
    </main>
  );
}