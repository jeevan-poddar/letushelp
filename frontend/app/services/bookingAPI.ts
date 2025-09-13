import api from "./api";
import type {
  Service,
  ProviderProfile,
  ServiceRequest,
  ServiceRequestWithDetails,
  Booking,
  BookingWithDetails,
  CreateServiceRequestInput,
  CreateProviderProfileInput,
} from "../types/booking";

export const serviceAPI = {
  getAll: async (): Promise<{ services: Service[] }> => {
    const response = await api.get("/services");
    return response.data;
  },
};

export const providerAPI = {
  createProfile: async (
    data: CreateProviderProfileInput
  ): Promise<{ profile: ProviderProfile }> => {
    const response = await api.post("/provider/profile", data);
    return response.data;
  },

  getProfile: async (): Promise<{ profile: ProviderProfile }> => {
    const response = await api.get("/provider/profile");
    return response.data;
  },

  updateProfile: async (
    data: Partial<CreateProviderProfileInput>
  ): Promise<{ profile: ProviderProfile }> => {
    const response = await api.put("/provider/profile", data);
    return response.data;
  },

  toggleAvailability: async (): Promise<{ profile: ProviderProfile }> => {
    const response = await api.patch("/provider/profile/availability");
    return response.data;
  },
};

export const requestAPI = {
  create: async (
    data: CreateServiceRequestInput
  ): Promise<{ request: ServiceRequest }> => {
    const response = await api.post("/requests", data);
    return response.data;
  },

  getUserRequests: async (): Promise<{
    requests: ServiceRequestWithDetails[];
  }> => {
    const response = await api.get("/requests");
    return response.data;
  },

  getProviderRequests: async (): Promise<{
    requests: ServiceRequestWithDetails[];
  }> => {
    const response = await api.get("/requests/provider");
    return response.data;
  },

  delete: async (id: number): Promise<{ message: string }> => {
    const response = await api.delete(`/requests/${id}`);
    return response.data;
  },
};

export const bookingAPI = {
  create: async (data: {
    request_id: number;
    scheduled_date?: string;
    scheduled_time?: string;
    estimated_duration?: number;
    final_price?: number;
    notes?: string;
  }): Promise<{ booking: Booking }> => {
    const response = await api.post("/bookings", data);
    return response.data;
  },

  getUserBookings: async (): Promise<{ bookings: BookingWithDetails[] }> => {
    const response = await api.get("/bookings");
    return response.data;
  },

  getProviderBookings: async (): Promise<{
    bookings: BookingWithDetails[];
  }> => {
    const response = await api.get("/bookings/provider");
    return response.data;
  },

  updateStatus: async (
    id: number,
    status: Booking["status"]
  ): Promise<{ booking: Booking }> => {
    const response = await api.patch(`/bookings/${id}/status`, { status });
    return response.data;
  },

  update: async (
    id: number,
    data: {
      scheduled_date?: string;
      scheduled_time?: string;
      estimated_duration?: number;
      final_price?: number;
      notes?: string;
    }
  ): Promise<{ booking: Booking }> => {
    const response = await api.put(`/bookings/${id}`, data);
    return response.data;
  },

  rate: async (
    id: number,
    data: { rating: number; review?: string }
  ): Promise<{ booking: Booking }> => {
    const response = await api.post(`/bookings/${id}/rate`, data);
    return response.data;
  },
};
