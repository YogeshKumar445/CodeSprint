const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
      index: true,
    },
    language: {
      type: String,
      enum: ["javascript", "cpp", "java", "python"],
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    verdict: {
      type: String,
      enum: ["Accepted", "Wrong Answer", "Runtime Error"],
      default: "Wrong Answer",
    },
    score: {
      type: Number,
      default: 0,
      min: 0,
    },
    executionTimeMs: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Submission", submissionSchema);