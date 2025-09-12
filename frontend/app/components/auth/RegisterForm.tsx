import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router";
import { useAuth } from "~/contexts/AuthContext";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Checkbox } from "~/components/ui/checkbox";
import type { RegisterFormData } from "~/types/auth";

const registerSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    role: z.enum(["user", "provider"], { message: "Please select a role" }),
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    phone: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

interface RegisterFormProps {
  onToggleForm?: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onToggleForm }) => {
  const { register: registerUser, isLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [isProvider, setIsProvider] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "user",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setError("");
      await registerUser(data);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleRoleChange = (checked: boolean | "indeterminate") => {
    const isChecked = checked === true;
    setIsProvider(isChecked);
    setValue("role", isChecked ? "provider" : "user");
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Sign Up</h2>
        <p className="text-gray-600 mt-2">Create your LetUsHelp account</p>
      </div>

      <div className="mb-4" role="alert" aria-live="polite" aria-atomic="true">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="first_name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First Name
            </label>
            <Input
              id="first_name"
              {...register("first_name")}
              placeholder="Raj"
              autoComplete="given-name"
              aria-invalid={errors.first_name ? "true" : "false"}
            />
            {errors.first_name && (
              <p className="mt-1 text-sm text-red-600">
                {errors.first_name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="last_name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Last Name
            </label>
            <Input
              id="last_name"
              {...register("last_name")}
              placeholder="Sharma"
              autoComplete="family-name"
              aria-invalid={errors.last_name ? "true" : "false"}
            />
            {errors.last_name && (
              <p className="mt-1 text-sm text-red-600">
                {errors.last_name.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="raj@example.com"
            autoComplete="email"
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone (Optional)
          </label>
          <Input
            id="phone"
            type="tel"
            {...register("phone")}
            placeholder="+91 98765 43210"
            autoComplete="tel"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <Input
            id="password"
            type="password"
            {...register("password")}
            placeholder="Enter your password"
            autoComplete="new-password"
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm Password
          </label>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirm your password"
            autoComplete="new-password"
            aria-invalid={errors.confirmPassword ? "true" : "false"}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="provider"
            checked={isProvider}
            onCheckedChange={handleRoleChange}
          />
          <label
            htmlFor="provider"
            className="text-sm font-medium text-gray-700 cursor-pointer"
          >
            Register as a service provider
          </label>
        </div>

        {errors.role && (
          <p className="text-sm text-red-600">{errors.role.message}</p>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || isSubmitting}
        >
          {isLoading || isSubmitting ? "Creating account..." : "Create Account"}
        </Button>
      </form>

      {onToggleForm && (
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onToggleForm}
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Sign in
            </button>
          </p>
        </div>
      )}
    </div>
  );
};
