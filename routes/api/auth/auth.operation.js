const util = require("../../../exports/util");
const User = require("../../../models/Users.model");
const PasswordResetToken = require("../../../models/PasswordResetToken.model");
const bcrypt = require('bcryptjs');
const mailer = require("../../../exports/mailer");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.findOne({
      email: email,
      password: hashedPassword
    })

    if (util.notEmpty(user)) {
      // Redirect to dashboard
      return res.statusO(200).send({ token: util.generateResetToken() });
    } else {
      // Render login page with error
      return res.status(400).render('web/user/login', {
        layout: false,
        title: 'Login',
        error: "Invaild User!",
        success: null,
        formData: { email }
      });
    }

  } catch (error) {
    console.error('Login route error:', error);
    return res.status(400).render('web/user/login', {
      layout: false,
      title: 'Login',
      error: 'An error occurred during login. Please try again.',
      success: null,
      formData: req.body
    });
  }
}



// POST /web/user/register - Handle register form submission (fallback for non-JS)
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, terms, newsletter } = req.body;

    const checkIfEmailExist = await User.findOne({ email: email }).catch(error => { throw error; });
    if (util.notEmpty(checkIfEmailExist)) {
      return res.status(400).render('web/user/register', {
        layout: false,
        title: 'Register',
        error: "Email already exists",
        message: "Email already exists",
      });
    }

    if (!terms || !newsletter) {
      return res.status(400).render('web/user/register', {
        layout: false,
        title: 'Register',
        error: "You must agree to our terms and conditions!",
        message: "You must agree to our terms and conditions!",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).render('web/user/register', {
        layout: false,
        title: 'Register',
        error: "Password not match!",
        message: "Password not match!",
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create([
      {
        username: firstName + " " + lastName,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword
      }
    ])

    if (util.notEmpty(user)) {
      // Redirect to login with success message
      return res.status(200).redirect('/auth/login?message=' + encodeURIComponent('Account created successfully! Please check your email to verify your account.'));
    } else {
      // Render register page with error
      return res.status(400).render('web/user/register', {
        layout: false,
        title: 'Register',
        error: "Failed to register as our user. Please try it again later",
        success: null,
        formData: req.body,
        fieldErrors: result.errors || {}
      });
    }

  } catch (error) {
    console.error('Register route error:', error);
    return res.status(400).render('web/user/register', {
      layout: false,
      title: 'Register',
      error: 'An error occurred during registration. Please try again.',
      success: null,
      formData: req.body,
      fieldErrors: {}
    });
  }
};

// GET /auth/logout - Handle logout
const logout = async (req, res) => {
  // Clear authentication cookie/session
  res.clearCookie('authToken');
  if (req.session) {
    req.session.destroy();
  }

  res.redirect('/auth/login?message=' + encodeURIComponent('You have been logged out successfully.'));
};

const resetPassword = async (req, res) => {
  try {
    const { token, email, newPassword, confirmPassword } = req.body;

    // Validate input
    if (!token || !email || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match'
      });
    }

    // Validate password strength
    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long'
      });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        success: false,
        message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const hashedToken = util.hashToken(token);

    // Find and validate token
    const tokenRecord = await PasswordResetToken.findOne({
      email: normalizedEmail,
      hashedToken,
      expiresAt: { $gt: new Date() },
      used: false
    });

    if (!tokenRecord) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }

    // Find user
    const user = await User.findById(tokenRecord.userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found'
      });
    }

    // Hash new password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update user password
    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
      passwordChangedAt: new Date()
    });

    // Mark token as used
    await PasswordResetToken.findByIdAndUpdate(tokenRecord._id, {
      used: true,
      usedAt: new Date()
    });

    // Delete all other reset tokens for this user
    await PasswordResetToken.deleteMany({
      userId: user._id,
      _id: { $ne: tokenRecord._id }
    });

    console.log(`Password reset successful for user: ${normalizedEmail}`);

    res.status(200).json({
      success: true,
      message: 'Password has been reset successfully'
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
};

const verifyResetToken = async (req, res) => {
  try {
    const { token, email } = req.query;

    // Validate input
    if (!token || !email) {
      return res.status(400).json({
        success: false,
        message: 'Token and email are required'
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const hashedToken = util.hashToken(token);

    // Find valid token
    const tokenRecord = await PasswordResetToken.findOne({
      email: normalizedEmail,
      hashedToken,
      expiresAt: { $gt: new Date() },
      used: false
    }).populate('userId', 'email name');

    if (!tokenRecord) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Token is valid',
      data: {
        email: tokenRecord.email,
        userId: tokenRecord.userId._id,
        expiresAt: tokenRecord.expiresAt
      }
    });

  } catch (error) {
    console.error('Verify reset token error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email, resend = false } = req.body;

    // Validate input
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email address is required'
      });
    }

    if (!util.validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check rate limiting
    // const rateLimit = checkRateLimit(normalizedEmail);
    // if (!rateLimit.allowed) {
    //   return res.status(429).json({
    //     success: false,
    //     message: rateLimit.message
    //   });
    // }

    // Find user by email (adjust based on your User model)
    const user = await User.findOne({ email: normalizedEmail });

    // Always return success for security (don't reveal if email exists)
    if (!user) {
      return res.status(200).json({
        success: true,
        message: 'If an account with that email exists, we have sent a password reset link.'
      });
    }

    // Check for existing unexpired token
    const existingToken = await PasswordResetToken.findOne({
      userId: user._id,
      expiresAt: { $gt: new Date() },
      used: false
    });

    // If resending and recent token exists, use it
    if (resend && existingToken && (Date.now() - existingToken.createdAt) < 60000) {
      return res.status(429).json({
        success: false,
        message: 'Please wait 60 seconds before requesting another reset email'
      });
    }

    // Generate new reset token
    const resetToken = util.generateResetToken();
    const hashedToken = util.hashToken(resetToken);

    // Delete any existing tokens for this user
    await PasswordResetToken.deleteMany({ userId: user._id });

    // Create new reset token record
    const tokenRecord = new PasswordResetToken({
      userId: user._id,
      email: normalizedEmail,
      token: resetToken.substring(0, 8), // Store partial token for reference
      hashedToken,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
    });

    await tokenRecord.save();

    // Create reset URL
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/reset-password?token=${resetToken}&email=${encodeURIComponent(normalizedEmail)}`;

    // Send email
    const transporter = mailer.createEmailTransporter();
    const emailTemplate = mailer.getPasswordResetEmailTemplate(resetUrl, normalizedEmail, 15);

    await transporter.sendMail({
      from: `"Your Blog Platform" <${process.env.EMAIL_USER}>`,
      to: normalizedEmail,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      text: emailTemplate.text
    });

    console.log(`Password reset email sent to: ${normalizedEmail}`);

    res.status(200).json({
      success: true,
      message: 'Password reset link has been sent to your email address'
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
};

module.exports = {
  logout,
  login,
  register,
  resetPassword,
  verifyResetToken,
  forgotPassword
}