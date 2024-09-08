import React, { useContext, useEffect, useState } from 'react'
import './ProtectedRoute.module.css'
import { UserContext } from '../../Context/UserContext'
import { Navigate } from 'react-router-dom'

 

 function ProtectedRoute(props) {
  const {token} = useContext(UserContext)
  if(token){
    //lw howa msgl arg3 el children el gowa el protected roue
    return props.children
  }
  else{
    //lw howa m4 3aml login w 7awl yd5ol ay path nrg3o ll login
    return <Navigate to={'/login'}></Navigate>
  }
}
export default ProtectedRoute