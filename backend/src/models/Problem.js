const mongoose = require("mongoose");

const exampleSchema = new mongoose.Schema(
  {
    input: { type: String, required: true, trim: true },
    output: { type: String, required: true, trim: true },
    explanation: { type: String, trim: true },
  },
  { _id: false }
);

const testCaseSchema = new mongoose.Schema(
  {
    input: { type: String, required: true, trim: true },
    output: { type: String, required: true, trim: true },
    isHidden: { type: Boolean, default: false },
  },
  { _id: false }
);

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      unique: true,
      minlength: 3,
      maxlength: 120,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    tags: [{ type: String, trim: true }],
    statement: {
      type: String,
      required: [true, "Problem statement is required"],
    },
    constraints: [{ type: String, trim: true }],
    examples: [exampleSchema],
    testCases: [testCaseSchema],
    points: { type: Number, default: 100, min: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Problem", problemSchema);