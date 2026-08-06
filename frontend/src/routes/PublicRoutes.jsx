// src/routes/publicRoutes.js
import ROUTES from "../constants/routes";
import PublicRoute from "./PublicRoute";
import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import ForgotPasswordPage from "../features/auth/pages/ForgotPasswordPage";
import VerifyEmailPage from "../features/auth/pages/VerifyEmailPage";

export const publicRoutes = {
  element: <PublicRoute />,
  children: [
    {
      element: <AuthLayout />,
      children: [
        { path: ROUTES.LOGIN, element: <LoginPage /> },
        { path: ROUTES.REGISTER, element: <RegisterPage /> },
        { path: ROUTES.FORGOT_PASSWORD, element: <ForgotPasswordPage /> },
        { path: ROUTES.VERIFY_EMAIL, element: <VerifyEmailPage /> },
      ],
    },
  ],
};
