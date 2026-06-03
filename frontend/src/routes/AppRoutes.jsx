import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import PartnerPage from "../pages/PartnerPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AdminDashboardPage from "../pages/AdminDashboardPage";
import NotFoundPage from "../pages/NotFoundPage";
import ErrorPage from "../pages/ErrorPage";
import ProtectedRoute from "./ProtectedRoute";
import { ROUTES } from "../utils/constants";

const AppRoutes = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route
        path={ROUTES.HOME}
        element={<Navigate to={ROUTES.PARTNER} replace />}
      />
      <Route path={ROUTES.PARTNER} element={<PartnerPage />} />
      <Route path={ROUTES.ERROR} element={<ErrorPage />} />
    </Route>

    <Route element={<AuthLayout />}>
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
    </Route>

    <Route element={<ProtectedRoute adminOnly />}>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.ADMIN} element={<AdminDashboardPage />} />
      </Route>
    </Route>

    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;
