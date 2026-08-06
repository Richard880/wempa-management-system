import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import loginSchema from "../validation/loginSchema";
import useAuth from "../hooks/useAuth"; // Ensure this matches your project's hook name

import { useNavigate } from "react-router-dom";
import ROUTES from "../../../constants/routes";

export default function useLoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data) => {
    // Reset previous errors and start loading state
    setAuthError("");
    setLoading(true);

    try {
      // 1. Execute the login from your AuthContext
      await login({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      });

      // 2. Successful login. 
      // We manually navigate to ensure the transition happens immediately.
      // Your ProtectedRoute and PublicRoute will handle the final gatekeeping.
      navigate(ROUTES.MEMBER_DASHBOARD, { replace: true });

    } catch (error) {
      // Handle Firebase specific error messages or generic failures
      setAuthError(error.message || "Unable to sign in. Please check your credentials.");
    } finally {
      // Always stop the loading spinner, even if login fails
      setLoading(false);
    }
  };

  return {
    ...form,
    loading,
    authError,
    handleLogin: form.handleSubmit(onSubmit),
  };
}
