import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();


export default function CartContextProvider({children}){

  const [cartItems , setCartItems] = useState(null);
    useEffect( ()=> {
      getUserCartItems();
    }
      ,[])

    const token = localStorage.getItem('token');
    const headers = {
      //token:token f tt4al 3ady
      token
    }
  

     function getUserCart(){
     return axios.get('https://ecommerce.routemisr.com/api/v1/cart' , {
        // headers:headers
        headers
      })
      .then(data=> data)
      .catch(err => err)
    }


     function addItemToCart(pId){
      return axios.post('https://ecommerce.routemisr.com/api/v1/cart' , {
        productId: pId
      } , {
         headers
       })
       .then(data=> data)
       .catch(err => err)
     }

     function updateCartCount (pId , count){
      return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${pId}`, {
        count: count
      } , {
        headers
      })
      .then(data => data)
      .catch(err => err)
     }

     function deleteItemFromCart(pId){
      return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${pId}` , {
        headers
      })
      .then(data => data)
      .catch(err => err)
     }

     function clearCart(){
      return axios.delete('https://ecommerce.routemisr.com/api/v1/cart' , {
        headers
      })
      .then(data => data)
      .catch(err => err)
     }

     
  async function  getUserCartItems() {
    const {data} = await getUserCart();
    if(data.status=="success"){
      setCartItems(data.numOfCartItems);
      console.log({cartItems});
    }
  
  }

  function checkoutSession(cartId , shippingAddress){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173` , {

      shippingAddress : shippingAddress
    } ,{
      headers
    } )
    .then(data => data)
    .catch(err => err)
  
  }

  function getAllOrders(userId){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
    .then(data => data)
    .catch(err => err)
  }

 
  return <CartContext.Provider value={{ cartItems , setCartItems , getUserCart , addItemToCart , updateCartCount , getAllOrders , deleteItemFromCart ,clearCart , checkoutSession}}>
             {children}
         </CartContext.Provider>

}