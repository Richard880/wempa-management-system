import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import loginSchema from "../validation/loginSchema";
import { useAuth } from "../hooks/useAuth";

import { useNavigate } from "react-router-dom";
import ROUTES from "../../../constants/routes";

export default function useLoginForm() {
  // Destructure 'isAuthenticated' (or 'user') from your custom useAuth hook
  const { login, isAuthenticated } = useAuth();
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

  // Watch the global auth state. Redirect safely as soon as authentication resolves.
  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.MEMBER_DASHBOARD, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    setAuthError("");
    setLoading(true);

    try {
      await login({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      });
      
      // Manual navigate removed from here. 
      // The useEffect hook above safely handles the redirection now.
    } catch (error) {
      setAuthError(error.message || "Unable to sign in.");
    } finally {
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
