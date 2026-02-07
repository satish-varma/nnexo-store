const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a product name'],
        trim: true,
        maxlength: [100, 'Name can not be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [1000, 'Description can not be more than 1000 characters']
    },
    basePrice: {
        type: Number,
        required: [true, 'Please add a base price']
    },
    salePrice: {
        type: Number,
        required: [true, 'Please add a sale price']
    },
    category: {
        type: String,
        required: [true, 'Please select a category'],
        enum: [
            'rackets',
            'apparel',
            'shoes',
            'accessories',
            'bags',
            'shuttles'
        ]
    },
    stock: {
        type: Number,
        default: 0
    },
    images: {
        type: [String],
        default: [] // Array of image URLs
    },
    specifications: {
        type: Object, // Flexible JSON for different product types
        default: {}
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', ProductSchema);
