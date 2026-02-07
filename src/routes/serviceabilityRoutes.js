const express = require('express');
const { checkServiceability, addPincode } = require('../controllers/serviceabilityController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:pincode', checkServiceability);
router.post('/', protect, authorize('Admin', 'Super Admin'), addPincode);

module.exports = router;
