import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import registerSchema from "../validation/registerSchema";
import { useAuth } from "../hooks/useAuth";

import { useNavigate } from "react-router-dom";
import ROUTES from "../../../constants/routes";


export default function useRegisterForm() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data) => {
    setAuthError("");
    setLoading(true);

    try {
      await registerUser({
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email: data.email.trim().toLowerCase(),
        phoneNumber: data.phoneNumber.trim(),
        password: data.password,
      });

      navigate(ROUTES.VERIFY_EMAIL);

      
    } catch (error) {
      setAuthError(error.message || "Unable to create your account.");
    } finally {
      setLoading(false);
    }
  };

  return {
    ...form,

    loading,
    authError,

    handleRegister: form.handleSubmit(onSubmit),
  };
}