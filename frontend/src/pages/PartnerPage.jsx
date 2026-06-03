import { Navigate } from "react-router-dom";
import Spinner from "../components/common/Spinner";
import PartnerLanding from "../components/partner/PartnerLanding";
import ApplicationForm from "../components/partner/ApplicationForm";
import PendingView from "../components/partner/PendingView";
import RejectedView from "../components/partner/RejectedView";
import PartnerDashboard from "../components/partner/PartnerDashboard";
import { useAuth } from "../hooks/useAuth";
import { useApplication } from "../hooks/useApplication";
import {
  APPLICATION_STATUS,
  ROUTES,
  USER_APPLICATION_STATUS,
  ROLES,
} from "../utils/constants";

const PartnerPage = () => {
  const {
    isAuthenticated,
    isLoading: authLoading,
    isAdmin,
    user,
    isPartner,
  } = useAuth();
  const { application } = useApplication({
    enabled: isAuthenticated && !isAdmin,
  });

  if (authLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <PartnerLanding />;
  }

  if (isAdmin) {
    return <Navigate to={ROUTES.ADMIN} replace />;
  }

  if (application.isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const app = application.data;

  if (
    isPartner ||
    user?.applicationStatus === USER_APPLICATION_STATUS.APPROVED ||
    app?.status === APPLICATION_STATUS.APPROVED
  ) {
    return <PartnerDashboard />;
  }

  if (
    user?.applicationStatus === USER_APPLICATION_STATUS.PENDING ||
    app?.status === APPLICATION_STATUS.PENDING
  ) {
    return <PendingView application={app} />;
  }

  if (
    user?.applicationStatus === USER_APPLICATION_STATUS.REJECTED ||
    app?.status === APPLICATION_STATUS.REJECTED
  ) {
    return <RejectedView application={app} />;
  }

  return <ApplicationForm />;
};

export default PartnerPage;
