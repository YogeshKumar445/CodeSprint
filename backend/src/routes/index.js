const express = require("express");

const router = express.Router();

// Temporary test route
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to CodeSprint API v1",
  });
});

module.exports = router;