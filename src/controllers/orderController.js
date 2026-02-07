const Order = require('../models/Order');
const OrderEvent = require('../models/OrderEvent');
const Product = require('../models/Product');

// @desc    Create new order
// @route   POST /api/v1/orders
// @access  Private
exports.createOrder = async (req, res, next) => {
    try {
        const { items, shippingAddress, totalAmount } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ success: false, message: 'No items in order' });
        }

        // Generate Order Number (Simple version)
        const orderNumber = `NNX-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        const order = await Order.create({
            orderNumber,
            customer: req.user.id,
            items,
            shippingAddress,
            totalAmount
        });

        // Create initial OrderEvent
        await OrderEvent.create({
            order: order._id,
            status: 'Placed',
            comment: 'Order has been placed by customer',
            performedBy: req.user.id
        });

        res.status(201).json({
            success: true,
            data: order
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update order status
// @route   PUT /api/v1/orders/:id/status
// @access  Private (Admin/Super Admin)
exports.updateOrderStatus = async (req, res, next) => {
    try {
        const { status, comment } = req.body;
        const validStatuses = ['Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }

        let order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        order.orderStatus = status;
        await order.save();

        // Log the event
        await OrderEvent.create({
            order: order._id,
            status,
            comment: comment || `Status updated to ${status}`,
            performedBy: req.user.id
        });

        // Trigger notifications here (Future implementation)

        res.status(200).json({
            success: true,
            data: order
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get my orders
// @route   GET /api/v1/orders/myorders
// @access  Private
exports.getMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ customer: req.user.id }).sort('-createdAt');

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get order by ID
// @route   GET /api/v1/orders/:id
// @access  Private
exports.getOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('customer', 'name email phoneNumber')
            .populate('items.product');

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        // Check if user is owner or admin
        if (order.customer._id.toString() !== req.user.id && req.user.role === 'User') {
            return res.status(401).json({ success: false, message: 'Not authorized' });
        }

        // Fetch events for timeline
        const events = await OrderEvent.find({ order: order._id }).sort('createdAt');

        res.status(200).json({
            success: true,
            data: order,
            timeline: events
        });
    } catch (err) {
        next(err);
    }
};
