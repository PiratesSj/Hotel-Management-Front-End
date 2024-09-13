import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Button, Card } from 'react-bootstrap';

function Request() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/admin/get-All-Requests', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
          },
        });
        if (response.status === 200) {
          
          setRequests(response.data);
          console.log(response.data);
          
          
        }
      } catch (error) {
        console.error('Failed to fetch requests:', error);
      }
    };

    fetchData();
  }, []);

  const handleAccept = async (type, requestId) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/admin/accept-Request/${type}/${requestId}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
          },
        }
      );
      if (response.status === 200) {
        setRequests(requests.filter(request => request.id !== requestId));
      }
    } catch (error) {
      console.error('Failed to accept request:', error);
    }
  };

  const handleDeny = async (type, requestId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/admin/deny-Request/${type}/${requestId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
          },
        }
      );
      if (response.status === 200) {
        setRequests(requests.filter(request => request.id !== requestId));
      }
    } catch (error) {
      console.error('Failed to deny request:', error);
    }
  };

  return (
    
    <div className="container mt-4 bg-black"  >
      <h1>Admin Request Page</h1>
      {requests.length === 0 ? (
        <p>No requests available</p>
      ) : (
        <Row>
          {requests.map(request => (
            <Col key={request.id} sm={12} md={6} lg={4} className="mb-4">
              <Card className="p-3">
                <Card.Body>
                  <Card.Title>Request Type: {request.type}</Card.Title>

                  {/* Partner Requests */}
                  {request.type === 'Partner' && request.partner && request.partner.map(partner => (
                    <div key={partner.id}>
                      <h5>Company Name: {partner.companyName}</h5>
                      <p>Address: {partner.companyAddress}</p>
                      <p>Contact Number: {partner.contactNumber}</p>
                      <div>
                        <h6>User Details:</h6>
                        <p>Name: {partner.user ? partner.user.name : 'N/A'}</p>
                        <p>Email: {partner.user ? partner.user.email : 'N/A'}</p>
                        <p>Phone: {partner.user ? partner.user.phone : 'N/A'}</p>
                      </div>
                    </div>
                  ))}

                  {/* Hotel Requests */}
                  {request.type === 'Hotel' && request.hotel ? (
  request.hotel.length > 0 ? (
    request.hotel.map(hotel => (
      <div key={hotel.id}>
        <h5>Hotel Name: {hotel.hotelName}</h5>
        <p>Description: {hotel.hotelDescription}</p>
        <p>Owner: {hotel.hotelOwnerName}</p>
        <p>Rating: {hotel.hotelRating}</p>
        <p>
          Locations: {hotel.hotelLocation && hotel.hotelLocation.length > 0
            ? hotel.hotelLocation.map(loc => `${loc.city}, ${loc.state}, ${loc.country}`).join(', ')
            : 'N/A'}
        </p>
      </div>
    ))
  ) : (
    <p>No hotels available</p>
  )
) : (
  <p>Not a Hotel request or no hotel data available</p>
)}

                  {/* Yacht Requests */}
                  {request.type === 'Yacht' && request.yacht && request.yacht.map(yacht => (
                    <div key={yacht.id}>
                      <h5>Yacht Name: {yacht.yachtName}</h5>
                      <p>Capacity: {yacht.yachtCapacity}</p>
                      <p>Owner: {yacht.yachtOwner}</p>
                      <p>Status: {yacht.yachtStatus ? 'Available' : 'Unavailable'}</p>
                      <p>Rating: {yacht.yachtRating}</p>
                    </div>
                  ))}

                  {/* Private Jet Requests */}
                  {request.type === 'PrivateJet' && request.privateJet && request.privateJet.map(jet => (
                    <div key={jet.id}>
                      <h5>Jet Model: {jet.privateJetModel}</h5>
                      <p>Capacity: {jet.privateJetCapacity}</p>
                      <p>Owner: {jet.privateJetOwner}</p>
                      <p>Status: {jet.privateJetStatus ? 'Available' : 'Unavailable'}</p>
                      <p>Rating: {jet.privateJetRating}</p>
                    </div>
                  ))}

                  <div className="d-flex justify-content-between mt-3">
                    <Button variant="success" onClick={() => handleAccept(request.type, request.id)}>Accept</Button>
                    <Button variant="danger" onClick={() => handleDeny(request.type, request.id)}>Deny</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default Request;
