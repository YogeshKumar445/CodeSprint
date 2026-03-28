const express = require("express");
const {
  createProblem,
  getProblems,
  getProblemById,
} = require("../controllers/problemController");
const { protect } = require("../middlewares/authMiddleware");
const { adminOnly } = require("../middlewares/adminMiddleware");

const router = express.Router();

router.get("/", getProblems);
router.get("/:id", getProblemById);

// admin only
router.post("/", protect, adminOnly, createProblem);

module.exports = router;