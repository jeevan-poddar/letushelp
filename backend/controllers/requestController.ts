import type { Request, Response } from "express";
import { ServiceRequestModel } from "../models/ServiceRequest.js";
import { ProviderProfileModel } from "../models/ProviderProfile.js";
import type { CreateServiceRequestInput } from "../types/booking.js";

export const createRequest = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const data: CreateServiceRequestInput = req.body;

    // Validation
    if (!data.service_id || !data.title || !data.address || !data.city) {
      return res.status(400).json({
        error: "Service, title, address, and city are required",
      });
    }

    const request = await ServiceRequestModel.create(req.user.userId, data);
    res.status(201).json({ request });
  } catch (error: any) {
    console.error("Create service request error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserRequests = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const requests = await ServiceRequestModel.getByUserId(req.user.userId);
    res.json({ requests });
  } catch (error: any) {
    console.error("Get user requests error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProviderRequests = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    if (req.user.role !== "provider") {
      return res.status(403).json({ error: "Provider access required" });
    }

    // Get provider profile first
    const profile = await ProviderProfileModel.getByUserId(req.user.userId);
    if (!profile) {
      return res.status(404).json({ error: "Provider profile not found" });
    }

    const requests = await ServiceRequestModel.getAvailableForProvider(
      profile.id
    );

    res.json({ requests });
  } catch (error: any) {
    console.error("Get provider requests error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteRequest = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const idParam = req.params.id;
    if (typeof idParam !== "string") {
      return res.status(400).json({ error: "Request ID is required" });
    }
    const requestId = parseInt(idParam, 10);

    if (isNaN(requestId)) {
      return res.status(400).json({ error: "Invalid request ID" });
    }

    const deleted = await ServiceRequestModel.delete(
      requestId,
      req.user.userId
    );

    if (!deleted) {
      return res.status(404).json({
        error: "Request not found or cannot be deleted",
      });
    }

    res.json({ message: "Request deleted successfully" });
  } catch (error: any) {
    console.error("Delete service request error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Debug endpoint to check all requests
export const getAllRequests = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const query = `
      SELECT 
        sr.*,
        s.name as service_name,
        u.first_name,
        u.last_name
      FROM service_requests sr
      JOIN services s ON sr.service_id = s.id
      JOIN users u ON sr.user_id = u.id
      ORDER BY sr.created_at DESC
    `;

    const pool = (await import("../config/database.js")).default;
    const result = await pool.query(query);

    res.json({
      requests: result.rows,
      total: result.rows.length,
    });
  } catch (error: any) {
    console.error("Get all requests error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
