import React, { useEffect, useRef, useState } from 'react';
import { useLocation, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbarh from './components/Navbarh';
import "./index.css";
import Footer from './components/Footer';

import Admin from './Admin/Admin';
import Restaurant from './Pages/public/Restaurant';
import About from './Pages/public/About';
import Contact from './Pages/public/Contact';
import Hotel from './Pages/public/Hotel';
import Loginform from './components/Accounts/Loginform';
import Booking from './Pages/Booking';
import Home from './Pages/public/Home';
import Signup from './components/Accounts/Signup';
import OtpVerification from './components/Accounts/OtpVerifiction';
import ForgatePassword from './components/Accounts/ForgatePassword';
import UpdatePassword from './components/Accounts/UpdatePassword';
import HotelSearch from './Pages/HotelSearch';
import PartnerJoin from './Partner/PartnerJoin';
import Partner from './Partner/Partner';
import PrivateRoutes from './Pages/private/PrivateRoutes';
import Checkout from './Pages/private/CheckOut';


function App() {
  const location = useLocation();
  const previousUrlRef = useRef();


  useEffect(() => {
    // Update the previous URL with the current one
    localStorage.setItem('previousUrl', localStorage.getItem('currentUrl'));
    
    // Set the current URL in localStorage
    localStorage.setItem('currentUrl', location.pathname);
  
    // Update the ref with the new pathname
    previousUrlRef.current = location.pathname;
  }, [location]);

  return (
    <div className='vw-100 main'>
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotel" element={<Hotel />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Loginform />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otpVerification" element={<OtpVerification />} />
        <Route path="/forgatePassword" element={<ForgatePassword />} />
        <Route path="/updatePassword" element={<UpdatePassword />} />
        <Route path="/hotelSearch" element={<HotelSearch />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/partner-join" element={<PartnerJoin />} />
        <Route path="/partner/*" element={<Partner />} />
        <Route element={<PrivateRoutes/>}>
              <Route path='/checkout' element={<Checkout/>} />
        </Route>
      </Routes>
      
    </div>
  );
}

export default App;
