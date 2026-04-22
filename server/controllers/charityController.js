const Charity = require("../models/Charity");
const User = require("../models/User");

// ➕ Add charity (admin)
exports.addCharity = async (req, res) => {
  try {
    const { name, description, image } = req.body;

    const charity = await Charity.create({
      name,
      description,
      image
    });

    res.json(charity);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// 📋 Get all charities
exports.getCharities = async (req, res) => {
  try {
    const charities = await Charity.find();
    res.json(charities);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// ❤️ Select charity
exports.selectCharity = async (req, res) => {
  try {
    const { charityId, percent } = req.body;

    // validation
    if (!charityId || !percent) {
      return res.status(400).json("charityId and percent required");
    }

    if (percent < 10) {
      return res.status(400).json("Minimum 10% donation required");
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json("User not found");
    }

    user.charity = charityId;
    user.charityPercent = percent;

    await user.save();

    // 🔐 password hide
    const updatedUser = await User.findById(user._id)
      .select("-password")
      .populate("charity"); // optional (details dikhenge)

    res.json(updatedUser);

  } catch (err) {
    res.status(500).json(err.message);
  }
};