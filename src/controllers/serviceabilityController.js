const PincodeServiceability = require('../models/PincodeServiceability');

// @desc    Check pincode serviceability
// @route   GET /api/v1/serviceability/:pincode
// @access  Public
exports.checkServiceability = async (req, res, next) => {
    try {
        const { pincode } = req.params;

        const record = await PincodeServiceability.findOne({ pincode });

        if (!record) {
            return res.status(200).json({
                success: false,
                message: 'Pincode not serviceable for now',
                data: { isServicable: false }
            });
        }

        res.status(200).json({
            success: true,
            data: record
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Add servicable pincodes (Admin only)
// @route   POST /api/v1/serviceability
// @access  Private (Admin)
exports.addPincode = async (req, res, next) => {
    try {
        const record = await PincodeServiceability.create(req.body);

        res.status(201).json({
            success: true,
            data: record
        });
    } catch (err) {
        next(err);
    }
};
