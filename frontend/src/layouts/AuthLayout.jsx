import { Navigate, Outlet } from "react-router-dom";
import Spinner from "../components/common/Spinner";
import { useAuth } from "../hooks/useAuth";
import { ROUTES, ROLES } from "../utils/constants";

const AuthLayout = () => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isAuthenticated) {
    const redirect = user?.role === ROLES.ADMIN ? ROUTES.ADMIN : ROUTES.PARTNER;
    return <Navigate to={redirect} replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="w-full max-w-md">
        <p className="mb-6 text-center text-lg font-bold text-primary">
          Haett Partner Portal
        </p>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
