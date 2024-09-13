import React from 'react';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { Col, Container,Row } from 'react-bootstrap'
import "../../index.css"

function Section1() {

  return (
    <Container fluid className='welcome vw-100 vh-25'>
     <Row className='h-100 '>
      <Col className='d-flex align-items-center'>
        <div>
          <h1 className="text-center">Welcome to Celestial</h1>
        </div>
      </Col>
      <Col>
      </Col>
     </Row>
    </Container>
  )
}

export default Section1
