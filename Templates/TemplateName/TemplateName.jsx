import React, { useEffect, useState } from 'react'
import './TemplateName.module.css'

 

 function TemplateName() {
  const [counter, setCounter] = useState(0)
  useEffect(
    () => {
      console.log("Mounting");
      
    }
    ,[])
  return (
    <div>
      <h2>TemplateName</h2>
    </div>
  )
}
export default TemplateName