module.exports = (req, res, next) => {
  try {
    // req.user already auth middleware se aa raha hai
    const user = req.user;

    if (!user) {
      return res.status(401).json("User not found");
    }

    // subscription check
    if (user.subscription !== "active") {
      return res.status(403).json("Subscription required");
    }

    next();

  } catch (err) {
    res.status(500).json(err.message);
  }
};