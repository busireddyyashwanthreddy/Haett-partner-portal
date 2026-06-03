import { useForm } from "react-hook-form";
import Button from "../common/Button";
import Card from "../common/Card";
import Input from "../common/Input";
import Select from "../common/Select";
import Textarea from "../common/Textarea";
import { PARTNER_TYPES } from "../../utils/constants";
import { useApplication } from "../../hooks/useApplication";

const ApplicationForm = ({ defaultValues = {}, isReapply = false }) => {
  const { submitApplication, reapplyApplication } = useApplication({
    enabled: false,
  });

  const mutation = isReapply ? reapplyApplication : submitApplication;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      partnerType: "",
      businessName: "",
      phone: "",
      website: "",
      socialLink: "",
      audienceSize: "",
      description: "",
      ...defaultValues,
    },
  });

  const onSubmit = (values) => {
    const payload = {
      ...values,
      website: values.website || undefined,
      socialLink: values.socialLink || undefined,
    };
    mutation.mutate(payload);
  };

  return (
    <Card title={isReapply ? "Reapply for Partnership" : "Partner Application"}>
      <p className="mb-6 text-sm text-slate-600">
        Complete the form below. Our team will review your application within
        3–5 business days.
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4 md:grid-cols-2"
      >
        <Select
          id="partnerType"
          label="Partner Type"
          options={PARTNER_TYPES}
          error={errors.partnerType?.message}
          {...register("partnerType", { required: "Partner type is required" })}
        />
        <Input
          id="businessName"
          label="Business Name"
          error={errors.businessName?.message}
          {...register("businessName", {
            required: "Business name is required",
          })}
        />
        <Input
          id="phone"
          label="Phone"
          error={errors.phone?.message}
          {...register("phone", { required: "Phone is required" })}
        />
        <Input
          id="audienceSize"
          label="Audience Size"
          placeholder="e.g. 10k-50k"
          error={errors.audienceSize?.message}
          {...register("audienceSize", {
            required: "Audience size is required",
          })}
        />
        <Input
          id="website"
          label="Website"
          type="url"
          placeholder="https://"
          className="md:col-span-1"
          {...register("website")}
        />
        <Input
          id="socialLink"
          label="Social Link"
          type="url"
          placeholder="https://"
          {...register("socialLink")}
        />
        <div className="md:col-span-2">
          <Textarea
            id="description"
            label="Description"
            error={errors.description?.message}
            {...register("description", {
              required: "Description is required",
              minLength: { value: 20, message: "Minimum 20 characters" },
            })}
          />
        </div>
        <div className="md:col-span-2">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending
              ? "Submitting..."
              : isReapply
                ? "Resubmit Application"
                : "Submit Application"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ApplicationForm;
