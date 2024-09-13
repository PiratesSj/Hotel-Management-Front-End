import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'; 
import { FaBars, FaUser, FaServicestack, FaSignOutAlt } from 'react-icons/fa';
import { IoIosPaper } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import logo from '../assets/Logo.png';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Services from './Components/Services';
import Request from './Components/Request';
import axios from 'axios';

function Partner() {
  const navigate = useNavigate();
  const [isMenuVisible, setIsMenuVisible] = useState(true);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  useEffect(() => {
    (async () => {
      if (!localStorage.getItem('partnerId')) {
        try {
          const roleResponse = await axios.get(
            `http://localhost:8080/partner/getPartnerDetailByUserId/${localStorage.getItem('userId')}`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access'),
              },
            }
          );
          if (roleResponse.status === 200) {
            localStorage.setItem('partnerId', roleResponse.data.id);
          }
        } catch (error) {
          console.error('Error fetching partner details:', error);
        }
      }
    })();
  }, []);

  const LogOut = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="partner-container" style={{ backgroundColor: '#000', color: '#fff' }}>
      <div className='header' style={{ backgroundColor: '#111' }}>
        <div className='logo-container'>
          <img src={logo} alt="Celestial.co" className='logo' />
          <button onClick={toggleMenu} className='toggle-button' style={{ color: '#fff' }}>
            <FaBars />
          </button>
        </div>
        <div className='title' style={{ color: '#fff' }}>
          Partner Dashboard
        </div>
      </div>
      <div className='main-content'>
        {isMenuVisible && (
          <div className='sidebar' style={{ backgroundColor: '#111' }}>
            <Link to="" className='menu-item' style={{ color: '#fff' }}>
              <MdDashboard /> Dashboard
            </Link>
            <Link to="Service" className='menu-item' style={{ color: '#fff' }}>
              <FaServicestack /> Services
            </Link>
            <Link to="Request" className='menu-item' style={{ color: '#fff' }}>
              <IoIosPaper /> Requests
            </Link>
            <button className='menu-item logout-button' onClick={LogOut} style={{ color: '#fff' }}>
              <FaSignOutAlt /> LogOut
            </button>
          </div>
        )}
        <div className='content vh-100' style={{
          color: '#fff',
          height: '100vh',
          overflowY: 'auto',
          scrollbarWidth: 'none', /* For Firefox */
          msOverflowStyle: 'none',  /* For Internet Explorer and Edge */
        }}>
          <Routes>
            <Route path="" element={<Dashboard />} />
            <Route path="/Service" element={<Services />} />
            <Route path="/Request" element={<Request />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Partner;
