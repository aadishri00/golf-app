const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());



app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/draw", require("./routes/drawRoutes"));
app.use("/api/charity", require("./routes/charityRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/winner", require("./routes/winnerRoutes"));




// Test route
app.get("/", (req, res) => {
  res.send("API Running...");
});

// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Database Connected"))
  .catch(err => console.log(err));

// Server start
app.listen(5000, () => {
  console.log("Server running on port 5000");
});