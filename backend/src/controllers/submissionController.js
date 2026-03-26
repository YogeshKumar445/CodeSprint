const Submission = require("../models/Submission");
const Problem = require("../models/Problem");

// MVP evaluation logic:
// If code contains keyword "return" and has enough length => Accepted else Wrong Answer
function evaluateCode(code) {
  const normalized = (code || "").trim().toLowerCase();

  if (normalized.length >= 20 && normalized.includes("return")) {
    return { verdict: "Accepted", score: 100, executionTimeMs: 42 };
  }

  return { verdict: "Wrong Answer", score: 0, executionTimeMs: 15 };
}

// POST /api/v1/submissions
async function createSubmission(req, res, next) {
  try {
    const { problemId, language, code } = req.body;

    if (!problemId || !language || !code) {
      return res.status(400).json({
        success: false,
        message: "problemId, language and code are required",
      });
    }

    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    const result = evaluateCode(code);

    const submission = await Submission.create({
      user: req.user._id,
      problem: problemId,
      language,
      code,
      verdict: result.verdict,
      score: result.score,
      executionTimeMs: result.executionTimeMs,
    });

    return res.status(201).json({
      success: true,
      message: "Submission created",
      data: submission,
    });
  } catch (error) {
    next(error);
  }
}

// GET /api/v1/submissions/my
async function getMySubmissions(req, res, next) {
  try {
    const submissions = await Submission.find({ user: req.user._id })
      .populate("problem", "title difficulty")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: submissions.length,
      data: submissions,
    });
  } catch (error) {
    next(error);
  }
}

// GET /api/v1/submissions/problem/:problemId
async function getMySubmissionsByProblem(req, res, next) {
  try {
    const { problemId } = req.params;

    const submissions = await Submission.find({
      user: req.user._id,
      problem: problemId,
    })
      .populate("problem", "title difficulty")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: submissions.length,
      data: submissions,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createSubmission,
  getMySubmissions,
  getMySubmissionsByProblem,
};