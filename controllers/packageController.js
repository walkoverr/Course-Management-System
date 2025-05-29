const Package = require("../models/Package");
const Course = require("../models/Course");

// Create package - group courses under one package
exports.createPackage = async (req, res) => {
  try {
    const { title, courses } = req.body;
    const creatorId = req.user._id;

    // Validate all course IDs belong to the creator
    const userCourses = await Course.find({ _id: { $in: courses }, creatorId });
    if (userCourses.length !== courses.length) {
      return res.status(400).json({ message: "Some courses are invalid or do not belong to you" });
    }

    const newPackage = new Package({
      packageId: new Date().getTime().toString(), // simple unique string
      title,
      courses,
      creatorId,
    });

    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete package by ID
exports.deletePackage = async (req, res) => {
  try {
    const creatorId = req.user._id;
    const packageId = req.params.id;

    const existingPackage = await Package.findById(packageId);
    if (!existingPackage) return res.status(404).json({ message: "Package not found" });

    if (existingPackage.creatorId.toString() !== creatorId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Package.findByIdAndDelete(req.param.id)
    res.json({ message: "Package deleted" });
  } catch (error) {
  res.status(500).json({ message: "Server Error", error: error.message });
}
};
