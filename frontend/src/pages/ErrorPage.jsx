import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import Button from "../components/common/Button";
import { ROUTES } from "../utils/constants";

const ErrorPage = () => (
  <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
    <AlertTriangle className="mb-4 h-12 w-12 text-error" />
    <h1 className="text-2xl font-bold text-slate-900">Something went wrong</h1>
    <p className="mt-2 max-w-md text-slate-600">
      An unexpected error occurred. Please try again or contact support.
    </p>
    <Link to={ROUTES.PARTNER} className="mt-6">
      <Button>Return Home</Button>
    </Link>
  </div>
);

export default ErrorPage;
