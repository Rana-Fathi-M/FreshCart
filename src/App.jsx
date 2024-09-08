import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Products from './Components/Products/Products';
import LayOut from './Components/LayOut/LayOut';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import Cart from './Components/Cart/Cart';
import Register from './Components/Register/Register';
import NotFound from './Components/NotFound/NotFound';
import UserContextProvider from './Context/UserContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ResetPassword from './Components/ResetPassword/ResetPassword';
import VerificationCode from './Components/VerificationCode/VerificationCode';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import CartContextProvider from './Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import AllOrders from './Components/AllOrders/AllOrders';
import CheckOut from './Components/CheckOut/CheckOut';
import WishList from './Components/WishList/WishList';
import WishListContextProvider from './Components/WishListContext/WishListContext';

const x = createBrowserRouter([
  {
    path: "", element: <LayOut />, children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "home", element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "products", element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: "productdetails/:id", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: "login", element: <Login /> },
      { path: "forgotpassword", element: <ForgotPassword /> }, 
      { path: "verificationcode", element: <VerificationCode/> }, 
      { path: "resetpassword", element: <ResetPassword/> },
      { path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: "checkout/:cartId", element: <ProtectedRoute><CheckOut/></ProtectedRoute> },
      { path: "wishlist", element: <ProtectedRoute><WishList/></ProtectedRoute> },
      { path: "allorders", element: <ProtectedRoute><AllOrders/></ProtectedRoute> },
      { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: "register", element: <Register /> },
      { path: "*", element: <NotFound /> }
    ]
  }
]);


//lw 3ayz kol el requests bta3ty y7slha handling b default values mo3yna 
const myClient = new QueryClient({
  defaultOptions: {
    queries: {
      //garbage collecter time lma akon f component 3ard data by5leha active w lw f component m4 3ard data by5leha in active f hna b2ol lma y3dy wa2t mo3yn 4elo mn query w 5leh y3ml refresh tani loaing w kda tani
      gcTime: 5000,
      staleTime: 20000 ,
      //awl m ad5ol el saf7a de y3ml refetch awl mara
      refetchOnMount: true ,
       refetchOnReconnect : false, 
       refetchOnWindowFocus : false,

    }

  }
})


export default function App() {
  return (
    <div>
      <QueryClientProvider client={myClient}>
        <UserContextProvider>
         <CartContextProvider>
          <WishListContextProvider>
           <RouterProvider router={x}></RouterProvider>
          </WishListContextProvider>
         </CartContextProvider>
        </UserContextProvider>
        <ReactQueryDevtools />
        <Toaster toastOptions={{
          success: {
              duration: 2000 , 
              position: "top-right",
              style:{
                position: "relative",
                top:"55px",
              }
          } 
        }} />
      </QueryClientProvider>
    </div>
  )
}
