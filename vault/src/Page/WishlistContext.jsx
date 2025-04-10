import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

// Create context without type annotation
const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get userId from localStorage or implement proper auth
  const userId = localStorage.getItem('userId') || '123';

  const fetchWishlistItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_ENDPOINTS.WISHLIST, {
        params: { userId }
      });
      setWishlistItems(response.data.items || []);
      setError(null);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      setError('Failed to fetch wishlist items');
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (carData) => {
    try {
      const response = await axios.post(API_ENDPOINTS.WISHLIST_ADD, {
        userId,
        vehicleId: carData.id,
        carData
      });
      if (!response.data.error) {
        setWishlistItems(prev => [...prev, carData]);
      }
      return response.data;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  };

  const removeFromWishlist = async (vehicleId) => {
    try {
      const response = await axios.delete(
        `${API_ENDPOINTS.WISHLIST_REMOVE}/${vehicleId}`,
        { data: { userId } }
      );
      if (!response.data.error) {
        setWishlistItems(prev => prev.filter(item => item.id !== vehicleId));
      }
      return response.data;
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchWishlistItems();
  }, []);

  return (
    <WishlistContext.Provider 
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        loading,
        error
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
