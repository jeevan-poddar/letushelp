import React, { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Settings,
  Clock,
  CheckCircle,
  XCircle,
  MapPin,
  DollarSign,
  User,
  Calendar,
} from "lucide-react";
import { providerAPI, requestAPI, bookingAPI } from "~/services/bookingAPI";
import { ProviderProfileForm } from "~/components/provider/ProviderProfileForm";
import type {
  ProviderProfile,
  ServiceRequestWithDetails,
  BookingWithDetails,
} from "~/types/booking";

export const ProviderDashboard: React.FC = () => {
  const [profile, setProfile] = useState<ProviderProfile | null>(null);
  const [availableRequests, setAvailableRequests] = useState<
    ServiceRequestWithDetails[]
  >([]);
  const [bookings, setBookings] = useState<BookingWithDetails[]>([]);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bookingForm, setBookingForm] = useState<{
    requestId: number;
    isOpen: boolean;
    request?: ServiceRequestWithDetails;
  }>({ requestId: 0, isOpen: false });
  const [quoteError, setQuoteError] = useState<string>("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);

      // Try to get provider profile first
      try {
        const profileData = await providerAPI.getProfile();
        setProfile(profileData.profile);

        // If profile exists, load requests and bookings
        const [requestsData, bookingsData] = await Promise.all([
          requestAPI.getProviderRequests(),
          bookingAPI.getProviderBookings(),
        ]);

        setAvailableRequests(requestsData.requests);
        setBookings(bookingsData.bookings);
      } catch (profileError: any) {
        if (profileError.response?.status === 404) {
          // No profile exists, show form
          setShowProfileForm(true);
        } else {
          throw profileError;
        }
      }
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptRequest = async (
    requestId: number,
    finalPrice?: number,
    notes?: string
  ) => {
    try {
      await bookingAPI.create({
        request_id: requestId,
        final_price: finalPrice,
        notes: notes,
      });

      // Refresh data
      loadData();
      setBookingForm({ requestId: 0, isOpen: false });
      setQuoteError("");
    } catch (error) {
      console.error("Failed to accept request:", error);
    }
  };

  const handleUpdateBookingStatus = async (
    bookingId: number,
    status: string
  ) => {
    try {
      await bookingAPI.updateStatus(bookingId, status as any);
      loadData(); // Refresh data
    } catch (error) {
      console.error("Failed to update booking status:", error);
    }
  };

  const toggleAvailability = async () => {
    try {
      const updatedProfile = await providerAPI.toggleAvailability();
      setProfile(updatedProfile.profile);
    } catch (error) {
      console.error("Failed to toggle availability:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-600 bg-yellow-50";
      case "confirmed":
        return "text-blue-600 bg-blue-50";
      case "in_progress":
        return "text-purple-600 bg-purple-50";
      case "completed":
        return "text-green-600 bg-green-50";
      case "cancelled":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
      case "confirmed":
        return <Clock className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (showProfileForm || !profile) {
    return (
      <ProviderProfileForm
        onSuccess={(newProfile) => {
          setProfile(newProfile);
          setShowProfileForm(false);
          loadData();
        }}
        existingProfile={profile || undefined}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Provider Profile Header */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Provider Profile
            </h2>
            <p className="text-gray-600">
              {profile.city} • {profile.services.map((s) => s.name).join(", ")}
            </p>
            <div className="flex items-center space-x-4 mt-2">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  profile.is_available
                    ? "text-green-600 bg-green-50"
                    : "text-red-600 bg-red-50"
                }`}
              >
                {profile.is_available ? "Available" : "Unavailable"}
              </span>
              {profile.hourly_rate && (
                <span className="text-sm text-gray-600">
                  ₹{profile.hourly_rate}/hour
                </span>
              )}
            </div>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={toggleAvailability}>
              {profile.is_available ? "Go Offline" : "Go Online"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowProfileForm(true)}
            >
              <Settings className="h-4 w-4 mr-1" />
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Available Requests</h3>
          <p className="text-3xl font-bold text-blue-600">
            {availableRequests.length}
          </p>
          <p className="text-sm text-gray-500">In your area & services</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Active Jobs</h3>
          <p className="text-3xl font-bold text-purple-600">
            {
              bookings.filter((b) =>
                ["confirmed", "in_progress"].includes(b.status)
              ).length
            }
          </p>
          <p className="text-sm text-gray-500">Currently working on</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Completed Jobs</h3>
          <p className="text-3xl font-bold text-green-600">
            {bookings.filter((b) => b.status === "completed").length}
          </p>
          <p className="text-sm text-gray-500">Successfully finished</p>
        </div>
      </div>

      {/* Available Requests */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">
            Available Service Requests
          </h2>
          <p className="text-gray-600 text-sm">
            Requests matching your city and services
          </p>
        </div>

        {availableRequests.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <p>No service requests available right now.</p>
            <p className="text-sm mt-1">Make sure you have:</p>
            <ul className="text-sm mt-2 space-y-1">
              <li>• Set your city correctly in your profile</li>
              <li>• Selected the services you offer</li>
              <li>• Users have posted requests in your city</li>
            </ul>
            <p className="text-sm mt-2 text-blue-600">
              Current profile: {profile?.city} •{" "}
              {profile?.services.map((s) => s.name).join(", ")}
            </p>
          </div>
        ) : (
          <div className="divide-y">
            {availableRequests.map((request) => (
              <div key={request.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {request.title}
                      </h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                        {request.service.name}
                      </span>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <span className="inline-flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {request.user.first_name} {request.user.last_name}
                      </span>
                      <span className="inline-flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {request.address}
                      </span>

                      {request.preferred_date && (
                        <span className="inline-flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(
                            request.preferred_date
                          ).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    {request.description && (
                      <p className="text-gray-600 text-sm mb-3">
                        {request.description}
                      </p>
                    )}
                  </div>

                  <Button
                    onClick={() =>
                      setBookingForm({
                        requestId: request.id,
                        isOpen: true,
                        request,
                      })
                    }
                    size="sm"
                  >
                    Accept Job
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Active Bookings */}
      {bookings.length > 0 && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900">Your Jobs</h2>
          </div>

          <div className="divide-y">
            {bookings.map((booking) => (
              <div key={booking.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {booking.request.title}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}
                      >
                        {getStatusIcon(booking.status)}
                        <span className="ml-1 capitalize">
                          {booking.status}
                        </span>
                      </span>
                      {booking.reference_id && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-gray-100 text-gray-700">
                          {booking.reference_id}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <span className="inline-flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {booking.request.user.first_name}{" "}
                        {booking.request.user.last_name}
                      </span>
                      <span className="inline-flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {booking.request.address}
                      </span>
                      {booking.final_price && (
                        <span className="inline-flex items-center">
                          ₹ {booking.final_price}
                        </span>
                      )}
                    </div>

                    {booking.notes && (
                      <p className="text-gray-600 text-sm">{booking.notes}</p>
                    )}
                  </div>

                  {booking.status === "confirmed" && (
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() =>
                          handleUpdateBookingStatus(booking.id, "in_progress")
                        }
                      >
                        Start Job
                      </Button>
                    </div>
                  )}

                  {booking.status === "in_progress" && (
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() =>
                          handleUpdateBookingStatus(booking.id, "completed")
                        }
                      >
                        Mark Complete
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Accept Job Modal */}
      {bookingForm.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Accept This Job</h3>

              {/* {bookingForm.request && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-sm text-blue-800">
                    Customer Budget: ₹{bookingForm.request.budget_min} - ₹
                    {bookingForm.request.budget_max}
                  </p>
                </div>
              )} */}

              {quoteError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600 font-medium">
                    {quoteError}
                  </p>
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const finalPrice = formData.get("final_price") as string;
                  const notes = formData.get("notes") as string;

                  setQuoteError("");

                  if (finalPrice && bookingForm.request?.budget_max) {
                    const priceValue = parseFloat(finalPrice);
                    if (priceValue > bookingForm.request.budget_max) {
                      setQuoteError("aukat me reh dalle");
                      return;
                    }
                  }

                  handleAcceptRequest(
                    bookingForm.requestId,
                    finalPrice ? parseFloat(finalPrice) : undefined,
                    notes || undefined
                  );
                }}
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Quote (₹)
                    </label>
                    <Input
                      name="final_price"
                      type="number"
                      step="0.01"
                      max={bookingForm.request?.budget_max || undefined}
                      placeholder="Enter your price"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notes (Optional)
                    </label>
                    <textarea
                      name="notes"
                      rows={3}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Any additional information..."
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setBookingForm({ requestId: 0, isOpen: false });
                      setQuoteError("");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Accept Job</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
