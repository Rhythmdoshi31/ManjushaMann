const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// General rate limiter for all requests
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 50,                  // limit each IP to 50 requests per 10 mins
    standardHeaders: true,    // Return rate limit info in headers
    legacyHeaders: false,     // Disable the `X-RateLimit-*` headers
    message: {
      status: 429,
      error: "Too many requests. Please try again later."
    },
});

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use('/robots.txt', express.static('public/robots.txt'));
app.use('/sitemap.xml', express.static('public/sitemap.xml'));
app.use(helmet());
app.use(limiter);

app.get("/", function (req, res) {
    res.render("index", { number: process.env.NUMBER });
})

app.listen(3000, () => {
    console.log("server started!")
});