import React, { useState } from 'react';
import { X, Star, Shield, Car, Fuel, Settings, Calendar, Speech as Speed, Gauge, Radio, Zap, Box, Heart, ParkingCircle, Wrench, Paintbrush as Paint, Users, DollarSign, ThumbsUp, AlertTriangle, Edit } from 'lucide-react';
import "../assets/ViewDetails.css";

const ViewDetails = ({ car, onClose, isAdmin = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedReview, setEditedReview] = useState({
    performance: "The 2024 BMW X5 delivers exceptional performance with its refined powertrain options...",
    rideHandling: "Precise steering and adaptive suspension provide excellent ride comfort...",
    bootSpace: "Generous cargo capacity of 650 liters, expandable to 1,870 liters...",
    safety: "5-star Euro NCAP rating with advanced driver assistance systems...",
    interior: "Premium materials and cutting-edge technology create a luxurious cabin...",
    exterior: "Bold design elements and iconic BMW styling cues...",
  });

  const specifications = [
    { icon: <Car size={20} />, title: "Body Type", value: car.type },
    { icon: <Fuel size={20} />, title: "Fuel Type", value: car.fuel },
    { icon: <Settings size={20} />, title: "Engine", value: car.engine },
    { icon: <Calendar size={20} />, title: "Year", value: "2024" },
    { icon: <Zap size={20} />, title: "Power", value: "335 bhp" },
    { icon: <Gauge size={20} />, title: "Mileage", value: car.mileage },
    { icon: <Box size={20} />, title: "Boot Space", value: "650 L" },
    { icon: <Users size={20} />, title: "Seating", value: "5 Persons" }
  ];

  const ratings = {
    performance: 4.5,
    comfort: 4.8,
    features: 4.6,
    safety: 4.9,
    value: 4.2
  };

  const handleSaveReview = () => {
    // Here you would typically save the edited review to your backend
    setIsEditing(false);
  };

  const RatingBar = ({ value, label }) => (
    <div className="rating-bar">
      <span className="rating-label">{label}</span>
      <div className="rating-progress">
        <div className="rating-fill" style={{ width: `${(value / 5) * 100}%` }}></div>
      </div>
      <span className="rating-value">{value}</span>
    </div>
  );

  return (
    <div className="view-details-overlay">
      <div className="view-details-modal">
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="car-gallery">
          <img src={car.image} alt={car.name} className="main-image" />
          <div className="thumbnail-grid">
            <img src={car.image} alt={car.name} />
            <img src={car.image} alt={car.name} />
            <img src={car.image} alt={car.name} />
          </div>
        </div>

        <div className="car-details-content">
          <div className="car-header">
            <div>
              <h2>{car.name}</h2>
              <div className="rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={16} className="filled" />
                ))}
                <span>(48 Reviews)</span>
              </div>
            </div>
            <div className="price-section">
              <div className="price-tag">
                <DollarSign size={24} />
                {car.price}
              </div>
              <div className="price-details">
                <p>Ex-showroom Price</p>
                <button className="emi-button">EMI from $899/mo</button>
              </div>
            </div>
          </div>

          <div className="specifications">
            <h3>Key Specifications</h3>
            <div className="specs-grid">
              {specifications.map((spec, index) => (
                <div key={index} className="spec-item">
                  {spec.icon}
                  <div>
                    <h4>{spec.title}</h4>
                    <p>{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="ratings-section">
            <h3>Expert Ratings</h3>
            <div className="ratings-grid">
              {Object.entries(ratings).map(([key, value]) => (
                <RatingBar 
                  key={key} 
                  label={key.charAt(0).toUpperCase() + key.slice(1)} 
                  value={value} 
                />
              ))}
            </div>
          </div>

          <div className="review-sections">
            {isAdmin && (
              <button 
                className="admin-edit-button"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit size={20} />
                {isEditing ? "Cancel Editing" : "Edit Review"}
              </button>
            )}

            {["performance", "rideHandling", "bootSpace", "safety", "interior", "exterior"].map((section) => (
              <div key={section} className="review-section">
                <h3>{section.charAt(0).toUpperCase() + section.slice(1).replace(/([A-Z])/g, ' $1')}</h3>
                {isEditing ? (
                  <textarea
                    value={editedReview[section]}
                    onChange={(e) => setEditedReview({
                      ...editedReview,
                      [section]: e.target.value
                    })}
                    className="review-editor"
                  />
                ) : (
                  <p>{editedReview[section]}</p>
                )}
              </div>
            ))}

            {isEditing && (
              <button className="save-review-button" onClick={handleSaveReview}>
                Save Review
              </button>
            )}
          </div>

          <div className="latest-updates">
            <h3>Latest Updates</h3>
            <div className="updates-list">
              <div className="update-item">
                <ThumbsUp size={20} />
                <p>New variant launched with enhanced features</p>
              </div>
              <div className="update-item">
                <AlertTriangle size={20} />
                <p>Price increased by 2% across variants</p>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button className="schedule-test">Schedule Test Drive</button>
            <button className="contact-dealer">Contact Dealer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;