import { Link } from "react-router-dom";
import { AuthInput } from "../AuthInput/AuthInput"; 
import Checkbox from "../../../../components/ui/Checkbox";
import Button from "../../../../components/ui/Button";
import Alert from "../../../../components/ui/Alert";
import useRegisterForm from "../../forms/useRegisterForm";
import "./registerForm.css";

// Import your asset logo
import wempaLogo from "../../../../assets/logos/wempa-logo.jpeg"; // Adjust the relative file path directory structure as needed
import ROUTES from "../../../../constants/routes"; 

function RegisterForm() {
  const {
    register,
    handleRegister,
    loading,
    authError,
    formState: { errors },
  } = useRegisterForm();

  return (
    <section className="maritime-auth-grid-reg">
      
      {/* 🔵 LEFT SIDE: MATCHING MARITIME WAVES HERO HOUSING */}
      <div className="auth-hero-side-reg">
        <div className="circle-shape-reg top-bubble-reg" />
        <div className="circle-shape-reg center-bubble-reg" />
        <div className="circle-shape-reg bottom-bubble-reg" />
        
         {/* 	🏼 ADDED: BACK TO HOME PAGE UTILITY BUTTON */}
        <div className="back-to-home-wrapper-reg">
          <Link to={ROUTES.HOME || "/"} className="back-home-link-reg">
            <i className="bi bi-arrow-left" aria-hidden="true" />
            <span>Back to Home</span>
          </Link>
        </div>


        <div className="hero-content-overlay-reg">
          <div className="hero-logo-frame-reg">
            <img src={wempaLogo} alt="WEMPA Logo" className="hero-logo-image-reg" />
            <div className="logo-ring-pulse-reg" />
          </div>
          <h1 className="maritime-title-reg">JOIN US</h1>
          <h2 className="maritime-headline-reg">WEMPA PORTAL</h2>
          <p className="maritime-subtitle-reg">
            Create an account to process credentials and access the Western Maritime Employers & Professionals Association network.
          </p>
        </div>
      </div>

      {/* ✍️ RIGHT SIDE: INTERNALLY SCROLLABLE INPUT MATRIX SHEET */}
      <div className="auth-input-side-reg">
        <div className="input-side-header-reg">
          <h2 className="welcome-text-reg">Create Your Account</h2>
          <p className="welcome-subtext-reg">Please fill out the sections below to complete registration.</p>
        </div>

        {authError && (
          <Alert variant="error" title="Registration Failed">
            {authError}
          </Alert>
        )}

        <form onSubmit={handleRegister} noValidate className="register-form-ws">
          
          {/* SECTION 1: PERSONAL INFORMATION */}
          <div className="form-section-ws">
            <h6 className="form-section-title-ws">Personal Information</h6>
            <div className="form-row-ws">
              <AuthInput
                placeholder="First Name"
                icon="person"
                required
                error={errors.firstName?.message}
                autoComplete="given-name"
                {...register("firstName")}
              />
              <AuthInput
                placeholder="Last Name"
                icon="person"
                required
                error={errors.lastName?.message}
                autoComplete="family-name"
                {...register("lastName")}
              />
            </div>
          </div>

          {/* SECTION 2: CONTACT DETAILS */}
          <div className="form-section-ws">
            <h6 className="form-section-title-ws">Contact Information</h6>
            <AuthInput
              type="email"
              placeholder="Email Address"
              icon="envelope"
              required
              autoComplete="email"
              error={errors.email?.message}
              {...register("email")}
            />
            <AuthInput
              type="tel"
              placeholder="Phone Number"
              icon="telephone"
              required
              autoComplete="tel"
              error={errors.phoneNumber?.message}
              {...register("phoneNumber")}
            />
          </div>

          {/* SECTION 3: ACCOUNT PROTECTION */}
          <div className="form-section-ws">
            <h6 className="form-section-title-ws">Security</h6>
            <AuthInput
              type="password"
              placeholder="Password"
              icon="lock"
              required
              autoComplete="new-password"
              error={errors.password?.message}
              {...register("password")}
            />
            <AuthInput
              type="password"
              placeholder="Confirm Password"
              icon="lock-fill"
              required
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />
          </div>

          <div className="terms-checkbox-wrapper">
            <Checkbox
              label="I agree to the Terms & Conditions and Privacy Policy."
              error={errors.acceptTerms?.message}
              {...register("acceptTerms")}
            />
          </div>

          <Button type="submit" loading={loading} className="register-button-ws">
            Create Account
          </Button>

          <div className="register-footer-ws">
            <span>Already have an account?</span>
            <Link to="/login" className="login-link-ws">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default RegisterForm;
