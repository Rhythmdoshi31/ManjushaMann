const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
    console.log("rendered");
    res.render("index", { number: process.env.NUMBER });
});

module.exports = router;