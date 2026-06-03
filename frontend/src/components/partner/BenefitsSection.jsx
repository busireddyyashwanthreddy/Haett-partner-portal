import { DollarSign, LayoutDashboard, Ticket, TrendingUp } from "lucide-react";
import { BENEFITS } from "../../utils/constants";

const iconMap = {
  DollarSign,
  Ticket,
  LayoutDashboard,
  TrendingUp,
};

const BenefitsSection = () => (
  <section className="mx-auto max-w-container px-6 py-16">
    <h2 className="mb-10 text-center text-2xl font-bold text-slate-900 md:text-3xl">
      Partner Benefits
    </h2>
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {BENEFITS.map((benefit) => {
        const Icon = iconMap[benefit.icon];

        return (
          <div
            key={benefit.title}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-semibold text-slate-900">
              {benefit.title}
            </h3>
            <p className="text-sm text-slate-600">{benefit.description}</p>
          </div>
        );
      })}
    </div>
  </section>
);

export default BenefitsSection;
