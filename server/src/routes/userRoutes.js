const express = require("express");
const { uploadUserImage } = require("../middleware/upload");
const User = require("../models/User");
const router = express.Router();

router.put(
  "/upload-profile",
  uploadUserImage.single("image"),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);

      user.profileImage = req.file.path;
      await user.save();

      res.json({
        success: true,
        image: req.file.path,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
