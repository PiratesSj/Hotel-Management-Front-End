import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { FaStar } from 'react-icons/fa';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

// Validation schema for Formik
const schema = yup.object().shape({
  location: yup.string().required('Location is required'),
  check_in: yup.date().required('Check-in date is required').typeError('Invalid date'),
  check_out: yup.date()
    .required('Check-out date is required')
    .typeError('Invalid date')
    .min(yup.ref('check_in'), 'Check-out date must be after check-in date'),
});

function HotelSearch() {
  const location = useLocation();
  const navigate = useNavigate(); // useNavigate hook to handle navigation
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [initialValues, setInitialValues] = useState({
    location: '',
    check_in: '',
    check_out: '',
  });
  const [sortOrder, setSortOrder] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterValues, setFilterValues] = useState({
    minPrice: 0,
    maxPrice: 1000,
  });

  useEffect(() => {
    if (location.state) {
      const { location: loc, check_in, check_out } = location.state;
      const initialCheckIn = check_in || new Date().toISOString().split('T')[0];
      const initialCheckOut = check_out || new Date().toISOString().split('T')[0];

      setInitialValues({
        location: loc || '',
        check_in: initialCheckIn,
        check_out: initialCheckOut,
      });

      // Automatically search when the component loads with initial values
      fetchHotels({
        location: loc || '',
        check_in: initialCheckIn,
        check_out: initialCheckOut,
      });
    }
  }, [location.state]);

  const fetchHotels = async (values) => {
    try {
      const response = await axios.get(`http://localhost:8080/public/hotelsl/${values.location}`);
      setData(response.data);
      setFilteredData(response.data); // Show the data as it is initially
    } catch (error) {
      console.error('Failed to fetch hotels:', error);
    }
  };

  useEffect(() => {
    if (sortOrder || filterValues.minPrice || filterValues.maxPrice < 1000) {
      applyFiltersAndSort(data);
    }
  }, [sortOrder, filterValues]);

  const applyFiltersAndSort = (hotels) => {
    let filteredHotels = [...hotels];

    if (filterValues.minPrice || filterValues.maxPrice < 1000) {
      filteredHotels = filteredHotels.filter(hotel =>
        hotel.price >= filterValues.minPrice && hotel.price <= filterValues.maxPrice
      );
    }

    if (sortOrder) {
      filteredHotels.sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);
    }

    setFilteredData(filteredHotels);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setShowFilterModal(false);
  };

  const handleBookRoom = (hotel, room) => {
    navigate('/checkout', {
      state: {
        hotel,
        room,
        formData: initialValues,
      }
    });
  };

  return (
    <Layout>
      <div className='bg-black p-1 vw-100'>
        <div className='bg-black mt-5'>
          <div className='d-flex justify-content-between align-items-center p-2'>
            <h1 className='text-white'>Hotel Search Results</h1>
            <div>
              <Button
                variant='outline-light'
                className='rounded-pill mx-2'
                onClick={() => setShowFilterModal(true)}
              >
                Filters
              </Button>
              <Button
                variant='outline-light'
                className='rounded-pill mx-2'
                onClick={() => handleSortChange('asc')}
              >
                Sort: Low to High
              </Button>
              <Button
                variant='outline-light'
                className='rounded-pill'
                onClick={() => handleSortChange('desc')}
              >
                Sort: High to Low
              </Button>
            </div>
          </div>

          <Formik
            validationSchema={schema}
            initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={(values) => {
              fetchHotels(values);
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit} className='my-4 p-2'>
                <Row>
                  <Col md={4} className='mb-3'>
                    <Form.Control
                      type="text"
                      name='location'
                      placeholder='Location'
                      value={values.location}
                      onChange={handleChange}
                      isInvalid={touched.location && !!errors.location}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.location}
                    </Form.Control.Feedback>
                  </Col>
                  <Col md={3} className='mb-3'>
                    <Form.Control
                      type="date"
                      name="check_in"
                      placeholder="Check-in"
                      value={values.check_in}
                      onChange={handleChange}
                      isInvalid={touched.check_in && !!errors.check_in}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.check_in}
                    </Form.Control.Feedback>
                  </Col>
                  <Col md={3} className='mb-3'>
                    <Form.Control
                      type="date"
                      name="check_out"
                      placeholder="Check-out"
                      value={values.check_out}
                      onChange={handleChange}
                      isInvalid={touched.check_out && !!errors.check_out}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.check_out}
                    </Form.Control.Feedback>
                  </Col>
                  <Col md={2}>
                    <Button style={{width:"12rem"}} type="submit" className='bg-warning rounded-pill text-black border-light'>
                      Search
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>

          <div className='my-4 p-2'>
            <h2 className='text-white'>Available Hotels</h2>
            {filteredData.length > 0 ? (
              <Row>
                {filteredData.map((hotel) => (
                  <Col md={4} key={hotel.id} className='mb-4'>
                    <Card className='bg-dark text-white'>
                      <Card.Img variant="top" src={hotel.imageUrl} alt={hotel.name} />
                      <Card.Body>
                        <Card.Title>{hotel.hotelName}</Card.Title>
                        <Card.Text>
                          <div>{hotel.hotelDescription}</div>
                          <div>Rating: <FaStar /> {hotel.hotelRating}</div>
                          {/* Room Section */}
                          <div className="mt-3">
                            <h5>Rooms:</h5>
                            {hotel.rooms && hotel.rooms.length > 0 ? (
                              hotel.rooms.map((room) => (
                                <Card key={room.id} className='bg-secondary text-white mb-2'>
                                  <Card.Body>
                                    <div>Type: {room.roomType}</div>
                                    <div>Price: ₹{room.price}</div>
                                    <div>Capacity: {room.capacity}</div>
                                    <div>Availability: {room.availability ? 'Available' : 'Not Available'}</div>
                                    <Button 
                                      onClick={() => handleBookRoom(hotel, room)} 
                                      variant="warning" 
                                      className='text-black mt-2'
                                      disabled={!room.availability}
                                    >
                                      Book Room
                                    </Button>
                                  </Card.Body>
                                </Card>
                              ))
                            ) : (
                              <p>No rooms available.</p>
                            )}
                          </div>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <p className='text-white'>No hotels found matching your criteria.</p>
            )}
          </div>
        </div>

        {/* Filter Modal */}
        <Modal show={showFilterModal} onHide={() => setShowFilterModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Filter Hotels</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleFilterSubmit}>
              <Form.Group controlId="minPrice">
                <Form.Label>Minimum Price</Form.Label>
                <Form.Control
                  type="number"
                  value={filterValues.minPrice}
                  onChange={(e) => setFilterValues({ ...filterValues, minPrice: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="maxPrice" className="mt-3">
                <Form.Label>Maximum Price</Form.Label>
                <Form.Control
                  type="number"
                  value={filterValues.maxPrice}
                  onChange={(e) => setFilterValues({ ...filterValues, maxPrice: e.target.value })}
                />
              </Form.Group>
              <div className="mt-3 text-center">
                <Button type="submit" variant="primary">
                  Apply Filters
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </Layout>
  );
}

export default HotelSearch;
