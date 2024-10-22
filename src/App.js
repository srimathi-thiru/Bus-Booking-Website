import React from 'react'
import Navbar from './components/Navbar'
import { Route,BrowserRouter as Router, Routes } from 'react-router-dom'
import Bookings from './components/Bookings'
import Home from './components/Home'
import Contact from './components/Contact'
import Login from './components/Login'
import Signup from './components/SignUp'
import BusInfo from './homepage/BusInfo'
import BusSeatBooking from './homepage/seatview'
function App() {
  return (
    <Router>
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/bookings" element={<Bookings/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/bus-info" element={<BusInfo />} />
        <Route path="/seat-view" element={<BusSeatBooking/>} />
      </Routes>
    </div>
    </Router>
    
  )
}

export default App
