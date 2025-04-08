const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/login', adminController.login);
router.get('/dashboard-stats', authMiddleware, adminController.getDashboardStats);

module.exports = router;
