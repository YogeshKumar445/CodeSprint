const Problem = require("../models/Problem");

async function createProblem(req, res, next) {
  try {
    const problem = await Problem.create(req.body);
    return res.status(201).json({
      success: true,
      message: "Problem created",
      data: problem,
    });
  } catch (error) {
    next(error);
  }
}

async function getProblems(req, res, next) {
  try {
    const problems = await Problem.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: problems.length,
      data: problems,
    });
  } catch (error) {
    next(error);
  }
}

async function getProblemById(req, res, next) {
  try {
    const problem = await Problem.findById(req.params.id);
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

module.exports = { createProblem, getProblems, getProblemById };