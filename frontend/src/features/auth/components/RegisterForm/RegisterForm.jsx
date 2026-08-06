import { Link } from "react-router-dom";

import Card from "../../../../components/ui/Card";
import Input from "../../../../components/ui/Input";
import PasswordInput from "../../../../components/ui/PasswordInput";
import Checkbox from "../../../../components/ui/Checkbox";
import Button from "../../../../components/ui/Button";
import Alert from "../../../../components/ui/Alert";

import useRegisterForm from "../../forms/useRegisterForm";

import "./registerForm.css";

function RegisterForm() {
  const {
    register,
    handleRegister,
    loading,
    authError,
    formState: { errors },
  } = useRegisterForm();

  return (
    <Card
      title="Create Your Account"
      subtitle="Register to access the WEMPA Member Portal."
      className="register-card"
    >
      {authError && (
        <Alert
          variant="error"
          title="Registration Failed"
        >
          {authError}
        </Alert>
      )}

      <form
        className="register-form"
        onSubmit={handleRegister}
        noValidate
      >
        <div className="form-section">
          <h6 className="form-section-title">
            Personal Information
          </h6>

          <div className="form-row">
            <Input
              label="First Name"
              placeholder="Enter first name"
              required
              error={errors.firstName?.message}
              autoComplete="given-name"
              {...register("firstName")}
            />

            <Input
              label="Last Name"
              placeholder="Enter last name"
              required
              error={errors.lastName?.message}
              autoComplete="family-name"
              {...register("lastName")}
            />
          </div>
        </div>

        <div className="form-section">
          <h6 className="form-section-title">
            Contact Information
          </h6>

          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            required
            autoComplete="email"
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            label="Phone Number"
            type="tel"
            placeholder="Enter phone number"
            required
            autoComplete="tel"
            error={errors.phoneNumber?.message}
            {...register("phoneNumber")}
          />
        </div>

        <div className="form-section">
          <h6 className="form-section-title">
            Security
          </h6>

          <PasswordInput
            label="Password"
            required
            autoComplete="new-password"
            error={errors.password?.message}
            {...register("password")}
          />

          <PasswordInput
            label="Confirm Password"
            required
            autoComplete="new-password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
        </div>

        <Checkbox
          label="I agree to the Terms & Conditions and Privacy Policy."
          error={errors.acceptTerms?.message}
          {...register("acceptTerms")}
        />

        <Button
          type="submit"
          loading={loading}
          className="register-button"
        >
          Create Account
        </Button>

        <div className="register-footer">
          <span>Already have an account?</span>

          <Link
            to="/login"
            className="login-link"
          >
            Sign In
          </Link>
        </div>
      </form>
    </Card>
  );
}

export default RegisterForm;