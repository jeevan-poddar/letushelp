import type { Request, Response } from "express";
import { ServiceModel } from "../models/Service.js";

export const getServices = async (req: Request, res: Response) => {
  try {
    const services = await ServiceModel.getAll();
    res.json({ services });
  } catch (error: any) {
    console.error("Get services error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
