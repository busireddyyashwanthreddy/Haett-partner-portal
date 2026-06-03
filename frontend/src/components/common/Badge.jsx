const styles = {
  active: "bg-emerald-100 text-emerald-800",
  inactive: "bg-slate-100 text-slate-600",
  pending: "bg-amber-100 text-amber-800",
  approved: "bg-emerald-100 text-emerald-800",
  rejected: "bg-red-100 text-red-800",
};

const Badge = ({ children, variant = "active", className = "" }) => (
  <span
    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${styles[variant] || styles.active} ${className}`}
  >
    {children}
  </span>
);

export default Badge;
