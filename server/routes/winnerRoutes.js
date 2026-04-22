const router = require("express").Router();

const auth = require("../middleware/auth");     // ✅ ADD
const admin = require("../middleware/admin");   // ✅ ADD

const {
  getWinners,
  uploadProof,
  verifyWinner,
  markPaid
} = require("../controllers/winnerController");

// get all winners
router.get("/", auth, getWinners);

// upload proof
router.post("/proof/:id", auth, uploadProof);

// verify (admin only)
router.post("/verify/:id", auth, admin, verifyWinner);

// mark paid (admin only)
router.post("/pay/:id", auth, admin, markPaid);

module.exports = router;