import { Calendar, DollarSign, Hash, Users } from "lucide-react";
import Card from "../common/Card";
import { SkeletonCard } from "../common/Skeleton";
import EmptyState from "../common/EmptyState";
import DiscountCodeTable from "./DiscountCodeTable";
import { usePartnerDashboard } from "../../hooks/usePartnerDashboard";
import { formatDate } from "../../utils/formatDate";
import { getErrorMessage } from "../../utils/getErrorMessage";

const StatCard = ({ icon: Icon, label, value }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
      <Icon className="h-5 w-5" />
    </div>
    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
      {label}
    </p>
    <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
  </div>
);

const PartnerDashboard = () => {
  const { data, isLoading, isError, error } = usePartnerDashboard();

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <EmptyState
        title="Unable to load dashboard"
        description={getErrorMessage(error)}
      />
    );
  }

  const { stats, discountCodes } = data;

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Hash} label="Total Codes" value={stats.totalCodes} />
        <StatCard icon={Users} label="Total Usage" value={stats.totalUsage} />
        <StatCard
          icon={DollarSign}
          label="Customer Savings"
          value={`$${stats.customerSavings.toLocaleString()}`}
        />
        <StatCard
          icon={Calendar}
          label="Approval Date"
          value={formatDate(stats.approvalDate)}
        />
      </div>

      <Card title="Discount Codes">
        <DiscountCodeTable codes={discountCodes} />
      </Card>
    </div>
  );
};

export default PartnerDashboard;
