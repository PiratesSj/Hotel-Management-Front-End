import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
const PrivateRoutes = () => {
   const isLogged= localStorage.getItem("isLogged");
return (
    isLogged ? <Outlet/> : <Navigate to='/login'/>
  )
}
export default PrivateRoutes
