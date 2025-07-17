const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const courseRoutes = require("./routes/courseRoutes");
const userRoutes = require("./routes/userRoutes");
const packageRoutes = require("./routes/packageRoutes");

dotenv.config();
const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/packages", packageRoutes);

app.use("/uploads", express.static("uploads"));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log("Server running on port", process.env.PORT);
    });
  })
  .catch(err => console.log("MongoDB connection error:", err));
