import React,{useEffect} from 'react'
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../../index.css"
import Section1 from '../../components/home/Section1';
import SectionRestro from "../../components/home/SectionRestro"
import SectionFlight from '../../components/home/SectionFlight';
import SectionYatch from '../../components/home/SectionYatch';
import SectionHotel from '../../components/home/SectionHotel';
import Layout from '../../components/Layout';
import { useLocation } from 'react-router-dom';

function Home() {
  const location = useLocation();
  
  return (
    <> 
    <Layout>
      <div className='video vh-100' style={{filter: "brightness(75%)"}}> 
        <img src="src\assets\roberto-nickson-MA82mPIZeGI-unsplash.jpg" alt="" className='img-fluid'/>
     </div>
      {/* <h1>Valid comment</h1> */}
     <Section1/>
     <SectionHotel/>
     <SectionRestro />
     <SectionFlight/>
     <SectionYatch/>
     </Layout>
    </>
  )
}

export default Home
