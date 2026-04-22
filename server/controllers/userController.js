const User = require("../models/User");

// get user
exports.getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

// add score
exports.addScore = async (req, res) => {
  try {
    const { value, date } = req.body;

    const user = await require("../models/User").findById(req.user.id);

    // ❗ duplicate date check
    const exists = user.scores.find(
      (s) =>
        new Date(s.date).toDateString() === new Date(date).toDateString()
    );

    if (exists) {
      return res.status(400).json("Score for this date already exists");
    }

    // max 5 scores
    if (user.scores.length >= 5) {
      user.scores.shift();
    }

    user.scores.push({ value, date });

    await user.save();

    res.json(user.scores);

  } catch (err) {
    res.status(500).json(err.message);
  }
};


exports.activateSubscription = async (req, res) => {
  try {
    const user = await require("../models/User").findById(req.user.id);

    user.subscription = "active";
    user.subscriptionEnd = new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000
    );

    await user.save();

    res.json(user);

  } catch (err) {
    res.status(500).json(err.message);
  }
};