const Wishlist  = require('../models/WishlistModel');

// Define the controller functions
const getWishlistItems = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ 
        error: true, 
        message: 'userId is required in query parameters' 
      });
    }

    const items = await Wishlist.find({ userId });
    // Map the items to return car data
    const formattedItems = items.map(item => ({
      id: item.vehicleId,
      ...item.carData
    }));
    return res.status(200).json({ error: false, items: formattedItems });
  } catch (error) {
    return res.status(500).json({ 
      error: true, 
      message: 'Error fetching wishlist', 
      details: error.message 
    });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const { userId, vehicleId, carData } = req.body;
    if (!userId || !vehicleId || !carData) {
      return res.status(400).json({ 
        error: true, 
        message: 'userId, vehicleId, and carData are required in request body' 
      });
    }

    const existingItem = await Wishlist.findOne({ userId, vehicleId });
    if (existingItem) {
      return res.status(409).json({ 
        error: true, 
        message: 'Item already in wishlist' 
      });
    }

    const wishlistItem = await Wishlist.create({ 
      userId, 
      vehicleId,
      carData
    });
    
    return res.status(201).json({ 
      error: false, 
      message: 'Item added to wishlist', 
      item: {
        id: vehicleId,
        ...carData
      }
    });
  } catch (error) {
    return res.status(500).json({ 
      error: true, 
      message: 'Error adding to wishlist', 
      details: error.message 
    });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const { userId } = req.body;

    if (!userId || !vehicleId) {
      return res.status(400).json({ 
        error: true, 
        message: 'userId in body and vehicleId in params are required' 
      });
    }

    const result = await Wishlist.findOneAndDelete({ userId, vehicleId });
    if (!result) {
      return res.status(404).json({ 
        error: true, 
        message: 'Wishlist item not found' 
      });
    }

    return res.status(200).json({ 
      error: false, 
      message: 'Item removed from wishlist' 
    });
  } catch (error) {
    return res.status(500).json({ 
      error: true, 
      message: 'Error removing from wishlist', 
      details: error.message 
    });
  }
};

// Export the functions directly
module.exports = {
    getWishlistItems,
    addToWishlist,
    removeFromWishlist
};
