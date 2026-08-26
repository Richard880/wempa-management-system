import { Outlet } from "react-router-dom";
import "./authLayout.css";

function AuthLayout() {
  return (
    <div className="auth-layout">
      {/* Dynamic Maritime Sea Wave Overlay Background Elements */}
      <div className="auth-overlay">
        <div className="wave-layer-1" />
        <div className="wave-layer-2" />
      </div>

      <div className="auth-viewport-wrapper">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
