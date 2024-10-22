import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const today = new Date().toISOString().split('T')[0]; 
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1))
    .toISOString()
    .split('T')[0]; 
  const currentTime = new Date().toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  }); 

  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupDate, setPickupDate] = useState(today);
  const [dropoffDate, setDropoffDate] = useState(tomorrow);
  const [pickupTime, setPickupTime] = useState(currentTime);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      navigate('/bus-info', {
        state: {
          pickupLocation,
          dropoffLocation,
          pickupDate,
          dropoffDate,
          pickupTime,
        },
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (pickupLocation.trim() === '') {
      errors.pickupLocation = 'Pick-up location is required';
    }
    if (dropoffLocation.trim() === '') {
      errors.dropoffLocation = 'Drop-off location is required';
    }
    if (pickupDate === '') {
      errors.pickupDate = 'Pick-up date is required';
    }
    if (dropoffDate === '') {
      errors.dropoffDate = 'Drop-off date is required';
    }
    if (pickupTime === '') {
      errors.pickupTime = 'Pick-up time is required';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="left-content">
          <h1>Now It's Easy for You to Book a Ticket</h1>
          <p>Effortless Ticket Bookings for your travel needs. Plan your journey today!</p>
        </div>
        <div className="right-content">
          <form className="search-form" onSubmit={handleSearch}>
            <label>Pick-up Location</label>
            <input
              type="text"
              placeholder="Pick-up Location"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
            />
            {errors.pickupLocation && <div className="error">{errors.pickupLocation}</div>}
            
            <label>Drop-off Location</label>
            <input
              type="text"
              placeholder="Drop-off Location"
              value={dropoffLocation}
              onChange={(e) => setDropoffLocation(e.target.value)}
            />
            {errors.dropoffLocation && <div className="error">{errors.dropoffLocation}</div>}
            
            <label>Pick-up Date </label>
            <input
              type="date"
              placeholder="Pick-up Date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
            />
            {errors.pickupDate && <div className="error">{errors.pickupDate}</div>}
            
            <label>Drop-off Date </label>
            <input
              type="date"
              placeholder="Drop-off Date"
              value={dropoffDate}
              onChange={(e) => setDropoffDate(e.target.value)}
            />
            {errors.dropoffDate && <div className="error">{errors.dropoffDate}</div>}
            
            <label>Pick-up Time </label>
            <input
              type="time"
              placeholder="Pick-up Time"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
            />
            {errors.pickupTime && <div className="error">{errors.pickupTime}</div>}
            
            <button type="submit">Search Vehicle</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;

