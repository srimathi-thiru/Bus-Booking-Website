
import React, { useState } from 'react';
import './TicketBooking.css';

const TicketBookingForm = ({ selectedSeats, onBack, onProceedToPayment }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onProceedToPayment();
  };

  return (
    <div className="ticket-booking-form">
      <h2>Ticket Booking Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Selected Seats:</label>
          <p>{selectedSeats.join(', ')}</p>
        </div>
        <button type="submit" className="submit-button">
          Proceed to Payment
        </button>
      </form>
      <button className="back-button" onClick={onBack}>
        Back to Seat Selection
      </button>
    </div>
  );
};

export default TicketBookingForm;
