import React from 'react'
import { Row,Col, Container, Form ,Button} from 'react-bootstrap'
import InputGroup from 'react-bootstrap/InputGroup';
import { FaLocationArrow,FaPhone,FaEnvelope} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

function Footer() {
  const navigate=useNavigate();
  const partnerJoin=()=>{
  const currentUrl = localStorage.getItem('currentUrl');
    navigate('/partner-join', { state: { prvUrl: currentUrl } });
  }
  const date=()=>{}
  return (
    <Container fluid className='bg-dark ' >
      <Container className='p-4 'style={{borderBottom:"1px solid grey"}}>
      <Row>

        <Col className="text-center text-white">

          <Row>
            
            <Col sm={12} md={4}   className="text-center ">

              <Row>

                <Col md={3} lg={3} className=" d-flex justify-content-center align-items-center ">
                  <FaLocationArrow/>
                </Col>

                <Col md={9} lg={9}>
                  <h4>Find Us</h4>
                  <p>ITER,Bhubaneswar,Odisha</p>
                </Col>

              </Row>

            </Col>

            <Col  sm={12} md={4} >
             <Row>

             <Col md={3} lg={3}  className="  d-flex justify-content-center align-items-center">
                <FaPhone/>
                </Col>

                <Col md={9} lg={9} >
                  <h4>Call us</h4>
                  <span>9876543210 0</span>

                </Col>

              </Row>

            </Col>
            
            <Col  sm={12} md={4} >

             <Row>

             <Col md={3} lg={3}  className="text-center  d-flex justify-content-center align-items-center">
                 <FaEnvelope/>
                </Col>
                <Col md={9} lg={9} >
                  <h4>Mail us</h4>
                  <span>mail@info.com</span>

                </Col>

              </Row>

            </Col>

          </Row>
        </Col>

      </Row>
      </Container>

      <Container  className='p-3 'style={{borderBottom:"1px solid grey"}}>
      <Row>
       
          <Col  className=" text-white">
            <Row>
              <Col>

                <Row>
                 <Col className=' d-flex align-items-center'>
                 <img src="src\assets\Logo.png" alt="" className='' style={{height:"4rem",width:"12.9rem"}}/>
                 </Col>
                </Row>

                <Row>
                  <Col>
                    <p>
                    A name synonymous around the world for continual innovation, remarkable expansion and a single-minded dedication to the highest standards of service, discover how Celestial has transformed the hospitality industry and redefined the meaning of luxury travel since first opening its doors back in 1961.
                    </p>
                  </Col>
                </Row>
                
                <Row>

                  <Col>
                    <Row className='mt-3'>
                      <h4>Follow Us!</h4>
                    </Row>
                    <Row>
                      <Col className='mt-2'>
                          <i><img src="src\assets\favIcon\facebook-brands-solid.svg" alt="" className='img-fluid mx-1' style={{height:"2rem",width:"2rem"}}/></i>
                          <i><img src="src\assets\favIcon\linkedin-brands-solid.svg" alt="" className='img-fluid mx-1' style={{height:"2rem",width:"2rem"}}/></i>
                          <i><img src="src\assets\favIcon\instagram-brands-solid.svg" alt="" className="img-fluid mx-1" style={{height:"2rem",width:"1.9rem"}}/></i>
                      </Col>
                    </Row>
                  </Col>

                </Row>

              </Col>

            </Row>
          </Col>

          <Col>
          <Row>
            <Col>
             <Row>
               <h4 className='text-white'>Useful Links</h4>
             </Row>
             <Row>
                <Col>
                <ul className='list-unstyled decoration-none'>
                  <li><a href="#">Home</a></li>
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Contact Us</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Terms & Conditions</a></li>
                </ul>
                </Col>
             </Row>
            </Col>
          </Row>
          
          </Col>

          <Col>
            <Row>
              <Col>
                <h4 className='text-white'>Subscribe</h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className='text-white'>Don’t miss to subscribe to our new feeds, kindly fill the form below.</p>
                <InputGroup className="mb-3">
                <div className='border-bottom '>
                  <Form.Control
                     type="email"
                     id='inputID'
                    placeholder="Email Address"
                    className='bg-dark text-white placeholder-white border-0'
                     
                  />
                  </div>
                  <Button className='btn-dark'>
                    <img src="src\assets\favIcon\paper-plane-solid.svg" alt="" style={{height:"2rem", width:"2rem"}} />
                  </Button>
                </InputGroup>

              </Col>
            </Row>
          </Col>

       
      </Row>
      <Row className='text-white mt-2'>
        <Col className='d-flex' >
        <div>
        <h5>Join Our Partner Pogram</h5>
        </div>
        <div className='mx-3' onClick={partnerJoin}><button className='joinbtn'>Join</button></div>
        
        </Col>
      </Row>
      </Container >
      <Container className='p-3 text-white 'style={{borderBottom:"1px solid grey"}}>
        <Row style={{height:"2rem"}}>
          <p> Copyright &copy; {new Date().getFullYear()} , All Right Reserved PiratesSj</p>
        </Row>
        </Container>
    </Container>
  )
}

export default Footer
