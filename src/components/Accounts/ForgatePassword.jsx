// ForgatePassword Component
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as formik from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import Layout from '../Layout';

function ForgatePassword() {
    const { Formik } = formik;
    const navigate = useNavigate();
    const [change, setChange] = useState(false);
    const [time, setTime] = useState(10 * 60); // 10 minutes in seconds

    useEffect(() => {
        if (change) {
            const timer = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime <= 0) {
                        clearInterval(timer);
                        setChange(false);
                        return 0;
                    } else {
                        return prevTime - 1;
                    }
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [change]);

    const schemaForEmailForm = yup.object().shape({
        email: yup.string().email("Please Enter Valid Email").required("Required"),
    });

    const schema = yup.object().shape({
        otp: yup.string().required("Required").min(4),
    });

    const handleSubmitEmailForm = async (values, { setSubmitting }) => {
        try {
            const response = await axios.post('http://localhost:8080/public/resend-verificationCode', JSON.stringify(values.email), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data);
            if (response.status === 200) {
                setChange(true);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await axios.post('http://localhost:8080/public/verify', {
                otp: values.otp
            });

            console.log(response.data);
            if (response.status === 200) {
                navigate("/UpdatePassword", { state: { email: values.email } }); // Pass email as state
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    const emailForm = (
        <>
            <div className='margin_top'>
                <h2 className='text-white mt-5'>Enter your verification Register Email</h2>
            </div>
            <Formik
                validationSchema={schemaForEmailForm}
                initialValues={{
                    email: "",
                }}
                onSubmit={handleSubmitEmailForm}
            >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                    <Form noValidate onSubmit={handleSubmit} className='bg-black text-white'>
                        <Form.Group className='mb-3'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name='email'
                                value={values.email || ''}
                                onChange={handleChange}
                                className='rounded-pill h-75'
                                isValid={touched.email && !errors.email}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <div className='d-flex justify-content-center'>
                            <Button className='mt-2 rounded-pill w-75' type="submit">Send</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );

    const otpValidateForm = (
        <>
            <div className='margin_top'>
                <h2 className='text-white mt-5'>Enter your verification code</h2>
                <p className='text-white mt-3'>Enter the code we've emailed.</p>
            </div>
            <Formik
                validationSchema={schema}
                initialValues={{
                    otp: "",
                    email: "", // Add email field
                }}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                    <Form noValidate onSubmit={handleSubmit} className='bg-black text-white'>
                        <Form.Group className='mb-3'>
                            <Form.Label>OTP</Form.Label>
                            <Form.Control
                                type="text"
                                name='otp'
                                value={values.otp || ''}
                                onChange={handleChange}
                                className='rounded-pill h-75'
                                isValid={touched.otp && !errors.otp}
                                isInvalid={!!errors.otp}
                            />
                            <Form.Control.Feedback type="invalid">{errors.otp}</Form.Control.Feedback>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <div className='d-flex justify-content-center'>
                            <Button className='mt-2 rounded-pill w-75' type="submit">Verify</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );

    return (
        <Layout>
        <div className='bg-black d-flex justify-content-center align-items-center vh-100 vw-100'>
            <div className='m-5 vw-75'>
                {change ? otpValidateForm : emailForm}
            </div>
        </div>
        </Layout>
    );
}

export default ForgatePassword;
