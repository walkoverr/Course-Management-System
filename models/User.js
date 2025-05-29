const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: { type: String, unique: true },
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, required: true },
  location: { type: String },
  profileImage: { type: String },
  password: { type: String, required: true }, // for authentication
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
