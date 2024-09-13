import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Layout from '../Layout';

const passwordRule = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

function Loginform() {
  const navigate = useNavigate();
  const location = useLocation();
  const prvUrl = location.state?.prvUrl || ''; 

  const schema = yup.object().shape({
    email: yup.string().email("Please Enter a Valid Email").required("Required"),
    password: yup.string().min(8).matches(passwordRule, { message: "Password must contain at least 8 characters, including letters and numbers" }).required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await axios.post('http://localhost:8080/public/log-in', {
        userName: values.email,
        password: values.password,
      });

      if (response.status === 200) {
        localStorage.setItem('access', response.data);
        localStorage.setItem('email', values.email);
        

        const roleResponse = await axios.get(`http://localhost:8080/user/get-detail/${values.email}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('access'),
          },
        });

        if (roleResponse.status === 200) {
          const role = roleResponse.data.roles[0];
          localStorage.setItem('firstName', roleResponse.data.firstName);
          localStorage.setItem('userId',roleResponse.data.id);
          localStorage.setItem("isLogged", "true");

          if (role === "ADMIN") {
           
            navigate('/admin');
          } else if (role === "PARTNER") {
            navigate('/partner');
          } else if (role === "USER") {
            const previousUrl = prvUrl || localStorage.getItem('previousUrl') || '/';
            navigate(previousUrl === 'null' ? '/' : previousUrl);
          }
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setFieldError("email", "Invalid credentials or an error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  const signUp = () => {
    const prv = localStorage.getItem('previousUrl');
    navigate('/signup', { state: { prvUrl: prv } });
  };

  return (
    <Layout>
      <div className='bg-black d-flex justify-content-center align-items-center vh-100 vw-100'>
        <div className='w-sm-50 mt-4 glass rounded p-5  '>
          <div className=''>
            <h2 className='text-white mt-5'>Welcome Back!</h2>
            <h3 className='text-white mt-3'>Please Enter Login Details</h3>
          </div>
          <Formik
            validationSchema={schema}
            initialValues={{
              email: '',
              password: ''
            }}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
              <Form noValidate onSubmit={handleSubmit} className=' text-white'>
                <Form.Group className='mb-3'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                    className='rounded-pill h-75'
                    isValid={touched.email && !errors.email}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    className='rounded-pill h-75'
                    isValid={touched.password && !errors.password}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>
                <Row className='mb-3'>
                  <Col><Link to={"/forgotPassword"}><span>Forgot Password?</span></Link></Col>
                </Row>
                <div className='d-flex justify-content-center'>
                  <Button className='mt-2 rounded-pill w-75' type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Logging in..." : "Log In"}
                  </Button>
                </div>
                <div className='text-center mt-3'><p>Or</p></div>
                <Row>
                  <Col className='d-flex justify-content-center'>
                    <Button onClick={signUp} className='btn btn-light rounded-pill'>
                      <span className='mx-auto text-dark'>Sign Up</span>
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
}

export default Loginform;
