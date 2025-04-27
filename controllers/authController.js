const adminModel = require('../models/adminModel');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');

module.exports.registerUser = async function(req, res) {

    const { name, password } = req.body;  // input data nikale.

    try {
        let user = await adminModel.findOne({name});  // check pehle se to ni hai.
        if (user) {                            // If already registered then return.
            return res.status(400).send('User already exists');
        }

        let salt = await bcrypt.genSalt(10);  // SALT AND HASHING FOR ENCRYPTION.
        let hashedPassword = await bcrypt.hash(password, salt);

        user = await adminModel.create({     // Create new User with hashed password.
            name,
            password: hashedPassword,
        });

        res.status(201).send(user);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

module.exports.loginUser = async function(req, res) {

    const { name, password } = req.body;  // input data nikalo.
    
    try {
        let user = await adminModel.findOne({ name });  // check if user exists or not.

        if (!user) {   // if user doesn't exist, return.
            return res.status(500).send("Email or Password Incorrect");
        }
        let isMatching = await bcrypt.compare(password, user.password);   // check is password matches.
        if (isMatching) {  // if password matched.
            let token = generateToken({ name });   // Generate token to log in from here.
            res.cookie("token", token, {     // Cookie banake save krdiye token.
                maxAge: 24 * 60 * 60 * 30 * 1000,  // 30 Day validity.
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
            });
            res.redirect("/admin/dashboard");
        }
        else {  // if password not matched.
            return res.status(500).send("Email or Password Incorrect");
        }
    } catch (error) {
        res.status(500).send('Server Error');
    }

};
module.exports.logoutUser = function(req, res) {
    res.clearCookie("token");
    res.send("logged out successfully.");
};