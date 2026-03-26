const Submission = require("../models/Submission");

async function getLeaderboard(req, res, next) {
  try {
    const top = Number(req.query.top) || 20;

    const leaderboard = await Submission.aggregate([
      // Only accepted submissions count for ranking
      { $match: { verdict: "Accepted" } },

      // group by user + problem to avoid counting same problem many times unfairly
      {
        $group: {
          _id: { user: "$user", problem: "$problem" },
          bestScore: { $max: "$score" },
          latestSubmissionAt: { $max: "$createdAt" },
        },
      },

      // now group by user
      {
        $group: {
          _id: "$_id.user",
          totalScore: { $sum: "$bestScore" },
          problemsSolved: { $sum: 1 },
          lastAcceptedAt: { $max: "$latestSubmissionAt" },
        },
      },

      // join user info
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },

      // output shape
      {
        $project: {
          _id: 0,
          userId: "$user._id",
          name: "$user.name",
          email: "$user.email",
          totalScore: 1,
          problemsSolved: 1,
          lastAcceptedAt: 1,
        },
      },

      // ranking sort
      { $sort: { totalScore: -1, problemsSolved: -1, lastAcceptedAt: 1 } },

      // top N
      { $limit: top },
    ]);

    // add rank number
    const ranked = leaderboard.map((item, index) => ({
      rank: index + 1,
      ...item,
    }));

    return res.status(200).json({
      success: true,
      count: ranked.length,
      data: ranked,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { getLeaderboard };