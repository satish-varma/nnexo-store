const mongoose = require('mongoose');

const PincodeServiceabilitySchema = new mongoose.Schema({
    pincode: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    city: String,
    state: String,
    isServicable: {
        type: Boolean,
        default: true
    },
    cashOnDelivery: {
        type: Boolean,
        default: true
    },
    estimatedDeliveryDays: {
        type: Number,
        default: 5
    },
    couriers: [String] // e.g., ['Delhivery', 'Shiprocket']
}, { timestamps: true });

module.exports = mongoose.model('PincodeServiceability', PincodeServiceabilitySchema);
