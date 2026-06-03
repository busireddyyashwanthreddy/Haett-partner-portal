import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import adminService from "../services/adminService";
import { getErrorMessage } from "../utils/getErrorMessage";

export const adminKeys = {
  applications: (status, search) => ["admin", "applications", status, search],
};

export const useAdminApplications = (status, search) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: adminKeys.applications(status, search),
    queryFn: () => adminService.getApplications({ status, search }),
  });

  const approveMutation = useMutation({
    mutationFn: adminService.approve,
    onSuccess: () => {
      toast.success("Application approved");
      queryClient.invalidateQueries({ queryKey: ["admin", "applications"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Approval failed"));
    },
  });

  const rejectMutation = useMutation({
    mutationFn: ({ id, rejectionReason }) =>
      adminService.reject(id, rejectionReason),
    onSuccess: () => {
      toast.success("Application rejected");
      queryClient.invalidateQueries({ queryKey: ["admin", "applications"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Rejection failed"));
    },
  });

  return { query, approveMutation, rejectMutation };
};
