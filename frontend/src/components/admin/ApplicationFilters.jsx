import { Search } from 'lucide-react';
import Input from '../common/Input';

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
];

const ApplicationFilters = ({ status, onStatusChange, search, onSearchChange, counts }) => (
  <div className="space-y-4">
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        type="search"
        placeholder="Search by name, email, or business..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>

    <div className="flex flex-wrap gap-2">
      {FILTERS.map((filter) => (
        <button
          key={filter.value}
          type="button"
          onClick={() => onStatusChange(filter.value)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
            status === filter.value
              ? 'bg-primary text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {filter.label}
          {counts && (
            <span className="ml-1.5 opacity-80">
              ({counts[filter.value] ?? 0})
            </span>
          )}
        </button>
      ))}
    </div>
  </div>
);

export default ApplicationFilters;
