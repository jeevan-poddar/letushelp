import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router";
import { useAuth } from "~/contexts/AuthContext";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Checkbox } from "~/components/ui/checkbox";
import type { LoginFormData } from "~/types/auth";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["user", "provider"]).refine((val) => !!val, {
    message: "Please select a role",
  }),
});

interface LoginFormProps {
  onToggleForm?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onToggleForm }) => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [isProvider, setIsProvider] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      role: "user",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError("");
      await login(data);
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
        <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
        <p className="text-gray-600 mt-2">Welcome back to LetUsHelp</p>
      </div>

      <div className="mb-4" role="alert" aria-live="polite" aria-atomic="true">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            autoComplete="current-password"
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
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
            Login as a service provider
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
          {isLoading || isSubmitting ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      {onToggleForm && (
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={onToggleForm}
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      )}
    </div>
  );
};
