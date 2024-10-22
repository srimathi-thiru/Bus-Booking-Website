
import React, { useEffect, useState } from 'react';
import "./Bookings.css";
import axios from 'axios';

function Bookings() {
  const [bookings, setBookings] = useState([]);

  
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/bookings');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h2>Bookings</h2>
      <div className="bookings-list">
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          bookings.map((booking, index) => (
            <div key={index} className="booking-item">
              <h3>Booking {index + 1}</h3>
              <p><strong>Name on Card:</strong> {booking.nameOnCard}</p>
              <p><strong>Total Price:</strong> ${booking.totalPrice}</p>
              <p><strong>Seats:</strong> {booking.seats.join(', ')}</p>
              <p><strong>Payment Method:</strong> {booking.paymentMethod}</p>
              <p><strong>Payment Status:</strong> {booking.paymentStatus}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Bookings;
