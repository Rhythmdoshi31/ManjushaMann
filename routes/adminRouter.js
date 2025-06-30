const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const upload = require('../utils/multer');
const adminModel = require("../models/adminModel");
const { checkCookie } = require("../middlewares/checkCookie");
const visitModel = require("../models/visitModel");

router.get("/register", (req, res) => {
    res.send("This page is Restricted !");
});

// In your route file (e.g., authRoutes.js)
router.get('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' // or match whatever you used in res.cookie
  });

  res.redirect('/'); // or any other page
});



router.get("/login", checkCookie, function (req, res) {
    res.render("admin_login");
});

router.post("/login", loginUser);

router.get("/dashboard", isLoggedIn, async (req, res) => {
  const today = new Date().toISOString().split('T')[0];

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const formatted = yesterday.toISOString().split('T')[0];

  let todaysVisits = await visitModel.findOne({ date: today});
  let yesterdaysVisits = await visitModel.findOne({ date: formatted});
  res.render("admin_dashboard", { todaysVisits, yesterdaysVisits }); 
});

router.post('/upload', isLoggedIn, upload.single('video'), async (req, res) => {
    try {
      const video = req.file.path; // Cloudinary returns the URL in .path
      console.log(video);    
      const admin = await adminModel.findById(req.user._id);
      
      // If old video exists, delete from Cloudinary
      if (admin.videoPublicId) {
        const cloudinary = require('../utils/cloudinary');
        await cloudinary.uploader.destroy(admin.videoPublicId, { resource_type: 'video' });
      }
      // Save new video
      admin.videoUrl = video;
      admin.videoPublicId = req.file.filename; // Needed for deleting next time
      admin.videoText = req.body.text;
      
      await admin.save();
  
      res.status(200).send('Video uploaded successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
});

module.exports = router;