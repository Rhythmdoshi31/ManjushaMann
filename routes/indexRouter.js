const express = require("express");
const adminModel = require("../models/adminModel");
const router = express.Router();

router.get("/", async function (req, res) {
    const admin = await adminModel.findOne(); // Get the admin document (or any method to get the video)
    const videoUrl = admin ? admin.videoUrl : '';  // If there's a video, pass it...
    const videoText = admin ? admin.videoText : ""; // If there's a text, pass it...
    res.render("index", { number: process.env.NUMBER , videoUrl, videoText });
});

module.exports = router;