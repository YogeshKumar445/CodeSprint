const express = require("express");
const authRoutes = require("./authRoutes");
const problemRoutes = require("./problemRoutes");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to CodeSprint API v1",
  });
});

router.use("/auth", authRoutes);
router.use("/problems", problemRoutes);

module.exports = router;