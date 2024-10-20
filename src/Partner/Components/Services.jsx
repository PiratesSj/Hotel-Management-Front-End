import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Col ,Form} from 'react-bootstrap';
import axios from 'axios';
import { Formik, Field, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { FaHotel, FaUtensils, FaShip, FaPlane, FaEdit, FaTrash } from 'react-icons/fa'; // Importing FontAwesome icons

function Services() {
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [yachts, setYachts] = useState([]);
  const [privateJets, setPrivateJets] = useState([]);
  const [toggleMainMenu, setToggleMainMenu] = useState("existing");
  const [serviceMenu, setServiceMenu] = useState("Hotel");
  const [isLoading, setIsLoading] = useState(true);


  // State for selected items
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedYacht, setSelectedYacht] = useState(null);
  const [selectedPrivateJet, setSelectedPrivateJet] = useState(null);

  // States for edit forms
  const [editHotel, setEditHotel] = useState(null);
  const [editRestaurant, setEditRestaurant] = useState(null);
  const [editYacht, setEditYacht] = useState(null);
  const [editPrivateJet, setEditPrivateJet] = useState(null);

 
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (serviceMenu === 'Hotel') {
          const response = await axios.get(`https://hotel-management-backend-hb27.onrender.com/partner/get-all-hotel/${localStorage.getItem("partnerId")}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('access'),
            },
          });
          if(response.status===200){
            setHotels(response.data);
            console.log(response.data)
            setIsLoading(false);
          }
          
        } 
        else if (serviceMenu === 'Restaurant') {
          const response = await axios.get(`https://hotel-management-backend-hb27.onrender.com/partner/get-all-Restaurant/${localStorage.getItem("partnerId")}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('access'),
            },
          });
          if(response.status===200){
           setRestaurants(response.data);
           setIsLoading(false);
          }
        } 
        else if (serviceMenu === 'Yacht') {
          const response = await axios.get(`https://hotel-management-backend-hb27.onrender.com/partner/get-all-yacht/${localStorage.getItem("partnerId")}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('access'),
            },
          });
          if(response.status===200){
            setYachts(response.data);
          }
          setIsLoading(false);
        }
        else if (serviceMenu === 'PrivateJet') {
          const response = await axios.get(`https://hotel-management-backend-hb27.onrender.com/partner/get-all-privateJet/${localStorage.getItem("partnerId")}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('access'),
            },
          });
          if(response.status===200){
            setPrivateJets(response.data);
            setIsLoading(false);
          }  

        }
      } catch (error) {
        console.error('Failed to fetch data', error);
      }finally{
        setIsLoading(false);
      }
    };
    fetchData();
  }, [serviceMenu]);

   // Update functions (API placeholders)
   const updateHotel = async (values) => {
    try {
      await axios.put(`https://hotel-management-backend-hb27.onrender.com/partner/update-hotel/id/${values.id}`, values, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('access'),
        },
      });
      // Handle success
      setServiceMenu("Hotel");
      setEditHotel(null);
    } catch (error) {
      console.error(error);
    }
  };

  const updateRestaurant = async (values) => {
    try {
      await axios.put(`https://hotel-management-backend-hb27.onrender.com/partner/update-restaurant/id/${values.id}`, values, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('access'),
        },
      });
      // Handle success
      setServiceMenu("Restaurant");
      setEditRestaurant(null);
    } catch (error) {
      console.error(error);
    }
  };

  const updateYacht = async (values) => {
    try {
      await axios.put(`https://hotel-management-backend-hb27.onrender.com/partner/update-yacht/id/${values.id}`, values, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('access'),
        },
      });
      // Handle success
      setServiceMenu("Yacht");
      setEditYacht(null);
    } catch (error) {
      console.error(error);
    }
  };

  const updatePrivateJet = async (values) => {
    try {
      await axios.put(`https://hotel-management-backend-hb27.onrender.com/partner/update-private-jet/id/${values.id}`, values, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('access'),
        },
      });
      // Handle success
      setServiceMenu("PrivateJet");
      setEditPrivateJet(null);
    } catch (error) {
      console.error(error);
    }
  };


  const deleteHotel = async () => {
    // Implement your delete logic here
    console.log("Delete Hotel:", selectedHotel);
    try {
      await axios.delete(`https://hotel-management-backend-hb27.onrender.com/partner/delete-hotel/id//${selectedHotel.id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('access'),
        },
      });
      // Refresh hotel list after deletion
      setHotels(hotels.filter(hotel => hotel.id !== selectedHotel.id));
      setSelectedHotel(null);
      setServiceMenu("Hotel");
    } catch (error) {
      console.error(error);
    }
  };
  const deleteRestaurant = async () => {
    // Implement your delete logic here
    console.log("Delete Restaurant:", selectedRestaurant);
    try {
      await axios.delete(`https://hotel-management-backend-hb27.onrender.com/partner/delete-restaurant/id/${selectedRestaurant.id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('access'),
        },
      });
      // Refresh restaurant list after deletion
      setRestaurants(restaurants.filter(restaurant => restaurant.id !== selectedRestaurant.id));
      setSelectedRestaurant(null);
      setServiceMenu("Restaurant");
    } catch (error) {
      console.error(error);
    }
  };
  const deleteYacht = async () => {
    // Implement your delete logic here
    console.log("Delete Yacht:", selectedYacht);
    try {
      await axios.delete(`https://hotel-management-backend-hb27.onrender.com/partner/delete-yacht/id/${selectedYacht.id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('access'),
        },
      });
      // Refresh yacht list after deletion
      setYachts(yachts.filter(yacht => yacht.id !== selectedYacht.id));
      setSelectedYacht(null);
      setServiceMenu("Yacht");
    } catch (error) {
      console.error(error);
    }
  };

  const deletePrivateJet = async () => {
    // Implement your delete logic here
    console.log("Delete Private Jet:", selectedPrivateJet);
    try {
      await axios.delete(`https://hotel-management-backend-hb27.onrender.com/partner/delete-privatejet/${selectedPrivateJet.id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('access'),
        },
      });
      // Refresh private jet list after deletion
      setPrivateJets(privateJets.filter(privateJet => privateJet.id !== selectedPrivateJet.id));
      setSelectedPrivateJet(null);
      setServiceMenu("PrivateJet");
    } catch (error) {
      console.error(error);
    }
  };

  const HotelUpdateForm = () => (
    <Formik
      initialValues={editHotel}
      validationSchema={Yup.object({
        hotelName: Yup.string().required('Required'),
        hotelDescription: Yup.string().required('Required'),
        // Add more validation as needed
      })}
      onSubmit={(values) => updateHotel(values)}
    >
      {({ errors, touched }) => (
        <FormikForm>
          <Form.Group controlId="hotelName">
            <Form.Label>Hotel Name</Form.Label>
            <Field name="hotelName" type="text" className="form-control" />
            {errors.hotelName && touched.hotelName ? (
              <div className="text-danger">{errors.hotelName}</div>
            ) : null}
          </Form.Group>
          <Form.Group controlId="hotelDescription">
            <Form.Label>Description</Form.Label>
            <Field name="hotelDescription" as="textarea" className="form-control" />
            {errors.hotelDescription && touched.hotelDescription ? (
              <div className="text-danger">{errors.hotelDescription}</div>
            ) : null}
          </Form.Group>
          <Button type="submit" variant="primary">Save</Button>
        </FormikForm>
      )}
    </Formik>
  );

  const RestaurantUpdateForm = () => (
    <Formik
      initialValues={editRestaurant}
      validationSchema={Yup.object({
        restaurantsName: Yup.string().required('Required'),
        restaurantsDescription: Yup.string().required('Required'),
        // Add more validation as needed
      })}
      onSubmit={(values) => updateRestaurant(values)}
    >
      {({ errors, touched }) => (
        <FormikForm>
          <Form.Group controlId="restaurantsName">
            <Form.Label>Restaurant Name</Form.Label>
            <Field name="restaurantsName" type="text" className="form-control" />
            {errors.restaurantsName && touched.restaurantsName ? (
              <div className="text-danger">{errors.restaurantsName}</div>
            ) : null}
          </Form.Group>
          <Form.Group controlId="restaurantsDescription">
            <Form.Label>Description</Form.Label>
            <Field name="restaurantsDescription" as="textarea" className="form-control" />
            {errors.restaurantsDescription && touched.restaurantsDescription ? (
              <div className="text-danger">{errors.restaurantsDescription}</div>
            ) : null}
          </Form.Group>
          <Button type="submit" variant="primary">Save</Button>
        </FormikForm>
      )}
    </Formik>
  );

  const YachtUpdateForm = () => (
    <Formik
      initialValues={editYacht}
      validationSchema={Yup.object({
        yachtName: Yup.string().required('Required'),
        yachtCapacity: Yup.number().required('Required'),
        // Add more validation as needed
      })}
      onSubmit={(values) => updateYacht(values)}
    >
      {({ errors, touched }) => (
        <FormikForm>
          <Form.Group controlId="yachtName">
            <Form.Label>Yacht Name</Form.Label>
            <Field name="yachtName" type="text" className="form-control" />
            {errors.yachtName && touched.yachtName ? (
              <div className="text-danger">{errors.yachtName}</div>
            ) : null}
          </Form.Group>
          <Form.Group controlId="yachtCapacity">
            <Form.Label>Capacity</Form.Label>
            <Field name="yachtCapacity" type="number" className="form-control" />
            {errors.yachtCapacity && touched.yachtCapacity ? (
              <div className="text-danger">{errors.yachtCapacity}</div>
            ) : null}
          </Form.Group>
          <Button type="submit" variant="primary">Save</Button>
        </FormikForm>
      )}
    </Formik>
  );

  const PrivateJetUpdateForm = () => (
    <Formik
      initialValues={editPrivateJet}
      validationSchema={Yup.object({
        privateJetModel: Yup.string().required('Required'),
        privateJetCapacity: Yup.number().required('Required'),
        // Add more validation as needed
      })}
      onSubmit={(values) => updatePrivateJet(values)}
    >
      {({ errors, touched }) => (
        <FormikForm>
          <Form.Group controlId="privateJetModel">
            <Form.Label>Model</Form.Label>
            <Field name="privateJetModel" type="text" className="form-control" />
            {errors.privateJetModel && touched.privateJetModel ? (
              <div className="text-danger">{errors.privateJetModel}</div>
            ) : null}
          </Form.Group>
          <Form.Group controlId="privateJetCapacity">
            <Form.Label>Capacity</Form.Label>
            <Field name="privateJetCapacity" type="number" className="form-control" />
            {errors.privateJetCapacity && touched.privateJetCapacity ? (
              <div className="text-danger">{errors.privateJetCapacity}</div>
            ) : null}
          </Form.Group>
          <Button type="submit" variant="primary">Save</Button>
        </FormikForm>
      )}
    </Formik>
  );

  const addRestaurant = (
    <Formik
      initialValues={{
        restaurantsName: '',
        restaurantsDescription: '',
        restaurantsLocation: '',
        ownerId: '',
        resturantRating: '',
      }}
      validationSchema={Yup.object().shape({
        restaurantsName: Yup.string().required('Restaurant Name is required'),
        restaurantsDescription: Yup.string(),
        restaurantsLocation: Yup.string(),
        ownerId: Yup.string().required('Owner ID is required'),
        resturantRating: Yup.number().required('Rating is required').min(1).max(5),
      })}
      onSubmit={async (values) => {
        try {
          await axios.post(`https://hotel-management-backend-hb27.onrender.com/partner/create-restaurant/${selectedHotel.id}/${localStorage.getItem('partnerId')}`, values, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('access'),
            },
          });
          // Update state as needed, for example:
          // setRestaurants([...restaurants, response.data]); // Assuming you want to add the new restaurant to the list
          setServiceMenu("Restaurant"); // Update serviceMenu to the appropriate value
        } catch (error) {
          console.error(error);
        }
      }}
    >
      {({ errors, touched }) => (
        <FormikForm>
          <Form.Group controlId="restaurantsName">
            <Form.Label>Restaurant Name</Form.Label>
            <Field name="restaurantsName" type="text" className="form-control" />
            {errors.restaurantsName && touched.restaurantsName ? (
              <div className="text-danger">{errors.restaurantsName}</div>
            ) : null}
          </Form.Group>
  
          <Form.Group controlId="restaurantsDescription">
            <Form.Label>Description</Form.Label>
            <Field name="restaurantsDescription" as="textarea" className="form-control" />
          </Form.Group>
  
          <Form.Group controlId="restaurantsLocation">
            <Form.Label>Location</Form.Label>
            <Field name="restaurantsLocation" type="text" className="form-control" />
          </Form.Group>
  
          <Form.Group controlId="ownerId">
            <Form.Label>Owner ID</Form.Label>
            <Field name="ownerId" type="text" className="form-control" />
            {errors.ownerId && touched.ownerId ? (
              <div className="text-danger">{errors.ownerId}</div>
            ) : null}
          </Form.Group>
  
          <Form.Group controlId="resturantRating">
            <Form.Label>Rating</Form.Label>
            <Field name="resturantRating" type="number" className="form-control" />
            {errors.resturantRating && touched.resturantRating ? (
              <div className="text-danger">{errors.resturantRating}</div>
            ) : null}
          </Form.Group>
  
          <Button type="submit" variant="primary">Save</Button>
        </FormikForm>
      )}
    </Formik>
  );
  
  
  
  const addRoom = (
    <Formik
      initialValues={{
        roomType: '',
        price: '',
        capacity: '',
        availability: false,
      }}
      validationSchema={Yup.object().shape({
        roomType: Yup.string().required('Mention Type'),
        price: Yup.number().required('Mention Price'),
        capacity: Yup.number().required('Mention Capacity'),
        availability: Yup.bool().required('Mention Availability'),
      })}
      onSubmit={async (values) => {
        try {
          await axios.post(`https://hotel-management-backend-hb27.onrender.com/partner/create-room/${selectedHotel.id}`, values, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('access'),
            },
          });
          // Update state as needed, for example:
          // setRooms([...rooms, response.data]); // Assuming you want to add the new room to the list
          setServiceMenu("Hotel"); // Update serviceMenu to the appropriate value
        } catch (error) {
          console.error(error);
        }
      }}
    >
      {({ errors, touched }) => (
        <FormikForm>
          <Form.Group controlId="roomType">
            <Form.Label>Room Type</Form.Label>
            <Field name="roomType" type="text" className="form-control" />
            {errors.roomType && touched.roomType ? (
              <div className="text-danger">{errors.roomType}</div>
            ) : null}
          </Form.Group>
  
          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Field name="price" type="number" className="form-control" />
            {errors.price && touched.price ? (
              <div className="text-danger">{errors.price}</div>
            ) : null}
          </Form.Group>
  
          <Form.Group controlId="capacity">
            <Form.Label>Capacity</Form.Label>
            <Field name="capacity" type="number" className="form-control" />
            {errors.capacity && touched.capacity ? (
              <div className="text-danger">{errors.capacity}</div>
            ) : null}
          </Form.Group>
  
          <Form.Group controlId="availability">
            <Form.Check
              type="checkbox"
              name="availability"
              label="Available"
              className="form-check-input"
            />
            {errors.availability && touched.availability ? (
              <div className="text-danger">{errors.availability}</div>
            ) : null}
          </Form.Group>
  
          <Button type="submit" variant="primary">Save</Button>
        </FormikForm>
      )}
    </Formik>
  );
  
  const LoadingSpinner = () => (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '30rem' }}>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );


  // Detail Components
  const HotelDetail = () => (
    <>
      <div className='d-flex justify-content-end'>
        <Button style={{ marginRight: "0.3rem" }} onClick={() => setServiceMenu("AddRestaurant")}>Add Restaurant</Button>
        <Button onClick={() => setServiceMenu("AddRoom")}>Add Rooms</Button>
      </div>
      <Card>
        <Card.Body>
          <Card.Title>{selectedHotel?.hotelName}</Card.Title>
          <Card.Text>{selectedHotel?.hotelDescription}</Card.Text>
          <Card.Text>{selectedHotel?.hotelLocation?.map(loc => <span key={loc.id}>{loc.city} </span>)}</Card.Text>
        </Card.Body>
      </Card>
      <div>
        <Button style={{ marginRight: "0.3rem" }} onClick={()=>{setEditHotel(selectedHotel);
                    setServiceMenu("HotelUpdateForm");}}>Update</Button>
        <Button className='btn-danger' onClick={deleteHotel}>Delete</Button>
      </div>
    </>
  );

  const RestaurantDetail = () => (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{selectedRestaurant?.restaurantsName}</Card.Title>
          <Card.Text>{selectedRestaurant?.restaurantsDescription}</Card.Text>
          <Card.Text>{selectedRestaurant?.restaurantsLocation}</Card.Text>
        </Card.Body>
      </Card>
      <div>
        <Button style={{ marginRight: "0.3rem" }} onClick={()=>{setEditRestaurant(selectedRestaurant);
                    setServiceMenu("RestaurantUpdateForm");}}>Update</Button>
        <Button className='btn-danger' onClick={deleteRestaurant}>Delete</Button>
      </div>
    </>
  );

  const YachtDetail = () => (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{selectedYacht?.yachtName}</Card.Title>
          <Card.Text>{selectedYacht?.yachtCapacity}</Card.Text>
        </Card.Body>
      </Card>
      <div>
        <Button style={{ marginRight: "0.3rem" }} onClick={()=>{setEditYacht(selectedYacht);
                    setServiceMenu("YachtUpdateForm");}}>Update</Button>
        <Button className='btn-danger' onClick={deleteYacht}>Delete</Button>
      </div>
    </>
  );

  const PrivateJetDetail = () => (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{selectedPrivateJet?.privateJetModel}</Card.Title>
          <Card.Text>Capacity: {selectedPrivateJet?.privateJetCapacity}</Card.Text>
        </Card.Body>
      </Card>
      <div>
        <Button style={{ marginRight: "0.3rem" }} onClick={()=>{setEditPrivateJet(selectedPrivateJet);
                    setServiceMenu("PrivateJetUpdateForm");}}>Update</Button>
        <Button className='btn-danger' onClick={deletePrivateJet}>Delete</Button>
      </div>
    </>
  );


  // Components for each service
  const HotelComponent = (
    <div className='mt-2'>
      <Row>
        {hotels.map((hotel) => (
          <Col xs={12} md={4} key={hotel.id}>
            <Card className='text-white bg-dark mt-1'>
              <Card.Body>
                <Card.Title>{hotel.hotelName}</Card.Title>
                <Card.Text>{hotel.hotelDescription}</Card.Text>
                <Card.Text>{hotel.hotelLocation.map(loc => <span key={loc.id}>{loc.city} </span>)}</Card.Text>
                <Button
                  onClick={() => {
                    setSelectedHotel(hotel);
                    setServiceMenu("HotelDetail");
                  }}
                  variant="primary"
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );

  const RestaurantComponent = (
    <div className='mt-2'>
      <Row>
        {restaurants.map((restaurant) => (
          <Col xs={12} md={4} key={restaurant.id}>
            <Card className='text-white bg-dark mt-1'>
              <Card.Body>
                <Card.Title>{restaurant.restaurantsName}</Card.Title>
                <Card.Text>{restaurant.restaurantsDescription}</Card.Text>
                <Card.Text>{restaurant.restaurantsLocation}</Card.Text>
                <Button
                  onClick={() => {
                    setSelectedRestaurant(restaurant);
                    setServiceMenu("RestaurantDetail");
                  }}
                  variant="primary"
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );

  const YachtComponent = (
    <div className='mt-2'>
      <Row>
        {yachts.map((yacht) => (
          <Col xs={12} md={4} key={yacht.id}>
            <Card className='text-white bg-dark mt-1'>
              <Card.Body>
                <Card.Title>{yacht.yachtName}</Card.Title>
                <Card.Text>{yacht.yachtCapacity}</Card.Text>
                <Button
                  onClick={() => {
                    setSelectedYacht(yacht);
                    setServiceMenu("YachtDetail");
                  }}
                  variant="primary"
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );

  const PrivateJetComponent = (
    <div className='mt-2'>
      <Row>
        {privateJets.map((privateJet) => (
          <Col xs={12} md={4} key={privateJet.id}>
            <Card className='text-white bg-dark mt-1'>
              <Card.Body>
                <Card.Title>{privateJet.privateJetModel}</Card.Title>
                <Card.Text>Capacity: {privateJet.privateJetCapacity}</Card.Text>
                <Button
                  onClick={() => {
                    setSelectedPrivateJet(privateJet);
                    setServiceMenu("PrivateJetDetail");
                  }}
                  variant="primary"
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );

  const ExistingComponent = (
    <>
       <div className='mb-3'>
        <Button variant='outline-light' className='rounded-pill me-2' onClick={() =>{setServiceMenu('Hotel'),setIsLoading(true)}}>
          <FaHotel /> Hotel
        </Button>
        <Button variant='outline-light' className='rounded-pill me-2' onClick={() => {setServiceMenu('Restaurant'),setIsLoading(true)}}>
          <FaUtensils /> Restaurant
        </Button>
        <Button variant='outline-light' className='rounded-pill me-2' onClick={() => {setServiceMenu('Yacht'),setIsLoading(true)}}>
          <FaShip /> Yacht
        </Button>
        <Button variant='outline-light' className='rounded-pill' onClick={() => {setServiceMenu('PrivateJet'),setIsLoading(true)}}>
          <FaPlane /> Private Jet
        </Button>
      </div>
      <div className='mt-2'>
      {serviceMenu === 'Hotel' && ( isLoading ? <LoadingSpinner /> : HotelComponent)}
        {serviceMenu === 'Restaurant' && ( isLoading ? <LoadingSpinner /> : RestaurantComponent)}
        {serviceMenu === 'Yacht' &&  ( isLoading ? <LoadingSpinner /> :YachtComponent)}
        {serviceMenu === 'PrivateJet' && ( isLoading ? <LoadingSpinner /> : PrivateJetComponent)}
        {serviceMenu === 'HotelDetail' && <HotelDetail />}
        {serviceMenu === 'RestaurantDetail' && <RestaurantDetail />}
        {serviceMenu === 'YachtDetail' && <YachtDetail />}
        {serviceMenu === 'PrivateJetDetail' && <PrivateJetDetail />}
        {serviceMenu === 'HotelUpdateForm' && <HotelUpdateForm/>}
        {serviceMenu === 'RestaurantUpdateForm' && <RestaurantUpdateForm/> }
        {serviceMenu === 'YachtUpdateForm' && <YachtUpdateForm/> }
        {serviceMenu === 'PrivateJetUpdateForm' && <PrivateJetUpdateForm />}
        {serviceMenu === 'AddRestaurant' && addRestaurant }
        {serviceMenu === 'AddRoom' && addRoom}
      </div>
    </>
  );
  const initialBookings = [
    { id: 1, customerName: "John Doe", serviceType: "Hotel", details: "Room 101", customerEmail: "john@example.com" },
    { id: 2, customerName: "Jane Smith", serviceType: "Restaurant", details: "Table 5", customerEmail: "jane@example.com" },
    { id: 3, customerName: "Bob Johnson", serviceType: "Yacht", details: "Yacht 300", customerEmail: "bob@example.com" },
    { id: 4, customerName: "Alice Brown", serviceType: "PrivateJet", details: "Jet 7A", customerEmail: "alice@example.com" },
  ];
  
  const BookingCard = ({ booking }) => {
    const handleEmailClick = () => {
      window.location.href = `mailto:${booking.customerEmail}?subject=Booking Details&body=Here are your booking details: ${booking.details}`;
    };
  
    return (
      <div>
        <h3>Booking ID: {booking.id}</h3>
        <p>Customer: {booking.customerName}</p>
        <p>Service: {booking.serviceType}</p>
        <p>Details: {booking.details}</p>
        <button onClick={handleEmailClick}>Send Email</button>
      </div>
    );
  };
  const CustomersComponent = () => {
    const [selectedService, setSelectedService] = useState("All");
    const [bookings, setBookings] = useState(initialBookings); // Replace with actual data fetching logic
    const [filteredBookings, setFilteredBookings] = useState(initialBookings);
  
    useEffect(() => {
      // Fetch logic for bookings can go here
      setFilteredBookings(bookings); // Initialize filtered bookings with all bookings
    }, [bookings]);
  
    const onServiceChange = (event) => {
      const service = event.target.value;
      setSelectedService(service);
      if (service === "All") {
        setFilteredBookings(bookings);
      } else {
        setFilteredBookings(bookings.filter((booking) => booking.serviceType === service));
      }
    };
  
    return (
      <div>
        <h2>Customer Bookings</h2>
        <div>
          <label htmlFor="service-filter">Filter by service: </label>
          <select id="service-filter" value={selectedService} onChange={onServiceChange}>
            <option value="All">All</option>
            <option value="Hotel">Hotel</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Yacht">Yacht</option>
            <option value="PrivateJet">Private Jet</option>
          </select>
        </div>
        <div>
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))
          ) : (
            <div>No bookings found.</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className='d-flex mb-4'>
        <Button variant='outline-light' className='rounded-pill' style={{ marginRight: "0.4rem" }} onClick={() => setToggleMainMenu('existing')}>
          Existing
        </Button>
        <Button variant='outline-light' className='rounded-pill' onClick={() => setToggleMainMenu('customers')}>
          Customers
        </Button>
      </div>
      <div>
        {toggleMainMenu === 'existing' ? ExistingComponent : <CustomersComponent/>}
      </div>
    </>
  );
}

export default Services;
