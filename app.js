const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const connectDb = require("./config/mongoose-connection");
const cookieParser = require('cookie-parser');

const indexRouter = require("./routes/indexRouter");
const adminRouter = require("./routes/adminRouter");

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
app.set('trust proxy', 1);
app.use(helmet());
app.use(limiter);
app.use(cookieParser());
connectDb();

app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],  // Default source for all content
        scriptSrc: ["'self'", "'unsafe-inline'"],  // Allow inline scripts
        styleSrc: ["'self'", "https://fonts.googleapis.com", "https://cdn.jsdelivr.net", "'unsafe-inline'"],  // Allow styles from self, Google Fonts, and jsDelivr
        fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdn.jsdelivr.net"],  // Allow fonts from self, Google Fonts, and jsDelivr
        imgSrc: ["'self'", "https://res.cloudinary.com"],  // Allow images from self and Cloudinary
        mediaSrc: ["'self'", "https://res.cloudinary.com"],  // Allow media from Cloudinary
      },
    })
  );

app.use((req, res, next) => {
    const host = req.headers.host?.split(':')[0];
    if (host === 'manjushamann.com') {
        return res.redirect(301, 'https://www.manjushamann.com' + req.url);
    }
    next();
});  

app.use("/", indexRouter);
app.use("/admin", adminRouter);


app.use((req, res) => {
    res.status(404).send("This page is not available!");
});


app.listen(3000, () => {
    console.log("server started!")
});