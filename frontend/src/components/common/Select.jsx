const Select = ({
  label,
  id,
  error,
  options = [],
  className = "",
  ...props
}) => (
  <div className="w-full">
    {label && (
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>
    )}
    <select
      id={id}
      className={`w-full rounded-lg border bg-white px-3 py-2 text-sm shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 ${
        error ? "border-error" : "border-slate-300"
      } ${className}`}
      {...props}
    >
      <option value="">Select...</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {error && <p className="mt-1 text-xs text-error">{error}</p>}
  </div>
);

export default Select;
