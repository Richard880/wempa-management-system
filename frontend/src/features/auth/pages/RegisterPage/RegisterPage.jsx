// features/auth/pages/RegisterPage/RegisterPage.jsx
import AuthCard from "../../components/AuthCard";
import RegisterForm from "../../components/RegisterForm";
import "./registerPage.css";

function RegisterPage() {
  return (
    <AuthCard
      title="Create Your Account"
      subtitle="Register to become a member of the Western Maritime Employers & Professionals Association."
    >
      <RegisterForm />
    </AuthCard>
  );
}

export default RegisterPage;
