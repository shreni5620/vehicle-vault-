const Admin = require('../models/AdminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminController = {
    // Admin Login
    async login(req, res) {
        try {
            const { username, password } = req.body;

            // Find admin by username
            const admin = await Admin.findOne({ username });
            if (!admin) {
                return res.status(401).json({
                    error: true,
                    message: 'Invalid credentials'
                });
            }

            // Verify password
            const isValidPassword = await bcrypt.compare(password, admin.password);
            if (!isValidPassword) {
                return res.status(401).json({
                    error: true,
                    message: 'Invalid credentials'
                });
            }

            // Generate JWT token
            const token = jwt.sign(
                { id: admin._id, username: admin.username, role: admin.role },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.status(200).json({
                error: false,
                message: 'Login successful',
                token,
                admin: {
                    id: admin._id,
                    username: admin.username,
                    email: admin.email,
                    role: admin.role
                }
            });
        } catch (error) {
            res.status(500).json({
                error: true,
                message: 'Error during login',
                details: error.message
            });
        }
    },

    // Get Dashboard Stats
    async getDashboardStats(req, res) {
        try {
            // You can add more stats as needed
            const stats = {
                totalUsers: await User.countDocuments(),
                totalCars: await Car.countDocuments(),
                totalWishlist: await Wishlist.countDocuments(),
                totalInquiries: await Inquiry.countDocuments()
            };

            res.status(200).json({
                error: false,
                stats
            });
        } catch (error) {
            res.status(500).json({
                error: true,
                message: 'Error fetching dashboard stats',
                details: error.message
            });
        }
    }
};

module.exports = adminController;
