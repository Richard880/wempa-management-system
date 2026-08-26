import { Link } from "react-router-dom";
import { AuthInput } from "../AuthInput/AuthInput"; 
import Checkbox from "../../../../components/ui/Checkbox";
import Button from "../../../../components/ui/Button";
import Alert from "../../../../components/ui/Alert";
import useLoginForm from "../../forms/useLoginForm";
import "./loginForm.css";

// 	🏼 1. IMPORT YOUR LOGO GRAPHIC FROM YOUR LOCAL ASSETS FILE PATH
import ROUTES from "../../../../constants/routes"; 
import wempaLogo from "../../../../assets/logos/wempa-logo.jpeg"; // Adjust the relative file path directory structure as needed

function LoginForm() {
  const {
    register,
    handleLogin,
    loading,
    authError,
    formState: { errors },
  } = useLoginForm();

  return (
    <section className="maritime-auth-grid">
      
      {/* 🔵 LEFT SIDE: WELCOME HERO PANE WITH OVERLAPPING CIRCLES */}
      <div className="auth-hero-side">
        <div className="circle-shape top-bubble" />
        <div className="circle-shape center-bubble" />
        <div className="circle-shape bottom-bubble" />


          {/* 	🏼 ADDED: BACK TO HOME PAGE UTILITY BUTTON */}
        <div className="back-to-home-wrapper">
          <Link to={ROUTES.HOME || "/"} className="back-home-link">
            <i className="bi bi-arrow-left" aria-hidden="true" />
            <span>Back to Home</span>
          </Link>
        </div>
        
        <div className="hero-content-overlay">
          
          {/* 	🏼 2. EMBEDDED CIRCULAR LOGO BADGE FRAME ABOVE TEXT */}
          <div className="hero-logo-frame">
            <img 
              src={wempaLogo} 
              alt="WEMPA Official Logo Seal" 
              className="hero-logo-image" 
            />
            {/* Elegant double-glowing outer atmospheric nautical ring ring */}
            <div className="logo-ring-pulse" />
          </div>

          <h1 className="maritime-title-ws">WELCOME</h1>
          <h2 className="maritime-headline-ws">WEMPA ASSOCIATION</h2>
          <p className="maritime-subtitle-ws">
            Western Maritime Employers & Professionals Association. Secure data portal access network node.
          </p>
        </div>
      </div>

      {/* ✍️ RIGHT SIDE: CLEAN TYPOGRAPHY INPUT FORM */}
      <div className="auth-input-side">
        <div className="input-side-header">
          <h2 className="welcome-text-ws">Sign in</h2>
       </div>

        {authError && (
          <Alert variant="error" title="Sign In Failed">
            {authError}
          </Alert>
        )}

        <form onSubmit={handleLogin} noValidate className="login-form-ws">
          <AuthInput
            type="email"
            placeholder="User Name"
            icon="person"
            autoComplete="email"
            required
            error={errors.email?.message}
            {...register("email")}
          />

          <AuthInput
            type="password"
            placeholder="Password"
            icon="lock"
            autoComplete="current-password"
            required
            error={errors.password?.message}
            {...register("password")}
          />

          <div className="login-options-ws">
            <Checkbox label="Remember me" {...register("rememberMe")} />
            <Link to="/forgot-password" className="forgot-password-link-ws">
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" loading={loading} className="login-button-ws">
            Sign in
          </Button>


          <div className="login-footer-ws">
            <span>Don't have an account?</span>
            <Link to="/register" className="register-link-ws">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default LoginForm;
