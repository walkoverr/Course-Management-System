const Course = require("../models/Course");
const User = require("../models/User");

// Create Course
exports.createCourse = async (req, res) => {
  try {
    const { title, description, price, image } = req.body;
    const creatorId = req.user._id;

    // Validate user exists
    const user = await User.findById(creatorId);
    if (!user) return res.status(400).json({ message: "Invalid creatorId" });

    const course = new Course({
      title,
      description,
      price,
      image,
      creatorId,
    });

    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("creatorId", "name email location");
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get course by ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("creatorId", "name email location");
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update course
exports.updateCourse = async (req, res) => {
  try {
    const creatorId = req.user._id;
    const courseId = req.params.id;
    const course = await Course.findById(courseId);

    if (!course) return res.status(404).json({ message: "Course not found" });

    // Only creator can update
    if (course.creatorId.toString() !== creatorId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { title, description, price, image } = req.body;

    if (title) course.title = title;
    if (description) course.description = description;
    if (price !== undefined) course.price = price;
    if (image) course.image = image;

    await course.save();
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete course
exports.deleteCourse = async (req, res) => {
  try {
    const creatorId = req.user._id;
    const courseId = req.params.id;
    const course = await Course.findById(courseId);

    if (!course) return res.status(404).json({ message: "Course not found" });

    // Only creator can delete
    if (course.creatorId.toString() !== creatorId) {
      return res.status(403).json({ message: "Not authorized" });
    }

     await Course.findByIdAndDelete(req.params.id);
     res.status(200).json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
