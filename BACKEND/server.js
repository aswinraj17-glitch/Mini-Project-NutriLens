require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "*", credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.get("/", (_req, res) => res.json({ ok: true, name: "nutrisnap-backend" }));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/meals", require("./routes/meals"));
app.use("/api/logs", require("./routes/logs"));
app.use("/api/suggestions", require("./routes/suggestions"));

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("Missing MONGO_URI in .env");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
