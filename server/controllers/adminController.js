const User = require("../models/User");
const Draw = require("../models/Draw");

// 👥 Get all users
exports.getUsers = async (req, res) => {
  const users = await User.find()
    .select("-password")
    .populate("charity");

  res.json(users);
};

// 🎯 Get all draws
exports.getDraws = async (req, res) => {
  const draws = await Draw.find();
  res.json(draws);
};