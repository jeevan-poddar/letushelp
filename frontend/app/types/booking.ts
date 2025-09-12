export interface Service {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export interface ProviderProfile {
  id: number;
  user_id: number;
  city: string;
  bio?: string;
  experience_years: number;
  hourly_rate?: number;
  is_available: boolean;
  services: Service[];
  created_at: string;
  updated_at: string;
}

export interface ServiceRequest {
  id: number;
  user_id: number;
  service_id: number;
  title: string;
  description?: string;
  address: string;
  city: string;
  preferred_date?: string;
  preferred_time?: string;
  budget_min?: number;
  budget_max?: number;
  status: "pending" | "accepted" | "in_progress" | "completed" | "cancelled";
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: number;
  request_id: number;
  provider_id: number;
  accepted_at: string;
  scheduled_date?: string;
  scheduled_time?: string;
  estimated_duration?: number;
  final_price?: number;
  status: "confirmed" | "in_progress" | "completed" | "cancelled";
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateServiceRequestInput {
  service_id: number;
  title: string;
  description?: string;
  address: string;
  city: string;
  preferred_date?: string;
  preferred_time?: string;
  budget_min?: number;
  budget_max?: number;
}

export interface CreateProviderProfileInput {
  city: string;
  bio?: string;
  experience_years?: number;
  hourly_rate?: number;
  service_ids: number[];
}

export interface ServiceRequestWithDetails extends ServiceRequest {
  service: Service;
  user: {
    first_name: string;
    last_name: string;
    phone?: string;
  };
}

export interface BookingWithDetails extends Booking {
  request: ServiceRequestWithDetails;
  provider?: {
    user: {
      first_name: string;
      last_name: string;
      phone?: string;
    };
    city: string;
    hourly_rate?: number;
  };
}
