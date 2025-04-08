const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/WishlistControllers');

// Wishlist routes
router.get('/wishlist', wishlistController.getWishlistItems);
router.post('/wishlist/add', wishlistController.addToWishlist);
router.delete('/wishlist/remove/:vehicleId', wishlistController.removeFromWishlist);

module.exports = router;
