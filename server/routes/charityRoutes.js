const router = require("express").Router();
const auth = require("../middleware/auth");

const {
  addCharity,
  getCharities,
  selectCharity
} = require("../controllers/charityController");

// public
router.get("/", getCharities);

// protected
router.post("/select", auth, selectCharity);

// admin (simple for now)
router.post("/add", addCharity);

module.exports = router;