import { XCircle } from "lucide-react";
import { useState } from "react";
import Card from "../common/Card";
import Badge from "../common/Badge";
import Button from "../common/Button";
import ApplicationForm from "./ApplicationForm";

const RejectedView = ({ application = {} }) => {
  const [showReapply, setShowReapply] = useState(false);

  if (showReapply) {
    return (
      <ApplicationForm
        isReapply
        defaultValues={{
          partnerType: application.partnerType,
          businessName: application.businessName,
          phone: application.phone,
          website: application.website || "",
          socialLink: application.socialLink || "",
          audienceSize: application.audienceSize,
          description: application.description,
        }}
      />
    );
  }

  return (
    <Card>
      <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-6">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700">
          <XCircle className="h-8 w-8" />
        </div>
        <div className="flex-1">
          <div className="mb-2 flex flex-wrap items-center justify-center gap-2 md:justify-start">
            <h2 className="text-xl font-semibold text-slate-900">
              Application Rejected
            </h2>
            <Badge variant="rejected">rejected</Badge>
          </div>
          <p className="mb-4 text-slate-600">
            Unfortunately, your application was not approved at this time.
          </p>
          <div className="rounded-lg bg-red-50 p-4 text-left">
            <p className="text-xs font-semibold uppercase text-red-700">
              Rejection Reason
            </p>
            <p className="mt-1 text-sm text-red-900">
              {application.rejectionReason}
            </p>
          </div>
          <Button className="mt-6" onClick={() => setShowReapply(true)}>
            Reapply
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default RejectedView;
