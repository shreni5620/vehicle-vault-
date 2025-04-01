import React, { useState } from 'react';
import "../assets/AddNewVehicle.css";
import { useNavigate } from 'react-router-dom';

const AddNewVehicle = () => {

  const navigate = useNavigate();

  const [vehicleData, setVehicleData] = useState({
    brand: '',
    model: '',
    year: '',
    price: '',
    kilometers: '',
    fuelType: '',
    transmission: '',
    location: '',
    color: '',
    owners: '1',
    images: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicleData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setVehicleData(prev => ({
      ...prev,
      images: files
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Vehicle Data:', vehicleData);
    navigate("/admin/dashboard")
  };

  return (
    <div className="add-vehicle-container">
        <button className="back-button" onClick={() => navigate("/admin/dashboard")}>
            Back to Dashboard
        </button>
      <h1>Add New Vehicle</h1>
      <form onSubmit={handleSubmit} className="vehicle-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="brand">Brand*</label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={vehicleData.brand}
              onChange={handleInputChange}
              required
              placeholder="e.g., Toyota"
            />
          </div>

          <div className="form-group">
            <label htmlFor="model">Model*</label>
            <input
              type="text"
              id="model"
              name="model"
              value={vehicleData.model}
              onChange={handleInputChange}
              required
              placeholder="e.g., Camry"
            />
          </div>

          <div className="form-group">
            <label htmlFor="year">Year*</label>
            <input
              type="number"
              id="year"
              name="year"
              value={vehicleData.year}
              onChange={handleInputChange}
              required
              placeholder="e.g., 2022"
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price (₹)*</label>
            <input
              type="number"
              id="price"
              name="price"
              value={vehicleData.price}
              onChange={handleInputChange}
              required
              placeholder="e.g., 1500000"
            />
          </div>

          <div className="form-group">
            <label htmlFor="kilometers">Kilometers Driven*</label>
            <input
              type="number"
              id="kilometers"
              name="kilometers"
              value={vehicleData.kilometers}
              onChange={handleInputChange}
              required
              placeholder="e.g., 50000"
            />
          </div>

          <div className="form-group">
            <label htmlFor="fuelType">Fuel Type*</label>
            <select
              id="fuelType"
              name="fuelType"
              value={vehicleData.fuelType}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="CNG">CNG</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="transmission">Transmission*</label>
            <select
              id="transmission"
              name="transmission"
              value={vehicleData.transmission}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Transmission</option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="location">Location*</label>
            <input
              type="text"
              id="location"
              name="location"
              value={vehicleData.location}
              onChange={handleInputChange}
              required
              placeholder="e.g., Mumbai"
            />
          </div>

          <div className="form-group">
            <label htmlFor="color">Color*</label>
            <input
              type="text"
              id="color"
              name="color"
              value={vehicleData.color}
              onChange={handleInputChange}
              required
              placeholder="e.g., White"
            />
          </div>

          <div className="form-group">
            <label htmlFor="owners">Number of Previous Owners*</label>
            <select
              id="owners"
              name="owners"
              value={vehicleData.owners}
              onChange={handleInputChange}
              required
            >
              <option value="1">1st Owner</option>
              <option value="2">2nd Owner</option>
              <option value="3">3rd Owner</option>
              <option value="4+">4+ Owners</option>
            </select>
          </div>
        </div>

        <div className="form-group images-upload">
          <label htmlFor="images">Upload Vehicle Images*</label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleImageUpload}
            multiple
            accept="image/*"
            required
          />
          <p className="image-hint">You can upload multiple images (max 10)</p>
        </div>

        <button type="submit" className="submit-btn">
          Add Vehicle
        </button>
      </form>
    </div>
  );
};

export default AddNewVehicle;