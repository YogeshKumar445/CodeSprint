const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const apiRoutes = require("./routes");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Core middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CodeSprint API is healthy",
  });
});

// API v1 routes
app.use("/api/v1", apiRoutes);

// 404 + Error middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;