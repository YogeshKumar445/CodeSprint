const express = require("express");
const {
  createProblem,
  getProblems,
  getProblemById,
} = require("../controllers/problemController");

const router = express.Router();

// For MVP: open endpoints
router.post("/", createProblem);
router.get("/", getProblems);
router.get("/:id", getProblemById);

module.exports = router;