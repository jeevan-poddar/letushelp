import { Router } from "express";
import { authenticateToken } from "../middleware/auth.js";
import {
  createProfile,
  getProfile,
  updateProfile,
  toggleAvailability,
} from "../controllers/providerController.js";

const router = Router();

// All routes require authentication
router.use(authenticateToken);

router.post("/profile", createProfile);
router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.patch("/profile/availability", toggleAvailability);

export default router;
