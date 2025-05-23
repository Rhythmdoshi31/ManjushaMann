const express = require("express");
const adminModel = require("../models/adminModel");
const visitModel = require("../models/visitModel");
const router = express.Router();

router.get("/", async function (req, res) {
    const admin = await adminModel.findOne(); // Get the admin document (or any method to get the video)
    const videoUrl = admin ? admin.videoUrl : '';  // If there's a video, pass it...
    const videoText = admin ? admin.videoText : ""; // If there's a text, pass it...

    const today = new Date().toISOString().split('T')[0];
    if (!req.cookies.token) {
        await visitModel.findOneAndUpdate(
            { date: today },            // find by today's date
            { $inc: { count: 1 } },     // increment `count` by 1
            { upsert: true, new: true } // create if not exists, and return the new doc
        );
    }

    res.render("index", { number: process.env.NUMBER , videoUrl, videoText });
});

module.exports = router;