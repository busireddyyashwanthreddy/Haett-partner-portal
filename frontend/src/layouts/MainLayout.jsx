import { Link, Outlet, useNavigate } from "react-router-dom";
import { LogOut, Shield, User } from "lucide-react";
import Button from "../components/common/Button";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../utils/constants";

const MainLayout = () => {
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.PARTNER);
  };

  return (
    <div className="min-h-screen bg-surface">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-container items-center justify-between px-4 py-3 md:px-6">
          <Link to={ROUTES.PARTNER} className="text-lg font-bold text-primary">
            Haett Partner Portal
          </Link>

          <nav className="flex items-center gap-2 md:gap-4">
            {isAuthenticated ? (
              <>
                <Link
                  to={ROUTES.PARTNER}
                  className="hidden text-sm font-medium text-slate-600 hover:text-primary sm:inline"
                >
                  Partner
                </Link>
                {isAdmin && (
                  <Link
                    to={ROUTES.ADMIN}
                    className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-primary"
                  >
                    <Shield className="h-4 w-4" />
                    Admin
                  </Link>
                )}
                <span className="hidden items-center gap-1 text-sm text-slate-500 md:flex">
                  <User className="h-4 w-4" />
                  {user?.name}
                </span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to={ROUTES.REGISTER}>
                  <Button size="sm">Register</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-container px-4 py-6 md:px-6 md:py-8">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Haett Partner Portal. All rights reserved.
      </footer>
    </div>
  );
};

export default MainLayout;
