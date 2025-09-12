import type { Request, Response } from "express";
import { BookingModel } from "../models/Booking.js";
import { ProviderProfileModel } from "../models/ProviderProfile.js";
import { ServiceRequestModel } from "../models/ServiceRequest.js";
import type { CreateBookingInput } from "../types/booking.js";

export const createBooking = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    if (req.user.role !== "provider") {
      return res.status(403).json({ error: "Provider access required" });
    }

    // Get provider profile
    const profile = await ProviderProfileModel.getByUserId(req.user.userId);
    if (!profile) {
      return res.status(404).json({ error: "Provider profile not found" });
    }

    const data: CreateBookingInput = req.body;

    // Validation
    if (!data.request_id) {
      return res.status(400).json({ error: "Request ID is required" });
    }

    // Check if request exists and is available
    const serviceRequest = await ServiceRequestModel.getById(data.request_id);
    if (!serviceRequest) {
      return res.status(404).json({ error: "Service request not found" });
    }

    if (serviceRequest.status !== "pending") {
      return res.status(400).json({
        error: "Service request is no longer available",
      });
    }

    const booking = await BookingModel.create(profile.id, data);
    res.status(201).json({ booking });
  } catch (error: any) {
    console.error("Create booking error:", error);

    if (error.code === "23505") {
      // Unique constraint violation
      return res.status(409).json({
        error: "This request has already been accepted",
      });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProviderBookings = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    if (req.user.role !== "provider") {
      return res.status(403).json({ error: "Provider access required" });
    }

    // Get provider profile
    const profile = await ProviderProfileModel.getByUserId(req.user.userId);
    if (!profile) {
      return res.status(404).json({ error: "Provider profile not found" });
    }

    const bookings = await BookingModel.getByProviderId(profile.id);
    res.json({ bookings });
  } catch (error: any) {
    console.error("Get provider bookings error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserBookings = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const bookings = await BookingModel.getByUserId(req.user.userId);
    res.json({ bookings });
  } catch (error: any) {
    console.error("Get user bookings error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    if (req.user.role !== "provider") {
      return res.status(403).json({ error: "Provider access required" });
    }

    const bookingId = parseInt(req.params.id!);
    const { status } = req.body;

    if (isNaN(bookingId)) {
      return res.status(400).json({ error: "Invalid booking ID" });
    }

    if (
      !["confirmed", "in_progress", "completed", "cancelled"].includes(status)
    ) {
      return res.status(400).json({ error: "Invalid status" });
    }

    // Get provider profile
    const profile = await ProviderProfileModel.getByUserId(req.user.userId);
    if (!profile) {
      return res.status(404).json({ error: "Provider profile not found" });
    }

    const booking = await BookingModel.updateStatus(
      bookingId,
      status,
      profile.id
    );

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json({ booking });
  } catch (error: any) {
    console.error("Update booking status error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateBooking = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    if (req.user.role !== "provider") {
      return res.status(403).json({ error: "Provider access required" });
    }

    const bookingId = parseInt(req.params.id!);
    const data: Partial<CreateBookingInput> = req.body;

    if (isNaN(bookingId)) {
      return res.status(400).json({ error: "Invalid booking ID" });
    }

    // Get provider profile
    const profile = await ProviderProfileModel.getByUserId(req.user.userId);
    if (!profile) {
      return res.status(404).json({ error: "Provider profile not found" });
    }

    const booking = await BookingModel.update(bookingId, profile.id, data);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json({ booking });
  } catch (error: any) {
    console.error("Update booking error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
