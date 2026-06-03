import { Check, X } from "lucide-react";
import { useState } from "react";
import Badge from "../common/Badge";
import Button from "../common/Button";
import Card from "../common/Card";
import RejectModal from "./RejectModal";

const ApplicationCard = ({
  application,
  onApprove,
  onReject,
  isApproving,
  isRejecting,
}) => {
  const [showReject, setShowReject] = useState(false);
  const isPending = application.status === "pending";

  return (
    <>
      <Card>
        <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-slate-900">
              {application.user?.name || "Unknown User"}
            </h3>
            <p className="text-sm text-slate-500">{application.user?.email}</p>
          </div>
          <Badge variant={application.status}>{application.status}</Badge>
        </div>

        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-medium text-slate-500">Business Name</dt>
            <dd>{application.businessName}</dd>
          </div>
          <div>
            <dt className="font-medium text-slate-500">Partner Type</dt>
            <dd className="capitalize">{application.partnerType}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="font-medium text-slate-500">Description</dt>
            <dd className="text-slate-700">{application.description}</dd>
          </div>
        </dl>

        {isPending && (
          <div className="mt-6 flex flex-wrap gap-2">
            <Button
              size="sm"
              onClick={() => onApprove(application.id)}
              disabled={isApproving}
            >
              <Check className="h-4 w-4" />
              Approve
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => setShowReject(true)}
              disabled={isRejecting}
            >
              <X className="h-4 w-4" />
              Reject
            </Button>
          </div>
        )}

        {application.rejectionReason && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-800">
            <strong>Rejection reason:</strong> {application.rejectionReason}
          </div>
        )}
      </Card>

      {showReject && (
        <RejectModal
          application={application}
          onClose={() => setShowReject(false)}
          onConfirm={(reason) => {
            onReject({ id: application.id, rejectionReason: reason });
            setShowReject(false);
          }}
          isLoading={isRejecting}
        />
      )}
    </>
  );
};

export default ApplicationCard;
