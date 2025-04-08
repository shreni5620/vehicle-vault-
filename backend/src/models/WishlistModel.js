const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  userId: { 
    type: String,
    required: true 
  },
  vehicleId: {
    type: String,
    required: true 
  },
  carData: {
    name: String,
    price: Number,
    image: String,
    year: String,
    mileage: String,
    fuel: String,
    location: String,
    dateAdded: {
      type: Date,
      default: Date.now
    }
  }
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
