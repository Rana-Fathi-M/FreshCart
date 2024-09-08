import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const WishListContext = createContext();

export default function WishListContextProvider({children}){

  
  useEffect( ()=> {
    getUserWishList();
  }
    ,[])

    const token = localStorage.getItem('token');
    const headers = {
      token
    }

    async function getUserWishList(){
      return await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist' , {
        headers
      })
      .then(data=> data)
      .catch(err=>err)
    }

    function addItemToWishList(pId){
      return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist' , {
        productId: pId
      }, {
        headers
      })
      .then(data=> data)
      .catch(err=>err)
    }

    function removeItemFromWishList(pId){
      return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${pId}` , {
        headers
      })
      .then(data=> data)
      .catch(err=>err)
    }

return <WishListContext.Provider value={{ getUserWishList ,addItemToWishList , removeItemFromWishList }}>
  {children}
</WishListContext.Provider>


}