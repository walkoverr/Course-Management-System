const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseId: { type: String, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true, min: 0 },
  image: { type: String },
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Course", courseSchema);
