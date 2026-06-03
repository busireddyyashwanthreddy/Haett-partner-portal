import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import applicationService from "../services/applicationService";
import { useAuth } from "./useAuth";
import { getErrorMessage } from "../utils/getErrorMessage";

export const applicationKeys = {
  mine: ["application", "me"],
};

export const useApplication = (options = {}) => {
  const { enabled = true } = options;
  const queryClient = useQueryClient();
  const { refreshUser } = useAuth();

  const application = useQuery({
    queryKey: applicationKeys.mine,
    queryFn: applicationService.getMine,
    enabled,
  });

  const submitApplication = useMutation({
    mutationFn: applicationService.submit,
    onSuccess: async () => {
      toast.success("Application submitted successfully");
      await refreshUser();
      queryClient.invalidateQueries({ queryKey: applicationKeys.mine });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to submit application"));
    },
  });

  const reapplyApplication = useMutation({
    mutationFn: applicationService.reapply,
    onSuccess: async () => {
      toast.success("Application resubmitted for review");
      await refreshUser();
      queryClient.invalidateQueries({ queryKey: applicationKeys.mine });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to reapply"));
    },
  });

  return { application, submitApplication, reapplyApplication };
};
