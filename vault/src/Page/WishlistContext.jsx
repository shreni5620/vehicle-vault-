import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const WishlistContext = createContext(undefined);

const API_URL = 'http://localhost:3000/api/wishlist'; 

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    fetchWishlistItems();
  }, []);

  const fetchWishlistItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/wishlist`);
      if (!response.data.error) {
        setWishlistItems(response.data.items);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const addToWishlist = async (vehicleId) => {
    try {
      const response = await axios.post(`${API_URL}/wishlist/add`, { vehicleId });
      if (!response.data.error) {
        setWishlistItems(prev => [...prev, response.data.item]);
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  };

  const removeFromWishlist = async (vehicleId) => {
    try {
      const response = await axios.delete(`${API_URL}/wishlist/remove/${vehicleId}`);
      if (!response.data.error) {
        setWishlistItems(prev => prev.filter(item => item.id !== vehicleId));
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw error;
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
