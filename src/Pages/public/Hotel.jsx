import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';
import axios from 'axios';
import Layout from '../../components/Layout';

function Hotel() {
  const [apiCity, setApiCity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchItem, setSearchItem] = useState('');
  const [filteredCity, setFilteredCity] = useState([]);
  const { Formik } = formik;
  const navigate = useNavigate();

  const schema = yup.object().shape({
    location: yup.string().required('Location is required'),
    check_in: yup.date().required('Check-in date is required').typeError('Invalid date'),
    check_out: yup.date()
      .required('Check-out date is required')
      .typeError('Invalid date')
      .min(yup.ref('check_in'), 'Check-out date must be after check-in date'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    navigate("/HotelSearch", { state: { ...values } });
    setSubmitting(false);
  };

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('https://hotel-management-backend-hb27.onrender.com/public/Alllocation');
        setApiCity(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch city data');
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

  const handleInputChange = (e, setFieldValue) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
    setFieldValue('location', searchTerm);

    const filteredItems = apiCity.filter((city) =>
      city.city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredCity(filteredItems);
  };

  const handleCitySelect = (cityName, setFieldValue) => {
    setSearchItem(cityName);
    setFieldValue('location', cityName);
    setFilteredCity([]); // Hide suggestions after selection
  };

  return (
    <Layout>
      <div className='vh-100 vw-100 d-flex'>
        <Carousel fade className='back' indicators={false} controls={false}>
          {[
            "https://www.movehotels.com/wp-content/uploads/2024/05/hotel_esterni.jpg",
            "https://www.movehotels.com/wp-content/uploads/2024/05/VCEMV_-Bar_1.jpg",
            "https://www.movehotels.com/wp-content/uploads/2024/05/Venice-italy-4-2.jpg",
            "https://www.movehotels.com/wp-content/uploads/2024/05/Move4Cover.jpg",
            "https://www.movehotels.com/wp-content/uploads/2024/05/alberto-caliman-txqr1lH37J0-unsplash-2.jpg",
            "https://www.movehotels.com/wp-content/uploads/2024/05/019_Move-MV-1448.jpg"
          ].map((src, index) => (
            <Carousel.Item interval={2500} key={index}>
              <img src={src} alt="" className='hero_img vw-100 vh-100' />
            </Carousel.Item>
          ))}
        </Carousel>

        <Container className='margin_top d-flex flex-column ml-3 vw-100 vh-90'>
          <div className='a d-flex align-items-center'>
            <span className='hero_title'>Welcome to <br /> Celestial</span>
          </div>
          <div className='booking_hero d-flex align-items-end w-100'>
            <Formik
              validationSchema={schema}
              onSubmit={handleSubmit}
              initialValues={{
                location: '',
                check_in: '',
                check_out: '',
              }}
            >
              {({ handleSubmit, handleChange, values, touched, errors, setFieldValue }) => (
                <Form noValidate onSubmit={handleSubmit} className='w-100 mb-5'>
                  <Container fluid>
                    <Row className="mb-3">
                      <Col md="6" className="position-relative">
                        <Form.Control
                          type="text"
                          name='location'
                          value={searchItem}
                          onChange={(e) => {
                            handleChange(e);
                            handleInputChange(e, setFieldValue);
                          }}
                          placeholder='Type to search'
                          isInvalid={touched.location && !!errors.location}
                        />
                        {loading && <p>Loading...</p>}
                        {error && <p>{error}</p>}
                        {!loading && !error && filteredCity.length > 0 && (
                          <div className="position-absolute" style={{ zIndex: 10, width: "96%" }}>
                            {filteredCity.map(city => (
                              <Card key={city.id} className="mb-2" onClick={() => handleCitySelect(city.city, setFieldValue)}>
                                <Card.Body className="p-2">
                                  {city.city}
                                </Card.Body>
                              </Card>
                            ))}
                          </div>
                        )}
                      </Col>
                      <Form.Group as={Col} md="2" sm="6" controlId="validationFormik02">
                        <Form.Control
                          className='rounded-pill'
                          type="date"
                          name="check_in"
                          placeholder="Check-in"
                          value={values.check_in}
                          onChange={e => setFieldValue('check_in', e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                          isInvalid={touched.check_in && !!errors.check_in}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.check_in}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} md="2" sm="6" controlId="validationFormik03">
                        <Form.Control
                          className='rounded-pill'
                          type="date"
                          name="check_out"
                          placeholder="Check-out"
                          value={values.check_out}
                          onChange={e => setFieldValue('check_out', e.target.value)}
                          min={values.check_in || new Date().toISOString().split("T")[0]}
                          isInvalid={touched.check_out && !!errors.check_out}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.check_out}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Col md={2}>
                        <Button type="submit" className='bg-warning heroButton rounded-pill text-black border-light'>
                          Search
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </Form>
              )}
            </Formik>
          </div>
        </Container>
      </div>
    </Layout>
  );
}

export default Hotel;
