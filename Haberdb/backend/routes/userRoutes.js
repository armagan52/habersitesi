const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Yetkisiz" });
  }
  const users = await User.find();
  res.json(users);
});

router.post("/", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Yetkisiz" });
  }
  await new User(req.body).save();
  res.json({ message: "Kullanıcı eklendi" });
});

router.put("/:id", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Yetkisiz" });
  }
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Güncellendi" });
});

router.delete("/:id", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Yetkisiz" });
  }
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Silindi" });
});
// TEK KULLANICI GETİR (EDIT İÇİN)
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(404).json({ message: "Kullanıcı bulunamadı" });
  }
});


module.exports = router;
