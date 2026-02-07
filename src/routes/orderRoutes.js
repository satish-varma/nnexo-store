const express = require('express');
const {
    createOrder,
    updateOrderStatus,
    getMyOrders,
    getOrder
} = require('../controllers/orderController');

const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect); // All order routes are protected

router.route('/')
    .post(createOrder)
    .get(authorize('Admin', 'Super Admin'), async (req, res, next) => {
        // Shared generic get all for admins
        try {
            const orders = await require('../models/Order').find().sort('-createdAt');
            res.json({ success: true, count: orders.length, data: orders });
        } catch (err) { next(err); }
    });

router.get('/myorders', getMyOrders);

router.route('/:id')
    .get(getOrder);

router.put('/:id/status', authorize('Admin', 'Super Admin'), updateOrderStatus);

module.exports = router;
