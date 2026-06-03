import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Input from "../components/common/Input";
import { useAuth } from "../hooks/useAuth";
import { getErrorMessage } from "../utils/getErrorMessage";
import { ROUTES } from "../utils/constants";

const RegisterPage = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async ({ name, email, password }) => {
    setIsSubmitting(true);
    try {
      await registerUser({ name, email, password });
      toast.success("Account created");
      navigate(ROUTES.PARTNER, { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error, "Registration failed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card title="Create Partner Account">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          id="name"
          label="Full Name"
          error={errors.name?.message}
          {...register("name", { required: "Name is required" })}
        />
        <Input
          id="email"
          label="Email"
          type="email"
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Enter a valid email",
            },
          })}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          error={errors.password?.message}
          {...register("password", {
            required: "Password is required",
            minLength: { value: 8, message: "Minimum 8 characters" },
          })}
        />
        <Input
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword", {
            required: "Please confirm password",
            validate: (v) =>
              v === watch("password") || "Passwords do not match",
          })}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Register"}
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-slate-600">
        Already registered?{" "}
        <Link to={ROUTES.LOGIN} className="font-medium text-primary">
          Sign in
        </Link>
      </p>
    </Card>
  );
};

export default RegisterPage;
