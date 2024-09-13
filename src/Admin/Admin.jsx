import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'; 
import { FaBars, FaUser, FaServicestack, FaSignOutAlt } from 'react-icons/fa';
import { IoIosPaper } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import logo from '../assets/Logo.png';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Partner from './Components/Partner';
import Users from './Components/Users';
import Services from './Components/Services';
import Request from './Components/Request';
import { CiDark } from "react-icons/ci";
import { IoIosSunny } from "react-icons/io";

function Admin() {
  const navigate = useNavigate();
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  

  useEffect(() => {
    const checkHealth = async () => {
      const accessToken = localStorage.getItem('access');
      if (accessToken) {
        try {
          const response = await fetch('http://localhost:8080/user/health-Check', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + accessToken,
            },
          });
          if (!(response.status === 200)) {
            localStorage.clear();
            navigate("/login");
          }
        } catch (error) {
          console.error("Error logging in:", error);
          localStorage.clear();
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };

    checkHealth();
  }, [navigate]);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const LogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="admin-container" style={{ backgroundColor: '#000', color: '#fff' }}>
      <div className='header' style={{ backgroundColor: '#111' }}>
        <div className='logo-container'>
          <button onClick={toggleMenu} className='toggle-button' style={{ color: '#fff' }}>
            <FaBars />
          </button>
         
        </div>
        <div className='title' style={{ color: '#fff' }}>
          Admin Panel
        </div>
      </div>
      <div className='main-content '>
        {isMenuVisible && (
          <div className='sidebar' style={{ backgroundColor: '#111' }}>
            <Link to="" className='menu-item' style={{ color: '#fff' }}>
              <MdDashboard /> Dashboard
            </Link>
            <Link to="Partner" className='menu-item' style={{ color: '#fff' }}>
              <FaUser /> Partner
            </Link>
            <Link to="Users" className='menu-item' style={{ color: '#fff' }}>
              <FaUser /> Users
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
        <div className='content  bg-black'>
          <Routes>
            <Route path="" element={<Dashboard />} />
            <Route path="/Partner" element={<Partner />} />
            <Route path="/Users" element={<Users />} />
            <Route path="/Service" element={<Services />} />
            <Route path="/Request" element={<Request />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Admin;
