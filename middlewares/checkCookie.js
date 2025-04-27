module.exports.checkCookie = async function(req, res, next) {
    if (req.cookies.token) {
        return res.redirect("/admin/dashboard");
    }
    next();
}