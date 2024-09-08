import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export default function useProducts() {
  const response = useQuery({
    queryKey: ['products'],
    queryFn: () => axios.get('https://ecommerce.routemisr.com/api/v1/products') ,
    select: (data)=> data.data.data , 
    //el wa2t el hyfdl feh fresh w m4 hyt7wl l stale el value bydefault b 0 hna lma a5leha infinity kda m4 hyrg3 y3ml refetch
    staleTime: 20000 ,
    //awl m ad5ol el saf7a de y3ml refetch awl mara
    refetchOnMount: true ,
     refetchOnReconnect : false, 
     refetchOnWindowFocus : false,
     //3dd mo7wlat el refetching a5leha 3dd / rakkm (3) aw function
     retry: (counter , error)=>{
      if(counter < 3){
        return true
      }
      return confirm('retry again?')
     },
     refetchInterval : 30000,
     refetchIntervalInBackground: true
  })

  return response
}
