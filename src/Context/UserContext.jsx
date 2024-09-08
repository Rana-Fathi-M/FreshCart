import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext =  createContext();
export default function UserContextProvider(props){

  //ana 3ayz ab3t el token da ll navbar hyro7 ll li bta3 products w , categories , .... w y3ml if condition lw el token da b null da m3nah eno m4 3aml login f kol da myt3rd4 enma lw fehom token n3rdhom
  //! el m7tag el setToken el login w el register  lma y7slo b success hywsli el token mnhom

  //el initial value keda htkon mn el local storge ana m4 kol mara hy3od y3ml login lw kan fe token asln 5aleh fe el home lw mafe4 la 5alas  ybd2 y login aw register
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(null)
  
  useEffect(()=>{
    // token ?
    // localStorage.setItem("token" , token):
    // localStorage.removeItem("token")
    if(token){
      localStorage.setItem("token" , token)
      const data = jwtDecode(localStorage.getItem("token"))
      setUserId(data.id)
      console.log({userId})
    }
    else{
      localStorage.removeItem("token")
    }
  } , [token , userId]) 


  return <UserContext.Provider value={{token , userId , setToken}}>
    {props.children}
  </UserContext.Provider>

   
}
