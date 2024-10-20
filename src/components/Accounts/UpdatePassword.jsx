// UpdatePassword Component
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../Layout';

function UpdatePassword() {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email; // Retrieve email from location state

    const passwordRule = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const schema = yup.object().shape({
        UpdatePassword: yup.string().min(5).matches(passwordRule, { message: "Please Put correct password" }).required("Required"),
        ReUpdatePassword: yup.string().required().oneOf([yup.ref('UpdatePassword'), null], 'Passwords must match').required("Required"),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await axios.put('https://hotel-management-backend-hb27.onrender.com/public/update-password', {
                email: email, // Send the email along with the password
                password: values.UpdatePassword
            });

            console.log(response.data);
            if (response.status === 200) {
                navigate("/LogIn");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Layout>
        <div className='bg-black d-flex justify-content-center align-items-center vh-100 vw-100'>
            <div className='m-5 vw-75'>
                <div className='margin_top'>
                    <h2 className='text-white mt-5'>Change Your Password</h2>
                </div>
                <Formik
                    validationSchema={schema}
                    initialValues={{
                        UpdatePassword: "",
                        ReUpdatePassword: ""
                    }}
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                        <Form noValidate onSubmit={handleSubmit} className='bg-black text-white'>
                            <Form.Group className='mb-3'>
                                <Form.Label>New Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name='UpdatePassword'
                                    value={values.UpdatePassword}
                                    onChange={handleChange}
                                    className='rounded-pill h-75'
                                    isValid={touched.UpdatePassword && !errors.UpdatePassword}
                                    isInvalid={!!errors.UpdatePassword}
                                />
                                <Form.Control.Feedback type="invalid">{errors.UpdatePassword}</Form.Control.Feedback>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Re-Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name='ReUpdatePassword'
                                    value={values.ReUpdatePassword}
                                    onChange={handleChange}
                                    className='rounded-pill h-75'
                                    isValid={touched.ReUpdatePassword && !errors.ReUpdatePassword}
                                    isInvalid={!!errors.ReUpdatePassword}
                                />
                                <Form.Control.Feedback type="invalid">{errors.ReUpdatePassword}</Form.Control.Feedback>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>

                            <div className='d-flex justify-content-center'>
                                <Button className='mt-2 rounded-pill w-75' type="submit">Update Password</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
        </Layout>
    );
}

export default UpdatePassword;
