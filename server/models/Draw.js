const mongoose = require("mongoose");

const drawSchema = new mongoose.Schema({
  numbers: [Number],

  winners: [
    {
      userId: String,
      matchCount: Number,
      prize: Number
    }
  ],

  date: {
    type: Date,
    default: Date.now
  },

  published: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Draw", drawSchema);