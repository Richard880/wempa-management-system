// src/features/dashboard/components/layout/UserLayout.jsx
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar/Sidebar";
import ROUTES from "../constants/routes";

export default function UserLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const isApplicationWizard = location.pathname.includes(ROUTES.MEMBER_APPLICATION);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

 // src/features/dashboard/components/layout/UserLayout.jsx
// src/features/dashboard/components/layout/UserLayout.jsx

return (
  <div className="d-flex bg-light w-100 vh-100 m-0 p-0 overflow-hidden">
    {!isApplicationWizard && (
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    )}

    {/* 🟢 Step 1: Force zero padding on the main wrapper */}
    <main className="flex-grow-1 d-flex flex-column h-100" style={{ overflow: "hidden", padding: "0" }}>
      
      {/* Mobile Header: Now has 0px of space above it */}
      {!isApplicationWizard && (
        <header className="d-lg-none bg-white border-bottom p-3 d-flex justify-content-between align-items-center shadow-sm" style={{ zIndex: 10 }}>
          <h5 className="mb-0 fw-bold text-primary">WEMPA</h5>
          <button className="btn btn-light border" onClick={toggleSidebar}>
            <i className={`bi ${isSidebarOpen ? 'bi-x-lg' : 'bi-list'} fs-4`}></i>
          </button>
        </header>
      )}

      {/* 🟢 Step 2: Apply the 20px padding ONLY to the scrolling content container */}
      <div 
        className="flex-grow-1" 
        style={{ 
          overflowY: "auto", 
          padding: isApplicationWizard ? "0" : "1.25rem" // This adds breathing room for the cards, not the header
        }}
      >
        <Outlet />
      </div>
    </main>
  </div>
);
}