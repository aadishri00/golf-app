const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

  subscription: {
    type: String,
    enum: ["monthly", "yearly", "none"],
    default: "none"
  },

  charity: String,

  scores: [
    {
      value: Number,
      date: Date
    }
  ],

  winnings: {
    type: Number,
    default: 0
  },

  role: {
    type: String,
    default: "user"
  },
  charity: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Charity"
},

charityPercent: {
  type: Number,
  default: 10
},
subscription: {
  type: String,
  enum: ["active", "inactive"],
  default: "inactive"
},

subscriptionEnd: Date
});



module.exports = mongoose.model("User", userSchema);