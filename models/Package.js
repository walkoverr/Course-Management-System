const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  packageId: { type: String, unique: true },
  title: { type: String, required: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Package", packageSchema);
