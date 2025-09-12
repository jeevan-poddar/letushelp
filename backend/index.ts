import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.js";
import serviceRoutes from "./routes/services.js";
import providerRoutes from "./routes/provider.js";
import requestRoutes from "./routes/requests.js";
import bookingRoutes from "./routes/bookings.js";

const app = express();
const port = process.env.PORT || 8080;

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/provider", providerRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => {
  res.json({ message: "LetUsHelp API Server" });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
