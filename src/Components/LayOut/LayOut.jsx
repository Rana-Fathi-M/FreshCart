import React, { useEffect, useState } from 'react'
import './LayOut.module.css'
import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

 

 function LayOut() {
  useEffect(
    () => {
      console.log("Mounting");
      
    }
    ,[])
  return (
    <div>
      <NavBar/>
      <div className="container mx-auto max-w-screen-xl">
      <Outlet/>
      </div>  
      <Footer/>
    </div>
  )
}
export default LayOut