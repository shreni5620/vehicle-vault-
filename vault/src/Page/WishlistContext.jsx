import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create context without type annotation
const WishlistContext = createContext();

const API_URL = 'http://localhost:3000'; // Removed /api/wishlist since it's already in the routes

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  
  // You should get the actual userId from your authentication system
  // For now, we'll use a dummy userId for testing
  const userId = localStorage.getItem('userId') || '123'; // Replace with actual user authentication

  useEffect(() => {
    fetchWishlistItems();
  }, []);

  const fetchWishlistItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/wishlist/wishlist`, {
        params: { userId }
      });
      if (!response.data.error) {
        setWishlistItems(response.data.items);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const addToWishlist = async (carData) => {
    try {
      const response = await axios.post(`${API_URL}/wishlist/wishlist/add`, {
        userId,
        vehicleId: carData.id,
        carData // Send complete car data
      });
      if (!response.data.error) {
        setWishlistItems(prev => [...prev, carData]);
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  };

  const removeFromWishlist = async (vehicleId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/wishlist/wishlist/remove/${vehicleId}`,
        { data: { userId } }
      );
      if (!response.data.error) {
        setWishlistItems(prev => prev.filter(item => item.id !== vehicleId));
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw error;
    }
  };

  return (
    <WishlistContext.Provider 
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
