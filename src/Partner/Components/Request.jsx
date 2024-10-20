import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';

const Request = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedService, setSelectedService] = useState('');

  const handleSubmitHotel = async (values) => {
    console.log('Hotel submission triggered with values:', values); // Debugging log
    try {
      const response = await axios.post(
        `https://hotel-management-backend-hb27.onrender.com/partner/create-hotel/id/${localStorage.getItem('partnerId')}`,
        values, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('access'),
          },
        }
      );
      console.log('Response:', response); // Debugging log
      setSuccessMessage('Hotel request created successfully!');
      setErrorMessage('');
    } catch (error) {
      // Improved error handling
      console.error('Error creating hotel request:', error.response?.data || error.message || error);
      setErrorMessage('Failed to create hotel request. Please try again.');
    }
  };
  

  const handleSubmitYacht = async (values) => {
    console.log('Yacht submission triggered with values:', values); // Debugging log
    try {
      const response = await axios.post('/api/yacht/create', values);
      console.log('Response:', response); // Debugging log
      setSuccessMessage('Yacht request created successfully!');
      setErrorMessage('');
    } catch (error) {
      console.error('Error creating yacht request:', error.response); // Debugging log
      setErrorMessage('Failed to create yacht request. Please try again.');
    }
  };

  const handleSubmitPrivateJet = async (values) => {
    console.log('Private Jet submission triggered with values:', values); // Debugging log
    try {
      const response = await axios.post('/api/privatejet/create', values);
      console.log('Response:', response); // Debugging log
      setSuccessMessage('Private Jet request created successfully!');
      setErrorMessage('');
    } catch (error) {
      console.error('Error creating private jet request:', error.response); // Debugging log
      setErrorMessage('Failed to create private jet request. Please try again.');
    }
  };

  const hotelSchema = Yup.object().shape({
    hotelName: Yup.string().required('Hotel name is required'),
    hotelLocation: Yup.array()
      .of(
        Yup.object().shape({
          city: Yup.string().required('City is required'),
          state: Yup.string().required('State is required'),
          pin: Yup.string().required('PIN code is required'),
          country: Yup.string().required('Country is required'),
        })
      )
      .required('Hotel location is required')
      .min(1, 'At least one location is required'),
    hotelDescription: Yup.string(),
  });

  const yachtSchema = Yup.object().shape({
    yachtName: Yup.string().required('Yacht name is required'),
    yachtCapacity: Yup.number().required('Yacht capacity is required'),
    yachtOwnerId: Yup.string().required('Yacht owner ID is required'),
  });

  const privateJetSchema = Yup.object().shape({
    jetName: Yup.string().required('Private Jet name is required'),
    jetCapacity: Yup.number().required('Private Jet capacity is required'),
    jetOwnerId: Yup.string().required('Private Jet owner ID is required'),
  });

  return (
    <div className="container serviceRequestBar" style={{ minHeight: '100vh', overflow: 'hidden', overflowY: 'auto' }}>
      <h1 className="mb-4">
        Create {selectedService === '' ? <span>Service</span> : selectedService} Request
      </h1>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <div className="mb-3">
        <label htmlFor="serviceSelect" className="form-label">
          Select Service
        </label>
        <select id="serviceSelect" className="form-select" onChange={(e) => setSelectedService(e.target.value)}>
          <option value="">Select Service</option>
          <option value="Hotel">Hotel</option>
          <option value="Yacht">Yacht</option>
          <option value="PrivateJet">Private Jet</option>
        </select>
      </div>

      <div style={{ maxHeight: '70vh' }} className="serviceRequestBar">
        {selectedService === 'Hotel' && (
          <Formik
            initialValues={{
              hotelName: '',
              hotelLocation: [
                {
                  city: '',
                  state: '',
                  pin: '',
                  country: '',
                },
              ],
              hotelDescription: '',
            }}
            validationSchema={hotelSchema}
            onSubmit={handleSubmitHotel}
          >
            {({ values }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="hotelName" className="form-label">
                    Hotel Name
                  </label>
                  <Field name="hotelName" type="text" className="form-control" placeholder="Hotel Name" />
                </div>
                <FieldArray name="hotelLocation">
                  {({ push, remove }) => (
                    <>
                      {values.hotelLocation.length > 0 ? (
                        values.hotelLocation.map((location, index) => (
                          <div key={index} className="mb-3">
                            <h5>Location {index + 1}</h5>
                            <div className="mb-3">
                              <label htmlFor={`hotelLocation[${index}].city`} className="form-label">
                                City
                              </label>
                              <Field
                                name={`hotelLocation[${index}].city`}
                                type="text"
                                className="form-control"
                                placeholder="City"
                              />
                            </div>
                            <div className="mb-3">
                              <label htmlFor={`hotelLocation[${index}].state`} className="form-label">
                                State
                              </label>
                              <Field
                                name={`hotelLocation[${index}].state`}
                                type="text"
                                className="form-control"
                                placeholder="State"
                              />
                            </div>
                            <div className="mb-3">
                              <label htmlFor={`hotelLocation[${index}].pin`} className="form-label">
                                PIN
                              </label>
                              <Field
                                name={`hotelLocation[${index}].pin`}
                                type="text"
                                className="form-control"
                                placeholder="PIN"
                              />
                            </div>
                            <div className="mb-3">
                              <label htmlFor={`hotelLocation[${index}].country`} className="form-label">
                                Country
                              </label>
                              <Field
                                name={`hotelLocation[${index}].country`}
                                type="text"
                                className="form-control"
                                placeholder="Country"
                              />
                            </div>
                            <div className="d-flex justify-content-between">
                              <button type="button" className="btn btn-danger" onClick={() => remove(index)}>
                                Remove Location
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => push({ city: '', state: '', pin: '', country: '' })}
                              >
                                Add Another Location
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => push({ city: '', state: '', pin: '', country: '' })}
                        >
                          Add Location
                        </button>
                      )}
                    </>
                  )}
                </FieldArray>
                <div className="mb-3">
                  <label htmlFor="hotelDescription" className="form-label">
                    Description
                  </label>
                  <Field name="hotelDescription" type="text" className="form-control" placeholder="Description" />
                </div>

                <button type="submit" className="btn btn-success mt-4">
                  Submit Hotel Request
                </button>
              </Form>
            )}
          </Formik>
        )}

        {selectedService === 'Yacht' && (
          <Formik
            initialValues={{
              yachtName: '',
              yachtCapacity: '',
              yachtOwnerId: '',
            }}
            validationSchema={yachtSchema}
            onSubmit={handleSubmitYacht}
          >
            {() => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="yachtName" className="form-label">
                    Yacht Name
                  </label>
                  <Field name="yachtName" type="text" className="form-control" placeholder="Yacht Name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="yachtCapacity" className="form-label">
                    Yacht Capacity
                  </label>
                  <Field name="yachtCapacity" type="number" className="form-control" placeholder="Yacht Capacity" />
                </div>
                <div className="mb-3">
                  <label htmlFor="yachtOwnerId" className="form-label">
                    Yacht Owner ID
                  </label>
                  <Field name="yachtOwnerId" type="text" className="form-control" placeholder="Yacht Owner ID" />
                </div>

                <button type="submit" className="btn btn-success mt-4">
                  Submit Yacht Request
                </button>
              </Form>
            )}
          </Formik>
        )}

        {selectedService === 'PrivateJet' && (
          <Formik
            initialValues={{
              jetName: '',
              jetCapacity: '',
              jetOwnerId: '',
            }}
            validationSchema={privateJetSchema}
            onSubmit={handleSubmitPrivateJet}
          >
            {() => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="jetName" className="form-label">
                    Private Jet Name
                  </label>
                  <Field name="jetName" type="text" className="form-control" placeholder="Private Jet Name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="jetCapacity" className="form-label">
                    Jet Capacity
                  </label>
                  <Field name="jetCapacity" type="number" className="form-control" placeholder="Jet Capacity" />
                </div>
                <div className="mb-3">
                  <label htmlFor="jetOwnerId" className="form-label">
                    Jet Owner ID
                  </label>
                  <Field name="jetOwnerId" type="text" className="form-control" placeholder="Jet Owner ID" />
                </div>

                <button type="submit" className="btn btn-success mt-4">
                  Submit Private Jet Request
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default Request;
