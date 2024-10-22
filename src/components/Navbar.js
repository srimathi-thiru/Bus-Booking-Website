
import React from 'react'
import { Link } from 'react-router-dom';

import "./Navbar.css";
const Navbar = () => {
  return (
    <nav className="navbar">
        <div className="navbar-logo">
            <img src='https://bookingbus.in/bookingbus/images/site/logo.png' alt=''/>
        </div>
        <ul className="navbar-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/bookings">My Bookings</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    </nav>
  )
}

export default Navbar;


