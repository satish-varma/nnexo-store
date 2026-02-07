const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Otp = require('../models/Otp');

// @desc    Register a user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = async (req, res, next) => {
    try {
        const { name, email, phoneNumber, password } = req.body;

        // Create user (password hashing handled in model middleware)
        const user = await User.create({
            name,
            email,
            phoneNumber,
            password,
            role: 'User'
        });

        sendTokenResponse(user, 201, res);
    } catch (err) {
        next(err);
    }
};

// @desc    Login user via OTP request
// @route   POST /api/v1/auth/otp/request
// @access  Public
exports.requestOtp = async (req, res, next) => {
    try {
        const { phoneNumber } = req.body;

        if (!phoneNumber) {
            return res.status(400).json({ success: false, message: 'Please provide a phone number' });
        }

        // Generate 6 digit OTP (Mock for now)
        const otpValue = '000000';

        // Upsert OTP
        await Otp.findOneAndUpdate(
            { phoneNumber, purpose: 'login' },
            { otp: otpValue },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        // In a real app, send OTP via SMS service here
        console.log(`[MONGODB] OTP for ${phoneNumber}: ${otpValue}`);

        res.status(200).json({
            success: true,
            message: 'OTP sent successfully (Check server console)'
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Verify OTP and Login
// @route   POST /api/v1/auth/otp/verify
// @access  Public
exports.verifyOtp = async (req, res, next) => {
    try {
        const { phoneNumber, otp } = req.body;

        if (!phoneNumber || !otp) {
            return res.status(400).json({ success: false, message: 'Please provide phone number and OTP' });
        }

        const otpRecord = await Otp.findOne({ phoneNumber, otp, purpose: 'login' });

        if (!otpRecord) {
            return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
        }

        let user = await User.findOne({ phoneNumber });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found. Please register first.' });
        }

        // Delete OTP
        await Otp.deleteOne({ phoneNumber, otp });

        sendTokenResponse(user, 200, res);
    } catch (err) {
        next(err);
    }
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });

    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRE
    });

    res.status(statusCode).json({
        success: true,
        accessToken,
        refreshToken,
        user: {
            id: user._id,
            name: user.name,
            role: user.role,
            phoneNumber: user.phoneNumber
        }
    });
};
