import { Inbox } from "lucide-react";

const EmptyState = ({ title = "No data found", description, action }) => (
  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
    <Inbox className="mb-3 h-10 w-10 text-slate-400" />
    <h3 className="text-base font-semibold text-slate-800">{title}</h3>
    {description && (
      <p className="mt-1 max-w-sm text-sm text-slate-500">{description}</p>
    )}
    {action && <div className="mt-4">{action}</div>}
  </div>
);

export default EmptyState;
