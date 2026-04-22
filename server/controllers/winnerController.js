const Winner = require("../models/Winner");
const User = require("../models/User");

// 📋 get all winners
exports.getWinners = async (req, res) => {
  const winners = await Winner.find()
    .populate({
      path: "userId",
      select: "-password"
    })
    .populate("drawId");

  res.json(winners);
};

// 📤 upload proof
exports.uploadProof = async (req, res) => {
  const { proof } = req.body;

  const winner = await Winner.findById(req.params.id);

  winner.proof = proof;

  await winner.save();

  res.json(winner);
};

// ✅ approve / reject
exports.verifyWinner = async (req, res) => {
  const { status } = req.body;

  const winner = await Winner.findById(req.params.id);

  winner.status = status;

  await winner.save();

  res.json(winner);
};

// 💰 mark paid + update user winnings
exports.markPaid = async (req, res) => {
  const winner = await Winner.findById(req.params.id);

  if (!winner) {
    return res.status(404).json("Winner not found");
  }

  // already paid check
  if (winner.paymentStatus === "paid") {
    return res.status(400).json("Already paid");
  }

  winner.paymentStatus = "paid";
  await winner.save();

  // 💰 add winnings to user
  const user = await User.findById(winner.userId);
  user.winnings += winner.prize;
  await user.save();

  res.json(winner);
};