import { useQuery } from "@tanstack/react-query";
import partnerService from "../services/partnerService";

export const partnerKeys = {
  dashboard: ["partner", "dashboard"],
};

export const usePartnerDashboard = (enabled = true) =>
  useQuery({
    queryKey: partnerKeys.dashboard,
    queryFn: partnerService.getDashboard,
    enabled,
  });
