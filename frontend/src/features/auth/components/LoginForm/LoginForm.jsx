import { Link } from "react-router-dom";

import Card from "../../../../components/ui/Card";
import Input from "../../../../components/ui/Input";
import PasswordInput from "../../../../components/ui/PasswordInput";
import Checkbox from "../../../../components/ui/Checkbox";
import Button from "../../../../components/ui/Button";
import Alert from "../../../../components/ui/Alert";

import useLoginForm from "../../forms/useLoginForm";

import "./loginForm.css";

function LoginForm() {
  const {
    register,
    handleLogin,
    loading,
    authError,
    formState: { errors },
  } = useLoginForm();

  return (
    <Card
      title="Welcome Back"
      subtitle="Sign in to continue to your WEMPA account."
      className="login-card"
    >
      {authError && (
        <Alert
          variant="error"
          title="Sign In Failed"
        >
          {authError}
        </Alert>
      )}

      <form
        onSubmit={handleLogin}
        noValidate
        className="login-form"
      >
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          autoComplete="email"
          required
          error={errors.email?.message}
          {...register("email")}
        />

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          autoComplete="current-password"
          required
          error={errors.password?.message}
          {...register("password")}
        />

        <div className="login-options">
          <Checkbox
            label="Remember Me"
            {...register("rememberMe")}
          />

          <Link
            to="/forgot-password"
            className="forgot-password-link"
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          loading={loading}
          className="login-button"
        >
          Sign In
        </Button>

        <div className="login-footer">
          <span>Don't have an account?</span>

          <Link
            to="/register"
            className="register-link"
          >
            Register
          </Link>
        </div>
      </form>
    </Card>
  );
}

export default LoginForm;