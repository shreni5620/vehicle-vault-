import React, { useState } from 'react';
import { Car, Fuel, Settings, Gauge, DollarSign, Shield, Award, Star, Plus, X } from 'lucide-react';
import "../assets/CompareList.css";

const CompareList = () => {
  const [selectedCars, setSelectedCars] = useState([
    {
      id: 1,
      name: "2024 BMW X5",
      image: "https://images.unsplash.com/photo-1609184166822-bd1f1b991a06?q=80&w=2099&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "62,900",
      engine: "3.0L 6-cylinder",
      power: "335 bhp",
      torque: "330 Nm",
      transmission: "8-speed Automatic",
      mileage: "24/31 mpg",
      fuelType: "Petrol",
      seating: "5",
      safety: "5-star NCAP",
      features: ["Panoramic Sunroof", "360° Camera", "Wireless Charging", "Lane Assist"],
      rating: 4.8
    },
    {
      id: 2,
      name: "2024 Mercedes-Benz GLE",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT2yldaxR_MkWobLfV2jbqGg7OU198oZ14mg&s",
      price: "67,500",
      engine: "3.0L 6-cylinder",
      power: "362 bhp",
      torque: "369 Nm",
      transmission: "9-speed Automatic",
      mileage: "23/30 mpg",
      fuelType: "Petrol",
      seating: "5",
      safety: "5-star NCAP",
      features: ["MBUX Infotainment", "Air Suspension", "Wireless Charging", "Lane Assist"],
      rating: 4.7
    }
  ]);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={16}
        className={index < Math.floor(rating) ? 'filled' : ''}
      />
    ));
  };

  const addCar = () => {
    if (selectedCars.length < 3) {
      // Mock adding a new car
      const newCar = {
        id: 3,
        name: "2024 Audi Q7",
        image: "https://images.unsplash.com/photo-1606664825213-708b267595b9?auto=format&fit=crop&q=80&w=1000",
        price: "65,800",
        engine: "3.0L V6",
        power: "340 bhp",
        torque: "370 Nm",
        transmission: "8-speed Automatic",
        mileage: "22/29 mpg",
        fuelType: "Petrol",
        seating: "7",
        safety: "5-star NCAP",
        features: ["Virtual Cockpit", "Air Suspension", "Wireless Charging", "Lane Assist"],
        rating: 4.6
      };
      setSelectedCars([...selectedCars, newCar]);
    }
  };

  const removeCar = (id) => {
    setSelectedCars(selectedCars.filter(car => car.id !== id));
  };

  return (
    <div className="comparison-container">
      <div className="comparison-header">
        <h1>Car Comparison</h1>
        <p>Compare features, specifications, and prices of different vehicles</p>
      </div>

      <div className="comparison-grid">
        {selectedCars.map(car => (
          <div key={car.id} className="car-column">
            <button className="remove-car" onClick={() => removeCar(car.id)}>
              <X size={20} />
            </button>
            
            <div className="car-image">
              <img src={car.image} alt={car.name} />
            </div>
            
            <div className="car-name">
              <h2>{car.name}</h2>
              <div className="rating">
                {renderStars(car.rating)}
                <span>({car.rating})</span>
              </div>
            </div>

            <div className="car-price">
              <DollarSign size={20} />
              <span>${car.price}</span>
            </div>

            <div className="specs-section">
              <h3>Key Specifications</h3>
              
              <div className="spec-item">
                <Car size={20} />
                <div>
                  <h4>Engine</h4>
                  <p>{car.engine}</p>
                </div>
              </div>

              <div className="spec-item">
                <Gauge size={20} />
                <div>
                  <h4>Power</h4>
                  <p>{car.power}</p>
                </div>
              </div>

              <div className="spec-item">
                <Settings size={20} />
                <div>
                  <h4>Transmission</h4>
                  <p>{car.transmission}</p>
                </div>
              </div>

              <div className="spec-item">
                <Fuel size={20} />
                <div>
                  <h4>Mileage</h4>
                  <p>{car.mileage}</p>
                </div>
              </div>
            </div>

            <div className="features-section">
              <h3>Key Features</h3>
              <ul>
                {car.features.map((feature, index) => (
                  <li key={index}>
                    <Shield size={16} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="safety-rating">
              <Award size={20} />
              <span>{car.safety}</span>
            </div>
          </div>
        ))}

        {selectedCars.length < 3 && (
          <div className="add-car-column">
            <button onClick={addCar} className="add-car-button">
              <Plus size={24} />
              <span>Add Car to Compare</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareList;