const express = require("express");
const {
  createSubmission,
  getMySubmissions,
  getMySubmissionsByProblem,
} = require("../controllers/submissionController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, createSubmission);
router.get("/my", protect, getMySubmissions);
router.get("/problem/:problemId", protect, getMySubmissionsByProblem);

module.exports = router;