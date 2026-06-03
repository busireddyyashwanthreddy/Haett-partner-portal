import { useState } from 'react';
import ApplicationFilters from '../components/admin/ApplicationFilters';
import ApplicationCard from '../components/admin/ApplicationCard';
import Spinner from '../components/common/Spinner';
import { SkeletonCard } from '../components/common/Skeleton';
import EmptyState from '../components/common/EmptyState';
import { useAdminApplications } from '../hooks/useAdmin';

const AdminDashboardPage = () => {
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');
  const { query, approveMutation, rejectMutation } = useAdminApplications(
    status,
    search
  );

  const { data, isLoading, isError } = query;
  const applications = data?.applications || [];
  const counts = data?.counts;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-slate-600">
          Review and manage partner applications
        </p>
      </div>

      <ApplicationFilters
        status={status}
        onStatusChange={setStatus}
        search={search}
        onSearchChange={setSearch}
        counts={counts}
      />

      {isLoading && (
        <div className="grid gap-4 lg:grid-cols-2">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {isError && (
        <EmptyState
          title="Failed to load applications"
          description="Please refresh the page or try again later."
        />
      )}

      {!isLoading && !isError && applications.length === 0 && (
        <EmptyState
          title="No applications found"
          description="Try adjusting your search or filter criteria."
        />
      )}

      {!isLoading && !isError && applications.length > 0 && (
        <div className="grid gap-4 lg:grid-cols-2">
          {applications.map((app) => (
            <ApplicationCard
              key={app.id}
              application={app}
              onApprove={(id) => approveMutation.mutate(id)}
              onReject={(payload) => rejectMutation.mutate(payload)}
              isApproving={approveMutation.isPending}
              isRejecting={rejectMutation.isPending}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
