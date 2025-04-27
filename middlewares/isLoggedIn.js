const jwt = require('jsonwebtoken');
const adminModel = require('../models/adminModel');

module.exports.isLoggedIn = async function (req, res, next) {
    if (req.cookies.token) {  // if token exists.
        try {
            const data = jwt.verify(req.cookies.token, process.env.JWT_SECRET); // get token's data
            const user = await adminModel.findOne({ name: data.name }).select("-password"); // Get user without password

            if (!user) {
                return res.status(404).send("User not found");
            }
            console.log(user);
            req.user = user;  // Attach the user to the request object
            next();  // Proceed to the next middleware or route handler
        } catch (error) {
            console.error(error);
            res.status(401).send("Not authorized.");  // Handle invalid token error
        }
    } else {
        res.status(401).send("Not authorized, token is missing.");  // If no token
    }
};
