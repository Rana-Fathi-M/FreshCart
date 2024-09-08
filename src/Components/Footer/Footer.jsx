import React, { useEffect, useState } from 'react'
import './Footer.module.css'

 

 function Footer() {
  const [counter, setCounter] = useState(0)
  useEffect(
    () => {
      console.log("Mounting");
      
    }
    ,[])
  return (
    <div className=' bg-green-600 text-white text-center mt-16 py-5'>
      <h2 className=' cursor-pointer'>Contact Us</h2>
    </div>
  )
}
export default Footer