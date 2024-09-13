import React,{useEffect}  from 'react'
import "./../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Layout from '../../components/Layout'
import { useLocation } from 'react-router-dom';
function About() {
  const location = useLocation();

  return (
    <Layout>
    <div className='bg-dark  text-white bg-black vh-100 d-flex align-items-center'>
      About
    </div>
    </Layout>
  )
}

export default About
