require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

const authRoutes = require("./routes/authRoutes");
const mealRoutes = require("./routes/mealRoutes");
const nutritionRoutes = require("./routes/nutritionRoutes");
const goalRoutes = require("./routes/goalRoutes");
const suggestionRoutes = require("./routes/suggestionRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

const app = express();

// DB
connectDB();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Health
app.get("/", (_req, res) => res.json({ ok: true, service: "NutriSnap AI API" }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/meals", mealRoutes);
app.use("/api/nutrition", nutritionRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/suggestions", suggestionRoutes);
app.use("/api/feedback", feedbackRoutes);

// 404 + error handler
app.use((req, res) => res.status(404).json({ message: "Route not found" }));
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 NutriSnap API running on http://localhost:${PORT}`));
