const mongoose = require("mongoose");

const winnerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  drawId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Draw"
  },

  matchCount: Number,
  prize: Number,

  proof: String, // screenshot / URL

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending"
  }
});

module.exports = mongoose.model("Winner", winnerSchema);