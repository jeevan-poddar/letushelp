import React, { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import {
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  MapPin,
  DollarSign,
} from "lucide-react";
import { requestAPI, bookingAPI } from "~/services/bookingAPI";
import { BookingForm } from "~/components/booking/BookingForm";
import type {
  ServiceRequestWithDetails,
  BookingWithDetails,
} from "~/types/booking";

export const UserDashboard: React.FC = () => {
  const [requests, setRequests] = useState<ServiceRequestWithDetails[]>([]);
  const [bookings, setBookings] = useState<BookingWithDetails[]>([]);
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [ratingState, setRatingState] = useState<{
    [bookingId: number]: {
      rating: number;
      review: string;
      submitting: boolean;
      error?: string;
    };
  }>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [requestsData, bookingsData] = await Promise.all([
        requestAPI.getUserRequests(),
        bookingAPI.getUserBookings(),
      ]);

      setRequests(requestsData.requests);
      setBookings(bookingsData.bookings);
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRequest = async (requestId: number) => {
    try {
      await requestAPI.delete(requestId);
      setRequests(requests.filter((r) => r.id !== requestId));
    } catch (error) {
      console.error("Failed to delete request:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-600 bg-yellow-50";
      case "accepted":
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
        return <Clock className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const handleSubmitRating = async (
    bookingId: number,
    rating: number,
    review: string
  ) => {
    try {
      setRatingState((s) => ({
        ...s,
        [bookingId]: { rating, review, submitting: true, error: undefined },
      }));
      await bookingAPI.rate(bookingId, { rating, review: review || undefined });
      await loadData();
      setRatingState((s) => ({
        ...s,
        [bookingId]: { rating, review, submitting: false },
      }));
    } catch (error: any) {
      setRatingState((s) => ({
        ...s,
        [bookingId]: {
          rating,
          review,
          submitting: false,
          error: error?.response?.data?.error || "Failed to submit rating",
        },
      }));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Active Requests</h3>
          <p className="text-3xl font-bold text-blue-600">
            {requests.filter((r) => r.status === "pending").length}
          </p>
          <p className="text-sm text-gray-500">Waiting for providers</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Active Bookings</h3>
          <p className="text-3xl font-bold text-green-600">
            {
              bookings.filter((b) =>
                ["confirmed", "in_progress"].includes(b.status)
              ).length
            }
          </p>
          <p className="text-sm text-gray-500">In progress</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Completed Services</h3>
          <p className="text-3xl font-bold text-purple-600">
            {bookings.filter((b) => b.status === "completed").length}
          </p>
          <p className="text-sm text-gray-500">Successfully finished</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
          <Button
            onClick={() => setIsBookingFormOpen(true)}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>New Service Request</span>
          </Button>
        </div>
      </div>

      {/* Service Requests */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">
            Your Service Requests
          </h2>
        </div>

        {requests.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <p>No service requests yet.</p>
            <Button onClick={() => setIsBookingFormOpen(true)} className="mt-4">
              Create Your First Request
            </Button>
          </div>
        ) : (
          <div className="divide-y">
            {requests.map((request) => (
              <div key={request.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {request.title}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}
                      >
                        {getStatusIcon(request.status)}
                        <span className="ml-1 capitalize">
                          {request.status}
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <span className="inline-flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {request.city}
                      </span>
                      {request.budget_min && request.budget_max && (
                        <span className="inline-flex items-center">
                          ₹ {request.budget_min} - ₹{request.budget_max}
                        </span>
                      )}
                    </div>

                    <p className="text-gray-600 mb-2">{request.service.name}</p>
                    {request.description && (
                      <p className="text-gray-500 text-sm">
                        {request.description}
                      </p>
                    )}
                  </div>

                  {request.status === "pending" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteRequest(request.id)}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      Cancel
                    </Button>
                  )}
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
            <h2 className="text-xl font-bold text-gray-900">Your Bookings</h2>
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

                    {booking.provider && (
                      <p className="text-gray-600 mb-2">
                        Provider: {booking.provider.user.first_name}{" "}
                        {booking.provider.user.last_name}
                      </p>
                    )}

                    <div className="flex items-center space-x-4 text-sm text-gray-600">
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

                    {booking.status === "completed" && (
                      <div className="mt-3">
                        {typeof booking.rating === "number" ? (
                          <p className="text-sm text-gray-700">
                            Your rating: {"★".repeat(booking.rating)}
                            {"☆".repeat(5 - booking.rating)}
                            {booking.review ? ` — "${booking.review}"` : ""}
                          </p>
                        ) : (
                          <div className="bg-gray-50 border border-gray-200 rounded p-3">
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                const form = e.currentTarget as HTMLFormElement;
                                const formData = new FormData(form);
                                const rating = Number(formData.get("rating"));
                                const review = String(
                                  formData.get("review") || ""
                                );
                                handleSubmitRating(booking.id, rating, review);
                              }}
                            >
                              <div className="flex items-center space-x-2 mb-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    key={star}
                                    type="button"
                                    onClick={() =>
                                      setRatingState((s) => ({
                                        ...s,
                                        [booking.id]: {
                                          rating: star,
                                          review: s[booking.id]?.review || "",
                                          submitting: false,
                                        },
                                      }))
                                    }
                                    className={`text-xl ${
                                      (ratingState[booking.id]?.rating || 0) >=
                                      star
                                        ? "text-yellow-500"
                                        : "text-gray-300"
                                    }`}
                                    aria-label={`${star} star`}
                                  >
                                    ★
                                  </button>
                                ))}
                                <input
                                  type="hidden"
                                  name="rating"
                                  value={ratingState[booking.id]?.rating || 5}
                                />
                              </div>
                              <textarea
                                name="review"
                                rows={2}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Share your experience (optional)"
                                defaultValue={
                                  ratingState[booking.id]?.review || ""
                                }
                              />
                              {ratingState[booking.id]?.error && (
                                <p className="text-sm text-red-600 mt-1">
                                  {ratingState[booking.id]?.error}
                                </p>
                              )}
                              <div className="mt-2">
                                <Button
                                  type="submit"
                                  size="sm"
                                  disabled={
                                    !!ratingState[booking.id]?.submitting
                                  }
                                >
                                  {ratingState[booking.id]?.submitting
                                    ? "Submitting..."
                                    : "Submit Rating"}
                                </Button>
                              </div>
                            </form>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Booking Form Modal */}
      <BookingForm
        isOpen={isBookingFormOpen}
        onClose={() => setIsBookingFormOpen(false)}
        onSuccess={() => {
          loadData(); // Refresh data
        }}
      />
    </div>
  );
};
