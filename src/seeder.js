const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const colors = require('colors');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

// Load models
const Product = require('./models/Product');
const User = require('./models/User');

// Connect to DB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nnexo');
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
    } catch (err) {
        console.error(`Error: ${err.message}`.red);
        process.exit(1);
    }
};

// Import into DB
const importData = async () => {
    try {
        await connectDB();

        console.log('Seeding Data...'.green.inverse);

        // Clear existing
        await Product.deleteMany();
        await User.deleteMany();

        // Admin User
        await User.create({
            name: "Satish Varma",
            email: "satish@nnexo.com",
            phoneNumber: "9876543210",
            password: "password123", // Will be hashed by pre-save middleware
            role: "Admin"
        });

        console.log('Admin User Created (9876543210).'.green);
        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

// Delete data
const deleteData = async () => {
    try {
        await connectDB();

        console.log('Clearing Data...'.red.inverse);
        await Product.deleteMany();
        await User.deleteMany();
        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    deleteData();
} else {
    importData();
}
