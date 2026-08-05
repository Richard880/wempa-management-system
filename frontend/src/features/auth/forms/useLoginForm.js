import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import loginSchema from "../validation/loginSchema";
import { useAuth } from "../hooks/useAuth";

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
    setAuthError("");
    setLoading(true);

    

    try {
      await login({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      });

      // Navigation happens after authentication
      // through AuthContext / Route Guards.
       navigate(ROUTES.MEMBER_DASHBOARD);

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