import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Checkbox } from "~/components/ui/checkbox";
import { serviceAPI, providerAPI } from "~/services/bookingAPI";
import type {
  Service,
  CreateProviderProfileInput,
  ProviderProfile,
} from "~/types/booking";

const providerProfileSchema = z.object({
  city: z.string().min(1, "City is required"),
  bio: z.string().optional(),
  experience_years: z.number().min(0).max(50).optional(),
  hourly_rate: z.number().min(0).optional(),
  service_ids: z.array(z.number()).min(1, "Please select at least one service"),
});

interface ProviderProfileFormProps {
  onSuccess?: (profile: ProviderProfile) => void;
  existingProfile?: ProviderProfile;
}

export const ProviderProfileForm: React.FC<ProviderProfileFormProps> = ({
  onSuccess,
  existingProfile,
}) => {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateProviderProfileInput>({
    resolver: zodResolver(providerProfileSchema),
    defaultValues: {
      city: existingProfile?.city || "",
      bio: existingProfile?.bio || "",
      experience_years: existingProfile?.experience_years || 0,
      hourly_rate: existingProfile?.hourly_rate || undefined,
      service_ids: existingProfile?.services?.map((s) => s.id) || [],
    },
  });

  useEffect(() => {
    loadServices();
    if (existingProfile?.services) {
      setSelectedServices(existingProfile.services.map((s) => s.id));
      setValue(
        "service_ids",
        existingProfile.services.map((s) => s.id)
      );
    }
  }, [existingProfile, setValue]);

  const loadServices = async () => {
    try {
      const data = await serviceAPI.getAll();
      setServices(data.services);
    } catch (error) {
      console.error("Failed to load services:", error);
    }
  };

  const handleServiceToggle = (serviceId: number) => {
    const newSelectedServices = selectedServices.includes(serviceId)
      ? selectedServices.filter((id) => id !== serviceId)
      : [...selectedServices, serviceId];

    setSelectedServices(newSelectedServices);
    setValue("service_ids", newSelectedServices);
  };

  const onSubmit = async (data: CreateProviderProfileInput) => {
    try {
      setIsLoading(true);
      setError("");

      let profile: ProviderProfile;
      if (existingProfile) {
        const response = await providerAPI.updateProfile(data);
        profile = response.profile;
      } else {
        const response = await providerAPI.createProfile(data);
        profile = response.profile;
      }

      onSuccess?.(profile);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to save profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {existingProfile ? "Update" : "Create"} Provider Profile
        </h2>
        <p className="text-gray-600 mt-2">
          Set up your profile to start receiving service requests
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            City *
          </label>
          <Input id="city" {...register("city")} placeholder="Noida" />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            You'll only see service requests from Noida
          </p>
        </div>

        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Bio
          </label>
          <textarea
            id="bio"
            {...register("bio")}
            rows={3}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Tell customers about your experience and expertise..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="experience_years"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Years of Experience
            </label>
            <Input
              id="experience_years"
              type="number"
              min="0"
              max="50"
              {...register("experience_years", { valueAsNumber: true })}
              placeholder="5"
            />
            {errors.experience_years && (
              <p className="mt-1 text-sm text-red-600">
                {errors.experience_years.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="hourly_rate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Hourly Rate (₹)
            </label>
            <Input
              id="hourly_rate"
              type="number"
              step="0.01"
              min="0"
              {...register("hourly_rate", { valueAsNumber: true })}
              placeholder="₹500.00"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Services You Provide *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {services.map((service) => (
              <div key={service.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`service-${service.id}`}
                  checked={selectedServices.includes(service.id)}
                  onCheckedChange={() => handleServiceToggle(service.id)}
                />
                <label
                  htmlFor={`service-${service.id}`}
                  className="text-sm font-medium text-gray-700 cursor-pointer"
                >
                  {service.name}
                </label>
              </div>
            ))}
          </div>
          {errors.service_ids && (
            <p className="mt-1 text-sm text-red-600">
              {errors.service_ids.message}
            </p>
          )}
          <p className="mt-2 text-xs text-gray-500">
            You'll only see requests for the services you select
          </p>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full md:w-auto"
          >
            {isLoading
              ? existingProfile
                ? "Updating..."
                : "Creating..."
              : existingProfile
                ? "Update Profile"
                : "Create Profile"}
          </Button>
        </div>
      </form>
    </div>
  );
};
