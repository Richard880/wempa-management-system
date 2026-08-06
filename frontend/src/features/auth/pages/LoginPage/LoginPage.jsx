// features/auth/pages/LoginPage/LoginPage.jsx
import AuthCard from "../../components/AuthCard";
import LoginForm from "../../components/LoginForm";
import "./loginPage.css";

function LoginPage() {
  return (
    <AuthCard
      title="Welcome Back"
      subtitle="Sign in to access your WEMPA member account."
    >
      <LoginForm />
    </AuthCard>
  );
}

export default LoginPage;
