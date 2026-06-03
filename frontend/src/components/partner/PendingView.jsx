import { Clock } from "lucide-react";
import Card from "../common/Card";
import Badge from "../common/Badge";
import { formatDate } from "../../utils/formatDate";

const PendingView = ({ application = {} }) => (
  <Card>
    <div className="flex flex-col items-center text-center md:flex-row md:text-left md:items-start gap-6">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
        <Clock className="h-8 w-8" />
      </div>
      <div className="flex-1">
        <div className="mb-2 flex flex-wrap items-center justify-center gap-2 md:justify-start">
          <h2 className="text-xl font-semibold text-slate-900">
            Application Under Review
          </h2>
          <Badge variant="pending">pending</Badge>
        </div>
        <p className="text-slate-600">
          Your application is currently under review. We will notify you once a
          decision has been made.
        </p>
        <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-medium text-slate-500">Business Name</dt>
            <dd className="text-slate-900">{application.businessName}</dd>
          </div>
          <div>
            <dt className="font-medium text-slate-500">Applied Date</dt>
            <dd className="text-slate-900">
              {formatDate(application.appliedAt)}
            </dd>
          </div>
          <div>
            <dt className="font-medium text-slate-500">Partner Type</dt>
            <dd className="capitalize text-slate-900">
              {application.partnerType}
            </dd>
          </div>
          <div>
            <dt className="font-medium text-slate-500">Status</dt>
            <dd className="capitalize text-slate-900">{application.status}</dd>
          </div>
        </dl>
      </div>
    </div>
  </Card>
);

export default PendingView;
