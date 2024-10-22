import React, { useState } from 'react';
import './PaymentPage.css';
import axios from 'axios';

const PaymentPage = ({ selectedSeats = [], onPaymentSuccess, onBack }) => {
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [errors, setErrors] = useState({});
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  
  const pricePerSeat = 10; 
  const totalPrice = selectedSeats.length * pricePerSeat;

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

 
  const validateForm = () => {
    const newErrors = {};
    if (!/^\d{2}\/\d{2}$/.test(paymentDetails.expiryDate)) {
      newErrors.expiryDate = 'Expiry date must be in MM/YY format';
    }
    if (!/^\d{3,4}$/.test(paymentDetails.cvv)) {
      newErrors.cvv = 'CVV must be 3 or 4 digits';
    }
    if (!paymentDetails.nameOnCard) {
      newErrors.nameOnCard = 'Name on card is required';
    }
    return newErrors;
  };

const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      try {
        
        const bookingData = {
          nameOnCard: paymentDetails.nameOnCard,
          totalPrice,
          seats: selectedSeats,
          paymentMethod,
          paymentStatus: 'Successful',
        };
  
        console.log('Submitting booking data:', bookingData); 
  
        const response = await axios.post('http://localhost:3000/bookings', bookingData);
  
        console.log('Response from server:', response);
  
        setIsPaymentSuccessful(true); 
        if (onPaymentSuccess) {
          onPaymentSuccess(); 
        }
      } catch (error) {
        console.error('Error saving booking:', error);
      }
    } else {
      setErrors(formErrors);
    }
  };
  
  return (
    <div className="payment-page">
      <h2>Payment Method</h2>
      {isPaymentSuccessful ? (
        <div className="payment-success-message">
          <h3>Payment Successful!</h3>
          <p>Thank you for your payment. Your booking is confirmed.</p>
        </div>
      ) : (
        <>
          <form onSubmit={handlePaymentSubmit} className="payment-form">
            <div className="form-group">
              <label>Name on Card:</label>
              <input
                type="text"
                name="nameOnCard"
                placeholder="John Smith"
                value={paymentDetails.nameOnCard}
                onChange={handleInputChange}
                required
              />
              {errors.nameOnCard && <small className="error">{errors.nameOnCard}</small>}
            </div>
            <div className="form-group">
              <label>Card Number:</label>
              <input
                type="text"
                name="cardNumber"
                placeholder="XXXX XXXX XXXX XXXX"
                value={paymentDetails.cardNumber}
                onChange={handleInputChange}
                required
              />
              {errors.cardNumber && <small className="error">{errors.cardNumber}</small>}
            </div>
            <div className="form-row">
              <div className="form-group half-width">
                <label>Expiration Date:</label>
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={paymentDetails.expiryDate}
                  onChange={handleInputChange}
                  required
                />
                {errors.expiryDate && <small className="error">{errors.expiryDate}</small>}
              </div>
              <div className="form-group half-width">
                <label>CVV:</label>
                <input
                  type="password"
                  name="cvv"
                  placeholder="XXX"
                  value={paymentDetails.cvv}
                  onChange={handleInputChange}
                  required
                />
                {errors.cvv && <small className="error">{errors.cvv}</small>}
              </div>
            </div>
            <button type="submit" className="pay-button">
              Make a Payment
            </button>
            <button type="button" className="back-button" onClick={onBack}>
              Back
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default PaymentPage;

