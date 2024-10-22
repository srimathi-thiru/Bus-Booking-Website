import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BusInfo.css';

const BusInfo = () => {
  const [busDetails, setBusDetails] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const { pickupLocation, dropoffLocation } = location.state || {};

  useEffect(() => {
    fetch('http://localhost:3000/bus')
      .then((response) => response.json())
      .then((data) => {
        const flattenedData = data.flat();
        setBusDetails(flattenedData);
        filterBuses(flattenedData);
      })
      .catch((error) => console.error('Error fetching bus data:', error));
  }, []);

  const filterBuses = (busData) => {
    if (pickupLocation && dropoffLocation) {
      const filtered = busData.filter(
        (bus) =>
          bus.pickupLocation.toLowerCase() === pickupLocation.toLowerCase() &&
          bus.dropoffLocation.toLowerCase() === dropoffLocation.toLowerCase()
      );
      setFilteredBuses(filtered);
    }
  };

  const handleViewSeats = (busId) => {
    navigate('/seat-view');
  };

  return (
    <div className="Bus-container">
      <h2>Bus Information</h2>
      <h3>Available Buses</h3>
      {filteredBuses.length > 0 ? (
        <ul className="bus-list">
          {filteredBuses.map((bus, index) => (
            <li key={bus.busId}>
              <p><strong>Bus {index + 1}:</strong></p>
              <p><strong>Pick-up Location:</strong> {bus.pickupLocation}</p>
              <p><strong>Drop-off Location:</strong> {bus.dropoffLocation}</p>
              <p><strong>Travel Duration:</strong> {bus.travelDuration}</p>
              <p><strong>Seats Available:</strong> {bus.seatsAvailable}</p>
              <button
                className="button-view-seats"
                onClick={() => handleViewSeats(bus.busId)}
              >
                View Seats
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No buses available for the selected route.</p>
      )}
    </div>
  );
};

export default BusInfo;
