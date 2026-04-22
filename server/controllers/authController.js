const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 🔴 validation
    if (!name || !email || !password) {
      return res.status(400).json("All fields required");
    }

    // 🔴 check existing user
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json("User already exists");
    }

    // 🔐 hash password
    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash
    });

    res.json(user);

  } catch (err) {
    console.log(err); // 👈 important for debugging
    res.status(500).json(err.message);
  }
};


// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json("All fields required");
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json("Wrong password");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ token });

  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};