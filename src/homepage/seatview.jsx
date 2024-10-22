import React, { useState } from 'react';
import './seatview.css';
import TicketBookingForm from './TicketBooking';
import PaymentPage from './PaymentPage';

const BusSeatBooking = () => {
  const [seats, setSeats] = useState(Array(40).fill(false));
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showPaymentPage, setShowPaymentPage] = useState(false);
  
  const pricePerSeat = 10; 
  const selectedSeats = seats
    .map((isBooked, index) => (isBooked ? index + 1 : null))
    .filter((seat) => seat !== null);
  const totalPrice = selectedSeats.length * pricePerSeat; 

  const handleSeatClick = (index) => {
    const updatedSeats = [...seats];
    updatedSeats[index] = !updatedSeats[index];
    setSeats(updatedSeats);
  };

  const renderSeats = () => {
    return seats.map((isBooked, index) => (
      <div
        key={index}
        className={`seat ${isBooked ? 'booked' : 'available'}`}
        onClick={() => handleSeatClick(index)}
      >
        {index + 1}
      </div>
    ));
  };

  const handleBookButtonClick = () => {
    setShowBookingForm(true);
  };

  const handleBackToSeatSelection = () => {
    setShowBookingForm(false);
    setShowPaymentPage(false);
  };

  const handleProceedToPayment = () => {
    setShowPaymentPage(true);
  };

  const handlePaymentSuccess = () => {
    setSeats(Array(40).fill(false)); 
    setShowBookingForm(false);
    setShowPaymentPage(false);
    alert('Thank you for your booking!');
  };

  return (
    <div className="bus-seat-booking">
      {showPaymentPage ? (
        <PaymentPage
          selectedSeats={selectedSeats}
          onPaymentSuccess={handlePaymentSuccess}
          onBack={() => setShowPaymentPage(false)}
        />
      ) : showBookingForm ? (
        <TicketBookingForm
          selectedSeats={selectedSeats}
          onBack={handleBackToSeatSelection}
          onProceedToPayment={handleProceedToPayment}
        />
      ) : (
        <>
          <h2>Bus Seat Booking</h2>
          <div className="seat-layout">{renderSeats()}</div>
          <div className="legend">
            <div className="legend-item">
              <div className="seat available"></div> Available
            </div>
            <div className="legend-item">
              <div className="seat booked"></div> Booked
            </div>
          </div>
          <div className="total-price">
            <p>Total Price: ${totalPrice}</p>
          </div>
          <button
            className="book-button"
            onClick={handleBookButtonClick}
            disabled={selectedSeats.length === 0}
          >
            Book Ticket
          </button>
        </>
      )}
    </div>
  );
};

export default BusSeatBooking;
