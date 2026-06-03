import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import { ROUTES } from "../utils/constants";

const NotFoundPage = () => (
  <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
    <h1 className="text-6xl font-bold text-primary">404</h1>
    <p className="mt-2 text-lg text-slate-600">Page not found</p>
    <Link to={ROUTES.PARTNER} className="mt-6">
      <Button>Back to Partner Portal</Button>
    </Link>
  </div>
);

export default NotFoundPage;
