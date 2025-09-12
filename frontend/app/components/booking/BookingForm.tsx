import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { serviceAPI, requestAPI } from "~/services/bookingAPI";
import type { Service, CreateServiceRequestInput } from "~/types/booking";

const bookingSchema = z.object({
  service_id: z.number().min(1, "Please select a service"),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  preferred_date: z.string().optional(),
  preferred_time: z.string().optional(),
  budget_min: z.number().min(0).optional(),
  budget_max: z.number().min(0).optional(),
});

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CreateServiceRequestInput>({
    resolver: zodResolver(bookingSchema),
  });

  useEffect(() => {
    if (isOpen) {
      loadServices();
    }
  }, [isOpen]);

  const loadServices = async () => {
    try {
      const data = await serviceAPI.getAll();
      setServices(data.services);
    } catch (error) {
      console.error("Failed to load services:", error);
    }
  };

  const onSubmit = async (data: CreateServiceRequestInput) => {
    try {
      setIsLoading(true);
      setError("");

      await requestAPI.create(data);

      reset();
      onSuccess?.();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to create booking request");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Book a Service</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div>
            <label
              htmlFor="service_id"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Service Type *
            </label>
            <select
              id="service_id"
              {...register("service_id", { valueAsNumber: true })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
            {errors.service_id && (
              <p className="mt-1 text-sm text-red-600">
                {errors.service_id.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Service Title *
            </label>
            <Input
              id="title"
              {...register("title")}
              placeholder="e.g., Fix leaking kitchen faucet"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register("description")}
              rows={3}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe the work needed in detail..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Address *
              </label>
              <Input
                id="address"
                {...register("address")}
                placeholder="B-64, Sector 2, Noida"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                City *
              </label>
              <Input id="city" {...register("city")} placeholder="Noida" />
              {errors.city && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.city.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="preferred_date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Preferred Date
              </label>
              <Input
                id="preferred_date"
                type="date"
                {...register("preferred_date")}
              />
            </div>

            <div>
              <label
                htmlFor="preferred_time"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Preferred Time
              </label>
              <Input
                id="preferred_time"
                type="time"
                {...register("preferred_time")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="budget_min"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Budget Min (₹)
              </label>
              <Input
                id="budget_min"
                type="number"
                step="0.01"
                min="0"
                {...register("budget_min", { valueAsNumber: true })}
                placeholder="500"
              />
            </div>

            <div>
              <label
                htmlFor="budget_max"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Budget Max (₹)
              </label>
              <Input
                id="budget_max"
                type="number"
                step="0.01"
                min="0"
                {...register("budget_max", { valueAsNumber: true })}
                placeholder="2000"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Request"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
