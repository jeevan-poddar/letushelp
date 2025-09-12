export interface Service {
  id: number;
  name: string;
  description: string;
  created_at: Date;
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
  created_at: Date;
  updated_at: Date;
}

export interface ServiceRequest {
  id: number;
  user_id: number;
  service_id: number;
  title: string;
  description?: string;
  address: string;
  city: string;
  preferred_date?: Date;
  preferred_time?: string;
  budget_min?: number;
  budget_max?: number;
  status: "pending" | "accepted" | "in_progress" | "completed" | "cancelled";
  created_at: Date;
  updated_at: Date;
}

export interface Booking {
  id: number;
  request_id: number;
  provider_id: number;
  accepted_at: Date;
  scheduled_date?: Date;
  scheduled_time?: string;
  estimated_duration?: number;
  final_price?: number;
  status: "confirmed" | "in_progress" | "completed" | "cancelled";
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateProviderProfileInput {
  city: string;
  bio?: string;
  experience_years?: number;
  hourly_rate?: number;
  service_ids: number[];
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

export interface CreateBookingInput {
  request_id: number;
  scheduled_date?: string;
  scheduled_time?: string;
  estimated_duration?: number;
  final_price?: number;
  notes?: string;
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
  provider: {
    user: {
      first_name: string;
      last_name: string;
      phone?: string;
    };
    city: string;
    hourly_rate?: number;
  };
}
