const sizeMap = { sm: "h-4 w-4", md: "h-8 w-8", lg: "h-12 w-12" };

const Spinner = ({ size = "md", className = "" }) => (
  <div
    role="status"
    aria-label="Loading"
    className={`animate-spin rounded-full border-2 border-slate-200 border-t-primary ${sizeMap[size]} ${className}`}
  />
);

export default Spinner;
