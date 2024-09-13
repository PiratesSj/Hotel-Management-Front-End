import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';

import "./../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Layout from '../components/Layout';
function Booking() {
  const { Formik } = formik;

  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    username: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    zip: yup.string().required(),
    terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
  });

  return (
   <Layout>
    <Formik
      validationSchema={schema}
      onSubmit={console.log}
      initialValues={{
        babies:"",
        checkIn: '',
        adults: '',
        checkOut: '',
        
        
      }}
       
      
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <div className='vw-100 vh-100 d-flex justify-content-center align-items-center  bg-black flex-column'>
          <div>
            <h2 className='text-white'>Online Booking</h2>
          </div>
        <Form noValidate onSubmit={handleSubmit} className='d-flex flex-column w-50' >
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom01" className='text-white  '>
              <Form.Label>Arival</Form.Label>
              <Form.Control
              type="date"
              placeholder="Check In"
              name="checkIn"
              value={values.checkIn}
              onChange={handleChange}
              isInvalid={!!errors.checkIn}
              className='rounded-pill h-75'
              />
              <Form.Control.Feedback type="invalid">nice</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom02" className='text-white'>
                <Form.Label>Deparature</Form.Label>
                <Form.Control
                type="date"
                placeholder="Check Out"
                name="checkOut"
                value={values.checkOut}
                onChange={handleChange}
                isInvalid={!!errors.checkOut}
                className='rounded-pill h-75'
                />
                <Form.Control.Feedback type="invalid">nice</Form.Control.Feedback>
            </Form.Group>
          </Row>
         
            <Form.Group  md="12" controlId="validationFormik01" className='text-white'>
              <Form.Label>Adults</Form.Label>
              <Form.Control
                type="number"
                name="adults"
                placeholder="No. Of Adults"
                value={values.adults}
                onChange={handleChange}
                isValid={touched.adults && !errors.adults}
                className='rounded-pill h-75'
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group  md="4" controlId="validationFormik02" className='text-white mt-3'>
              <Form.Label>Babies</Form.Label>
              <Form.Control
                type="number"
                name="babies"
                placeholder="No. Of Babies"
                value={values.babies}
                onChange={handleChange}
                isValid={touched.babies && !errors.babies}
                className='rounded-pill h-75'
              />

              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          
         
         
          
          <Button type="submit" className='w-50 mt-5 align-self-center rounded-pill h-75'>Submit form</Button>
        </Form>
        </div>
      )}
    </Formik>
    </Layout>
  );
}

export default Booking
