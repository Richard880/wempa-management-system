// src/layouts/AuthLayout/AuthLayout.jsx
import { Outlet } from "react-router-dom";
import "./authLayout.css";

function AuthLayout() {
  return (
    <div className="auth-layout">
      {/* Premium Ambient Maritime Background Infrastructure */}
      <div className="auth-overlay">
        <div className="wave-layer-1" />
        <div className="wave-layer-2" />
      </div>

      <main className="auth-viewport-wrapper">
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout;
