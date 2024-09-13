import React,{useEffect}  from 'react'
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Layout from '../../components/Layout'
import { useLocation } from 'react-router-dom';
function Restaurant() {
  
  return (
    <Layout>
    <div className='bg-dark vh-100 d-flex align-items-center text-white bg-black '>
      <div className='  '>
       Restaurant
      </div>
    </div>
    </Layout>
  )
}

export default Restaurant
