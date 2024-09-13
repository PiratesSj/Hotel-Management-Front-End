import React,{useEffect}  from 'react'
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Layout from '../../components/Layout'
import { useLocation } from 'react-router-dom';
function Contact() {
  const location = useLocation();

  return (
    <Layout>
    <div className='text-white bg-black d-flex align-items-center  vh-100 '>
      Contact
    </div>
    </Layout>
  )
}

export default Contact
