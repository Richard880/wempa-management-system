import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import loginSchema from "../validation/loginSchema";
import useAuth from "../hooks/useAuth";

import ROUTES from "../../../constants/routes";
import ROLES from "../../../constants/roles";

export default function useLoginForm() {
  const { auth, login } = useAuth();

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

  /**
   * Redirect authenticated users according to their role.
   *
   * We wait for:
   * 1. Firebase/AuthContext initialization to finish.
   * 2. Authentication to be confirmed.
   * 3. The Firestore profile role to be available.
   */
  useEffect(() => {
    if (auth.loading) {
      return;
    }

    if (!auth.authenticated) {
      return;
    }

    if (!auth.role) {
      return;
    }

    switch (auth.role) {
      case ROLES.SUPER_ADMIN:
      case ROLES.ADMIN:
        navigate(ROUTES.ADMIN_DASHBOARD, {
          replace: true,
        });
        break;

      case ROLES.MEMBER:
        navigate(ROUTES.MEMBER_DASHBOARD, {
          replace: true,
        });
        break;

      default:
        navigate(ROUTES.HOME, {
          replace: true,
        });
    }
  }, [
    auth.loading,
    auth.authenticated,
    auth.role,
    navigate,
  ]);

  /**
   * Submit login credentials.
   *
   * AuthContext performs authentication and synchronizes
   * the user's Firestore profile. The effect above performs
   * role-based navigation after that state is available.
   */
  const onSubmit = async (data) => {
    setAuthError("");
    setLoading(true);

    try {
      await login({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      });
    } catch (error) {
      setAuthError(
        error.message || "Unable to sign in."
      );
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