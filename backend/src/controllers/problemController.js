const Problem = require("../models/Problem");
const slugify = require("../utils/slugify");

// POST /api/v1/problems
async function createProblem(req, res, next) {
  try {
    const {
      title,
      difficulty,
      tags = [],
      statement,
      constraints = [],
      examples = [],
      testCases = [],
      points = 100,
    } = req.body;

    if (!title || !difficulty || !statement) {
      return res.status(400).json({
        success: false,
        message: "title, difficulty and statement are required",
      });
    }

    let slug = slugify(title);
    const existing = await Problem.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const problem = await Problem.create({
      title,
      slug,
      difficulty,
      tags,
      statement,
      constraints,
      examples,
      testCases,
      points,
    });

    return res.status(201).json({
      success: true,
      message: "Problem created successfully",
      data: problem,
    });
  } catch (error) {
    next(error);
  }
}

// GET /api/v1/problems
async function getProblems(req, res, next) {
  try {
    const problems = await Problem.find({})
      .select("title slug difficulty tags points createdAt")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: problems.length,
      data: problems,
    });
  } catch (error) {
    next(error);
  }
}

// GET /api/v1/problems/:id
async function getProblemById(req, res, next) {
  try {
    const { id } = req.params;

    const problem = await Problem.findById(id);
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: problem,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createProblem,
  getProblems,
  getProblemById,
};