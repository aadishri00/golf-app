const router = require("express").Router();
const auth = require("../middleware/auth");

const {
  getUsers,
  getDraws
} = require("../controllers/adminController");

// simple admin protection (later improve karenge)
router.get("/users", auth, getUsers);
router.get("/draws", auth, getDraws);

module.exports = router;