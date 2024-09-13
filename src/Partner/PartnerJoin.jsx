import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as formik from 'formik';
import { Link } from "react-router-dom";
import * as yup from 'yup';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useLocation } from 'react-router-dom';

function PartnerJoin() {
  const { Formik } = formik;
  const passwordRule = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const navigate = useNavigate();
  const location = useLocation();
  const prvUrl = location.state?.prvUrl || '';

  const schema = yup.object().shape({
    email: yup.string().email("Please Enter Valid Email").required("Required"),
    password: yup.string().min(5).matches(passwordRule, { message: "Please Put correct password" }).required("Required"),
    confirmPassword: yup.string().required().oneOf([yup.ref('password'), null], 'Passwords must match').required("Required"),
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    phone: yup.string().matches(/^[0-9]+$/, "Must be only digits").required("Required"),
    companyName: yup.string().required("Required"),
    companyAddress: yup.string().required("Required"),
  });

  const registPartner = async (values, user) => {
    try {
     
  
      const response = await axios.post(`http://localhost:8080/public/Register-partner`, {
        companyName: values.companyName,
        companyAddress: values.companyAddress,
        contactNumber: values.phone,
        user: user
      });
  
      if (response.status === 200) {
        navigate("/OtpVerification", { state: { email: values.email, prvUrl } });
      }
    } catch (error) {
      console.error("Partner registration error:", error);
    }
  };
  
  

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('http://localhost:8080/public/sign-up', {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
      });

      if (response.status === 200) {
        console.log("Response ID:", response.data);
        
        
        const user = response.data;
       
      
        // Assuming the user ID is returned as 'id'
        await registPartner(values, user);
      }
    } catch (error) {
      console.error("User registration error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className='bg-black d-flex justify-content-center align-items-center vw-100'>
        <div className='w-m-50 rounded glass my-5 px-5 '>
          <div className='mt-5'>
            <h2 className='text-white'>Welcome To Our Partner Program</h2>
            <h3 className='text-white'>Please Enter Your Details</h3>
          </div>
          <Formik
            initialValues={{
              email: '',
              password: '',
              confirmPassword: '',
              firstName: '',
              lastName: '',
              phone: '',
              companyName: '',
              companyAddress: '',
            }}
            validationSchema={schema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, handleChange, handleSubmit, touched, isSubmitting }) => (
              <>
                <div>
                  <Form noValidate onSubmit={handleSubmit} className='text-white'>
                    <Row>
                      <Form.Group as={Col} className='mb-3'>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          value={values.firstName}
                          onChange={handleChange}
                          isValid={touched.firstName && !errors.firstName}
                          className='rounded-pill'
                          isInvalid={!!errors.firstName}
                        />
                        <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                        <Form.Control.Feedback>Good to go</Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} className='mb-3'>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="lastName"
                          value={values.lastName}
                          onChange={handleChange}
                          isValid={touched.lastName && !errors.lastName}
                          className='rounded-pill'
                          isInvalid={!!errors.lastName}
                        />
                        <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                        <Form.Control.Feedback>Good to go</Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Form.Group className='mb-3'>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name='email'
                        value={values.email}
                        className='rounded-pill'
                        onChange={handleChange}
                        isValid={touched.email && !errors.email}
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        className='rounded-pill'
                        isValid={touched.password && !errors.password}
                        isInvalid={!!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                      <Form.Control.Feedback>Good to go</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        className='rounded-pill'
                        value={values.confirmPassword}
                        onChange={handleChange}
                        isValid={touched.confirmPassword && !errors.confirmPassword}
                        isInvalid={!!errors.confirmPassword}
                      />
                      <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                      <Form.Control.Feedback>Good to go</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                        className='rounded-pill'
                        isValid={touched.phone && !errors.phone}
                        isInvalid={!!errors.phone}
                      />
                      <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                      <Form.Control.Feedback>Good to go</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                      <Form.Label>Company Name</Form.Label>
                      <Form.Control
                        type="text"
                        name='companyName'
                        value={values.companyName}
                        className='rounded-pill'
                        onChange={handleChange}
                        isValid={touched.companyName && !errors.companyName}
                        isInvalid={!!errors.companyName}
                      />
                      <Form.Control.Feedback type="invalid">{errors.companyName}</Form.Control.Feedback>
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                      <Form.Label>Company Address</Form.Label>
                      <Form.Control
                        type="text"
                        name="companyAddress"
                        value={values.companyAddress}
                        onChange={handleChange}
                        className='rounded-pill'
                        isValid={touched.companyAddress && !errors.companyAddress}
                        isInvalid={!!errors.companyAddress}
                      />
                      <Form.Control.Feedback type="invalid">{errors.companyAddress}</Form.Control.Feedback>
                      <Form.Control.Feedback>Good to go</Form.Control.Feedback>
                    </Form.Group>
                    <div className='d-flex justify-content-center'>
                      <Button className='mt-2 mb-5 w-75 text-center rounded-pill' type="submit" disabled={isSubmitting}>Request</Button>
                    </div>
                  </Form>
                </div>
              </>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
}

export default PartnerJoin;
