const express = require("express");
const router = express.Router();
const News = require("../models/News");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const totalNews = await News.countDocuments();
    const publishedNews = await News.countDocuments({ status: "published" });
    const draftNews = await News.countDocuments({ status: "draft" });

    let totalUsers = null;
    if (req.user.role === "admin") {
      totalUsers = await User.countDocuments();
    }

    res.json({
      totalNews,
      publishedNews,
      draftNews,
      totalUsers,
    });
  } catch (err) {
    res.status(500).json({ message: "İstatistikler alınamadı" });
  }
});

module.exports = router;
