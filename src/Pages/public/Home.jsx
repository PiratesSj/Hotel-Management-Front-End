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
      <img src="https://ak-d.tripcdn.com/images/0202q120008m1pn09B45C_R_1600_800_R5_Q70.webp" className ="img-fluid" alt="<h1>Hotels near Red Ruby in Bali</h1>"></img>
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
