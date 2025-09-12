import type { Request, Response } from "express";
import { ProviderProfileModel } from "../models/ProviderProfile.js";
import type { CreateProviderProfileInput } from "../types/booking.js";

export const createProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    if (req.user.role !== "provider") {
      return res.status(403).json({ error: "Provider access required" });
    }

    const data: CreateProviderProfileInput = req.body;

    // Validation
    if (!data.city || !data.service_ids || data.service_ids.length === 0) {
      return res.status(400).json({
        error: "City and at least one service are required",
      });
    }

    // Check if profile already exists
    const existingProfile = await ProviderProfileModel.getByUserId(
      req.user.userId
    );
    if (existingProfile) {
      return res.status(409).json({
        error: "Provider profile already exists",
      });
    }

    const profile = await ProviderProfileModel.create(req.user.userId, data);
    res.status(201).json({ profile });
  } catch (error: any) {
    console.error("Create provider profile error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    if (req.user.role !== "provider") {
      return res.status(403).json({ error: "Provider access required" });
    }

    const profile = await ProviderProfileModel.getByUserId(req.user.userId);

    if (!profile) {
      return res.status(404).json({ error: "Provider profile not found" });
    }

    res.json({ profile });
  } catch (error: any) {
    console.error("Get provider profile error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    if (req.user.role !== "provider") {
      return res.status(403).json({ error: "Provider access required" });
    }

    const data: Partial<CreateProviderProfileInput> = req.body;

    const profile = await ProviderProfileModel.update(req.user.userId, data);
    res.json({ profile });
  } catch (error: any) {
    console.error("Update provider profile error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const toggleAvailability = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    if (req.user.role !== "provider") {
      return res.status(403).json({ error: "Provider access required" });
    }

    const profile = await ProviderProfileModel.toggleAvailability(
      req.user.userId
    );
    res.json({ profile });
  } catch (error: any) {
    console.error("Toggle availability error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
