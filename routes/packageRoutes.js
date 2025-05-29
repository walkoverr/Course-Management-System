const express = require("express");
const router = express.Router();
const packageController = require("../controllers/packageController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/create", authMiddleware, packageController.createPackage);
router.delete("/:id", authMiddleware, packageController.deletePackage);

module.exports = router;
