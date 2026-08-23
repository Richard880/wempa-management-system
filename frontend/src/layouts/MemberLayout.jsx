// src/features/dashboard/components/layout/UserLayout.jsx
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";

function UserLayout() {
  const location = useLocation();

  // 1. 🟢 CONDITIONAL GUARD: Detect if the user is processing their wizard application form
  const isApplicationWizard = location.pathname.includes("/membership/apply");

  return (
    <div className="d-flex bg-light w-100 min-vh-100 overflow-hidden">
      
      {/* 2. Render general layout sidebar only when outside the intensive application form wizard */}
      {!isApplicationWizard && <Sidebar />}

      <main
        className="flex-grow-1 d-flex flex-column"
        style={{
          minHeight: "100vh",
          background: "#f8fafc", // Premium off-white clean corporate workspace backdrop color accent
          padding: isApplicationWizard ? "0px" : "35px", // Wizard handles its own spacing padding boundaries
          transition: "all 0.3s ease",
          width: "100%",
          overflowY: "auto"
        }}
      >
        {/* Wrap main content area with standard container grid if not using full-bleed wizard blocks */}
        {isApplicationWizard ? (
          <Outlet />
        ) : (
          <div className="container-fluid p-0 animate-fade-in" style={{ maxWidth: "1400px" }}>
            <Outlet />
          </div>
        )}
      </main>
    </div>
  );
}

export default UserLayout;
