const Draw = require("../models/Draw");
const User = require("../models/User");
const Winner = require("../models/Winner");

// 🎯 generate random numbers
const generateNumbers = () => {
  let nums = [];

  while (nums.length < 5) {
    let n = Math.floor(Math.random() * 45) + 1;
    if (!nums.includes(n)) nums.push(n);
  }

  return nums;
};

// 🎯 Run Draw
exports.runDraw = async (req, res) => {
  try {
    const numbers = [7, 27, 9, 10, 5];

    console.log("Draw Numbers:", numbers);

    const users = await User.find();

    let winners = [];

    users.forEach((user) => {
      let matchCount = 0;

      const userScores = user.scores.map(s => s.value);
      console.log("User Scores:", userScores);

      userScores.forEach((score) => {
        if (numbers.includes(score)) {
          matchCount++;
        }
      });

      console.log("Match Count:", matchCount);

      if (matchCount >= 3) {
        winners.push({
          userId: user._id,
          matchCount
        });
      }
    });

   

    

    // 💰 Prize Logic
    const totalPool = 1000;

    const prizeMap = {
      5: 0.4,
      4: 0.35,
      3: 0.25
    };

    let grouped = {
      5: [],
      4: [],
      3: []
    };

    winners.forEach((w) => {
      grouped[w.matchCount].push(w);
    });

    Object.keys(grouped).forEach((key) => {
      const group = grouped[key];

      if (group.length > 0) {
        const totalPrize = totalPool * prizeMap[key];
        const perUser = totalPrize / group.length;

        group.forEach((w) => {
          w.prize = perUser;
        });
      }
    });

    const draw = await Draw.create({
      numbers,
      winners
    });

     for (let w of winners) {
  await Winner.create({
    userId: w.userId,
    drawId: draw._id,
    matchCount: w.matchCount,
    prize: w.prize
  });
}

    res.json(draw);

  } catch (err) {
    res.status(500).json(err.message);
  }
};