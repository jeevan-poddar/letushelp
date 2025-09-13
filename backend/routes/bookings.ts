import { Router } from "express";
import { authenticateToken } from "../middleware/auth.js";
import {
  createBooking,
  getProviderBookings,
  getUserBookings,
  updateBookingStatus,
  updateBooking,
  rateBooking,
} from "../controllers/bookingController.js";

const router = Router();

// All routes require authentication
router.use(authenticateToken);

router.post("/", createBooking);
router.get("/", getUserBookings);
router.get("/provider", getProviderBookings);
router.patch("/:id/status", updateBookingStatus);
router.put("/:id", updateBooking);
router.post("/:id/rate", rateBooking);

export default router;
