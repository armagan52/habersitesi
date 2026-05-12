const express = require("express");
const router = express.Router();
const News = require("../models/News");
const authMiddleware = require("../middleware/authMiddleware");


// 🔒 DASHBOARD – TÜM HABERLER
router.get("/", authMiddleware, async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch {
    res.status(500).json({ message: "Haberler alınamadı" });
  }
});


// 🔒 DASHBOARD – TEK HABER (EDIT İÇİN) 🔥🔥🔥
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: "Haber bulunamadı" });
    }
    res.json(news);
  } catch {
    res.status(500).json({ message: "Haber alınamadı" });
  }
});


// 🔒 DASHBOARD – HABER EKLE 🔥🔥🔥
router.post("/", authMiddleware, async (req, res) => {
  try {
    const news = new News(req.body);
    await news.save();
    res.json({ message: "Haber eklendi" });
  } catch {
    res.status(500).json({ message: "Haber eklenemedi" });
  }
});


// 🔒 DASHBOARD – HABER GÜNCELLE 🔥🔥🔥
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    await News.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Haber güncellendi" });
  } catch {
    res.status(500).json({ message: "Güncelleme hatası" });
  }
});


// 🔒 DASHBOARD – HABER SİL
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ message: "Haber silindi" });
  } catch {
    res.status(500).json({ message: "Silme hatası" });
  }
});


// 🔓 PUBLIC – TÜM HABERLER
router.get("/public/all", async (req, res) => {
  try {
    const news = await News.find({ status: "published" })
      .sort({ createdAt: -1 });
    res.json(news);
  } catch {
    res.status(500).json({ message: "Haberler alınamadı" });
  }
});


// 🔓 PUBLIC – KATEGORİ
router.get("/public/category/:category", async (req, res) => {
  try {
    const news = await News.find({
      status: "published",
      category: req.params.category,
    }).sort({ createdAt: -1 });

    res.json(news);
  } catch {
    res.status(500).json({ message: "Kategori haberleri alınamadı" });
  }
});


// 🔓 PUBLIC – DETAY
router.get("/public/:id", async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    res.json(news);
  } catch {
    res.status(404).json({ message: "Haber bulunamadı" });
  }
});

module.exports = router;
