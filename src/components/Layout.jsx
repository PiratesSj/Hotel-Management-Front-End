import React from 'react'
import Navbarh from './Navbarh'
import Footer from './Footer'

function Layout({children}) {
  return (
    <div>
    <Navbarh/>
    <div>{children}</div>
    <Footer/>
  </div>
  )
}

export default Layout
