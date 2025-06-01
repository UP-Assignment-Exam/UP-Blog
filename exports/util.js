const mongoose = require("mongoose")
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

//不为空?
function notEmpty(data) {
    return !isEmpty(data)
}

/**
 * 判断一个变是否为空(默认值也算为空)
 * @param {*} data  string,object,array
 * @returns
 */
//
function isEmpty(data) {
    if (data === null || data === undefined || data === "") {
        return true
    }
    if (typeof data == "boolean") {
        return false
    }

    if (typeof data == "string" || typeof data === undefined || typeof data === "undefined") {
        return data === null || data === undefined || data === "" || data === "undefined"
    }

    if (typeof data == "number" && parseFloat(data) === 0) {
        return true
    }

    if (typeof data == "number" && isNaN(data)) {
        return true
    }

    if (data instanceof mongoose.Types.ObjectId) {
        return false
    }

    if (data instanceof Array) {
        return data.length === 0
    }
    if (data instanceof Date) {
        return false
    }

    if (typeof data == "object") {
        return Object.keys(data).length === 0
    }

    return false
}


// Generate secure random token
const generateResetToken = () => {
    return crypto.randomBytes(32).toString('hex');
};

// Hash token for storage
const hashToken = (token) => {
    return crypto.createHash('sha256').update(token).digest('hex');
};

// Validate email format
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
};

// // Rate limiting store (use Redis in production)
// const rateLimitStore = new Map();

// // Check rate limit
// const checkRateLimit = (email, maxAttempts = 3, windowMinutes = 15) => {
//     const key = `reset_${email}`;
//     const now = Date.now();
//     const windowMs = windowMinutes * 60 * 1000;

//     const attempts = rateLimitStore.get(key) || [];
//     const recentAttempts = attempts.filter(time => now - time < windowMs);

//     if (recentAttempts.length >= maxAttempts) {
//         const oldestAttempt = Math.min(...recentAttempts);
//         const resetTime = new Date(oldestAttempt + windowMs);
//         return {
//             allowed: false,
//             resetTime,
//             message: `Too many password reset attempts. Please try again after ${resetTime.toLocaleTimeString()}`
//         };
//     }

//     recentAttempts.push(now);
//     rateLimitStore.set(key, recentAttempts);

//     return { allowed: true };
// };


module.exports = {
    notEmpty,
    isEmpty,
    // checkRateLimit,
    validateEmail,
    hashToken,
    generateResetToken
}
