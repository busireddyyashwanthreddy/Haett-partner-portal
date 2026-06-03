import { Navigate, Outlet, useLocation } from "react-router-dom";
import Spinner from "../components/common/Spinner";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../utils/constants";

const ProtectedRoute = ({ adminOnly = false }) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to={ROUTES.PARTNER} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
