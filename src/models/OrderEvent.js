const mongoose = require('mongoose');

const OrderEventSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    status: {
        type: String,
        required: true
    },
    comment: String,
    metadata: mongoose.Schema.Types.Mixed,
    performedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: String,
        enum: ['StatusChange', 'Payment', 'Shipping', 'CustomerSupport'],
        default: 'StatusChange'
    }
}, { timestamps: true });

module.exports = mongoose.model('OrderEvent', OrderEventSchema);
