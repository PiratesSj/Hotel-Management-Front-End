import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../Layout';

function OtpVerification() {
    const [reotp, setReotp] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const location = useLocation();
    const email = location.state?.email || ''; 
    const prvUrl = location.state?.prvUrl || ''; 
    const navigate = useNavigate();
    const [isResendActive, setIsResendActive] = useState(true);
    const [time, setTime] = useState(6); // Set this to 60 for production

    const schema = yup.object().shape({
        otp: yup.string().required("Required").min(4),
    });

    useEffect(() => {
        let timer;
        if (isResendActive) {
            timer = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime === 0) {
                        clearInterval(timer);
                        setIsResendActive(false);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [isResendActive]);

    const handleResend = async () => {
        try {
            setErrorMessage(""); // Clear any previous error messages
            const response = await axios.post('https://hotel-management-backend-hb27.onrender.com/public/resend-verificationCode',  email , {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(response.data);
            setTime(60); // Reset the timer to 60 for production
            setIsResendActive(true);
        } catch (error) {
            console.error(error);
            setErrorMessage("Failed to resend OTP. Please try again.");
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            setErrorMessage(""); // Clear any previous error messages
            const response = await axios.post('https://hotel-management-backend-hb27.onrender.com/public/verify', {
                otp: values.otp
            });

            console.log(response.data);
            if (response.status === 200) {
                setReotp(values.otp);
                navigate("/login", { state: { prvUrl } });
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("OTP verification failed. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Layout>
            <div className='bg-black d-flex justify-content-center align-items-center vh-100 vw-100'>
                <div className='m-5 vw-75'>
                    <div className='margin_top'>
                        <h2 className='text-white mt-5'>Enter your verification code</h2>
                        <p className='text-white mt-3'>Enter the code we've emailed.</p>
                    </div>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <Formik
                        validationSchema={schema}
                        initialValues={{
                            otp: ""
                        }}
                        onSubmit={handleSubmit}
                    >
                        {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
                            <Form noValidate onSubmit={handleSubmit} className='bg-black text-white'>
                                <Form.Group className='mb-3'>
                                    <Form.Label>OTP</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name='otp'
                                        value={values.otp}
                                        onChange={handleChange}
                                        className='rounded-pill h-75'
                                        isValid={touched.otp && !errors.otp}
                                        isInvalid={!!errors.otp}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.otp}</Form.Control.Feedback>
                                </Form.Group>
                                <Row className='mt-3'>
                                    <Col className='d-flex justify-content-center'>
                                        {isResendActive
                                            ? <div>{formatTime(time)}</div>
                                            : <Button id='b' className='resend' onClick={handleResend}>Resend</Button>
                                        }
                                    </Col>
                                </Row>
                                <div className='d-flex justify-content-center'>
                                    <Button className='mt-2 rounded-pill w-75' type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? "Verifying..." : "Verify"}
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </Layout>
    );
}

export default OtpVerification;
