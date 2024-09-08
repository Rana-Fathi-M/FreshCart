import React, { useContext, useEffect, useState } from 'react'
import './NavBar.module.css'
import { FaFacebook, FaLinkedin, FaTiktok, FaTwitter, FaYoutube } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import Toggler from '../Toggler/Toggler'
import { UserContext } from '../../Context/UserContext'
import { FaCartShopping } from "react-icons/fa6";
import { CartContext } from '../../Context/CartContext'


function NavBar() {
  //htl3 el token w settoken 34an lma y3ml logout a5leha b null
  const { token, setToken } = useContext(UserContext)
  //btrg3li function
  const navigate = useNavigate();
  function logOut() {
    setToken(null)
    navigate('/login')
  }
   const {cartItems} = useContext(CartContext)
  return (
    <div>
      <nav className="bg-white fixed right-0 left-0 z-40 border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl gap-5 flex flex-wrap items-center mx-auto p-4">
          <Link to="home" className="flex items-center space-x-3 rtl:space-x-reverse">
            <FaCartShopping className='text-green-600 text-2xl' />
            <h3 className='dark:text-white' >FreshCart</h3>
          </Link>
          <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 ms-auto" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className="hidden w-full grow lg:flex justify-between lg:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">

              {token && <>

                <li>
                  <Link to="home" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">Home</Link>
                </li>
                <li>
                  <Link to="categories" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">Categories</Link>
                </li>
                <li>
                  <Link to="brands" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">Brands</Link>
                </li>
                <li>
                  <Link to="cart" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">Cart</Link>
                </li>
                <li>
                  <Link to="products" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">Products</Link>
                </li>
                <li>
                  <Link to="wishlist" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">Wishlist</Link>
                </li>
                <li>
                  <Link to="allorders" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">AllOrders</Link>
                </li>

              </>}

              <li>
                <Toggler />
              </li>

            </ul>
            <ul className="font-medium flex flex-col items-center p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">

              {!token && <>
                <li>
                  <Link to="login" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">Login</Link>
                </li>
                <li>
                  <Link to="register" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">Register</Link>
                </li>
              </>}



              {token && <>
                <Link  to="cart" className="relative ">
                  <FaCartShopping className='dark:text-white text-2xl' />

                  <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-green-600 rounded-full -top-3 -end-3 ">
                    {cartItems?cartItems:0}
                  </div>
                </Link>
                <li onClick={logOut}>
                  <span href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent cursor-pointer">SignOut</span>
                </li>
              </>
              }


              <li className='flex gap-4'>
                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"><FaFacebook /></a>
                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"> <FaLinkedin /> </a>
                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"> <FaTiktok /> </a>
                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"> <FaTwitter /> </a>
                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"> <FaYoutube /> </a>
              </li>

            </ul>
          </div>
        </div>
      </nav>

    </div>
  )
}

export default NavBar