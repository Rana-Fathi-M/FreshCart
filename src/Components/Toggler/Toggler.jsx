import React, { useEffect, useState } from 'react'
import { MdDarkMode , MdOutlineDarkMode  } from "react-icons/md";


export default function Toggler() {
   //m7tag a3ml rerender 34an a3rf l dark w el light f nst3ml usestae
   const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches))
  
   //UPDATING PHASE
   //document.querySelector('html').classList.toggle('dark' , isDarkMode); e5tsar ll if cond
    useEffect(()=>{
      const html = document.querySelector('html');
      if(isDarkMode){
        html.classList.add('dark');
      }
      else{
        html.classList.remove('dark');
      }
    } , [isDarkMode])
    return <>
    
  <button onClick={() => setIsDarkMode(!isDarkMode)}>{isDarkMode ? <MdDarkMode className='text-white' /> : <MdOutlineDarkMode/>}</button>
  
    </>
}
