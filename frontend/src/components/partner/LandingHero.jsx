import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Button from "../common/Button";
import { ROUTES } from "../../utils/constants";

const LandingHero = () => (
  <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-emerald-700 px-6 py-20 text-white md:py-28">
    <div className="mx-auto max-w-container text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-200">
        Haett Partner Program
      </p>
      <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
        Become a Haett Affiliate Partner
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-emerald-100">
        Join our partner network, earn commissions, and grow your business with
        premium health and nutrition products.
      </p>
      <Link to={ROUTES.LOGIN} className="mt-8 inline-block">
        <Button variant="secondary" size="lg">
          Login To Apply
          <ArrowRight className="h-5 w-5" />
        </Button>
      </Link>
    </div>
  </section>
);

export default LandingHero;
