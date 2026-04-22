const router = require("express").Router();

const auth = require("../middleware/auth");     // ✅ ADD
const admin = require("../middleware/admin");   // ✅ ADD

const { runDraw } = require("../controllers/drawController");

// 🎯 admin only draw
router.post("/run", auth, admin, runDraw);

module.exports = router;