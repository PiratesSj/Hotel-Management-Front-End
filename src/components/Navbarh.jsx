import React, { useState, useEffect, useRef } from 'react';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useLocation } from "react-router-dom";
import logo from '../assets/Logo.png';
import userIcon from '../assets/favIcon/user-regular.svg';
import "../index.css";
import { FaUser} from 'react-icons/fa';
import { Col, Row } from 'react-bootstrap';

function Navbarh() {
  const [navbarClass, setNavbarClass] = useState('navbar-custom');
  const [isLogged, setIsLogged] = useState(false);

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
          if (response.status === 200) {
            setIsLogged(true);
            localStorage.setItem("isLogged", "true");
          } else {
            setIsLogged(false);
            localStorage.clear();
          }
        } catch (error) {
          console.error("Error logging in:", error);
          setIsLogged(false);
          localStorage.removeItem("isLogged");
        }
      }
    };

    checkHealth();
  });

  const handleScroll = () => {
    if (window.scrollY >= 30) {
      setNavbarClass('navbar-custom navbar-scrolled');
    } else {
      setNavbarClass('navbar-custom');
    }
  };

  const LogOut = () => {
    localStorage.clear();
    setIsLogged(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const logincomp = (
    <Nav.Link as={Link} to="/login">
      <img
        src={userIcon}
        alt=""
        style={{
          height: "0.7rem",
          width: "0.59rem",
          marginBottom: "0.19rem",
          marginRight: "0.3rem",
        }}
      />
      Login
    </Nav.Link>
  );

  const loggedcomp = (
    <Row className="d-flex align-items-center justify-content-center px-1">
  <Col className="d-flex align-items-center p-0 m-0">
    <div className='d-flex align-items-center'>
      <FaUser className='text-white' />
    </div>
  </Col>
  <Col className="d-flex align-items-center p-0 m-0">
    <NavDropdown
      title={localStorage.getItem('firstName')}
      id="navbarScrollingDropdown"
      className="custom-dropdown"
    >
      <NavDropdown.Item as={Link} to="/account">Account</NavDropdown.Item>
      <NavDropdown.Item onClick={LogOut}>LogOut</NavDropdown.Item>
    </NavDropdown>
  </Col>
</Row>


  );

  return (
    <Navbar collapseOnSelect expand="lg" className={`${navbarClass}`} fixed="top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="h-100">
          <div>
            <img
              src={logo}
              alt="Celestial.co"
              className="img-fluid"
              style={{ height: "1rem", zoom: "200%" }}
            />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="mb-1">
          <Nav className="me-auto text-white">
            <NavDropdown
              title="Services"
              id="navbarScrollingDropdown"
              className="custom-dropdown"
            >
              <NavDropdown.Item as={Link} to="/hotel">Hotel</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/restaurant">Restaurant</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
          </Nav>
          <Nav>
            {isLogged ? loggedcomp : logincomp}
            <Nav.Link as={Link} to="/booking">Booking</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbarh;
