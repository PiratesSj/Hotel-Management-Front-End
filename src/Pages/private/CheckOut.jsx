import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Initialize Stripe with your public key
const stripePromise = loadStripe('pk_test_51Po7ym083edawwVxWlyg0Ui6rWyjvmjqMuiXY3851MuDgJeZnu9YNY2HNX75u9viViH6R1yHoAuOugMb8m6Zok3K00UGSPNCAm');

const CheckoutForm = ({ hotel, room, formData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!stripe || !elements) {
      setError('Stripe.js has not loaded yet.');
      setLoading(false);
      return;
    }

    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (stripeError) {
      setError(stripeError.message);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('https://hotel-management-backend-hb27.onrender.com/api/checkout', {
        paymentMethodId: paymentMethod.id,
        hotel,
        room,
        formData
      });

      if (response.status === 200) {
        setSuccess('Payment successful!');
      } else {
        setError('Payment failed.');
      }
    } catch (error) {
      setError('Payment failed. Please try again.');
    }

    setLoading(false);
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8} className="mx-auto">
          <h2>Checkout</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="card">
              <Form.Label>Card details</Form.Label>
              <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
            </Form.Group>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Processing…' : 'Pay Now'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

const CheckOut = () => {
  const location = useLocation();
  const { hotel, room, formData } = location.state || {};

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm hotel={hotel} room={room} formData={formData} />
    </Elements>
  );
};

export default CheckOut;
