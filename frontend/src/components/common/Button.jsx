const variants = {
  primary: "bg-primary text-white hover:bg-primary-dark focus:ring-primary",
  secondary:
    "bg-secondary text-slate-900 hover:bg-secondary-dark hover:text-white focus:ring-secondary",
  outline:
    "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-400",
  danger: "bg-error text-white hover:bg-red-700 focus:ring-error",
  ghost: "text-slate-600 hover:bg-slate-100 focus:ring-slate-400",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  ...props
}) => (
  <button
    type={type}
    disabled={disabled}
    className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
