const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json("No token");
    }

    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 FULL USER FETCH
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json("User not found");
    }

    req.user = user;

    next();

  } catch (err) {
    res.status(401).json("Invalid token");
  }
};