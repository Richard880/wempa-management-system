import { Outlet } from "react-router-dom";
import "./authLayout.css";

function AuthLayout() {
  return (
    <div className="auth-layout">

      <div className="auth-overlay"></div>

      <div className="auth-container">

        <div className="auth-brand">

          {/* Temporary logo */}
          <div className="logo-circle">
            W
          </div>

          <h1>WEMPA</h1>

          <p>
            Western Maritime Employers & Professionals Association
          </p>

        </div>

        <Outlet />

      </div>

    </div>
  );
}

export default AuthLayout;