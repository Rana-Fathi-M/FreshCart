import React, { useEffect, useState } from 'react'
import './NotFound.module.css'

 

 function NotFound() {
  const [counter, setCounter] = useState(0)
  useEffect(
    () => {
      console.log("Mounting");
      
    }
    ,[])
  return (
    <div>
      <h2>NotFound</h2>
    </div>
  )
}
export default NotFound