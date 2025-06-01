const express = require("express");
const app = express();

const userOperations = require("./user.operation");

const router = express.Router();

// Middleware to redirect authenticated users
function redirectIfAuthenticated(req, res, next) {
    // Check if user is already authenticated
    // This is a simple example - implement according to your auth system
    // const token = req.cookies.authToken || req.session.token;
    
    // if (!token) {
    //     // Verify token and redirect if valid
    //     // You can use your JWT verification logic here
    //     return res.redirect('/');
    // }
    
    next();
}


router.get("/auth/login", userOperations.loginPage);
router.get("/auth/register", userOperations.registerPage);
router.get("/auth/forgot-password", userOperations.forgotPassword);

// GET /auth/reset-password/:token - Render password reset page
router.get('/auth/reset-password', redirectIfAuthenticated, (req, res) => {
    const { error, email, token } = req.query;
    
    // In a real app, you'd verify the token here
    res.render('web/user/reset-password', {
        layout: false,
        title: 'Reset Password',
        token,
        email: email,
        error: error || null,
        success: null
    });
});

router.use("/", redirectIfAuthenticated, require("./blogs/blogs.route"));

module.exports = router