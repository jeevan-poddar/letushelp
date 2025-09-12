import { Router } from "express";
import { authenticateToken } from "../middleware/auth.js";
import {
  createRequest,
  getUserRequests,
  getProviderRequests,
  deleteRequest,
  getAllRequests,
} from "../controllers/requestController.js";

const router = Router();

// All routes require authentication
router.use(authenticateToken);

router.post("/", createRequest);
router.get("/", getUserRequests);
router.get("/provider", getProviderRequests);
router.get("/debug/all", getAllRequests);
router.delete("/:id", deleteRequest);

export default router;
