const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: String,
    summary: String,
    content: String,
    category: String,
    image: String,
    status: {
      type: String,
      default: "published",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("News", newsSchema);
