const router = require("express").Router();

const auth = require("../middleware/auth");
const checkSubscription = require("../middleware/checkSubscription");

// 👇 controller import
const userController = require("../controllers/userController");

// routes
router.get("/me", auth, userController.getMe);

// score add (subscription required)
router.post("/score", auth, checkSubscription, userController.addScore);

// activate subscription
router.post("/subscribe", auth, userController.activateSubscription);

module.exports = router;