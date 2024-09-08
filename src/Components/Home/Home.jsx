import React, { useEffect, useState } from 'react'
import './Home.module.css'
import RecentProducts from '../RecentProducts/RecentProducts';
import CategorySlider from '../CategorySlider/CategorySlider';
import MainSlider from '../MainSlider/MainSlider';



function Home() {

  return (
    <div>
      <MainSlider/>
      <CategorySlider/>
      <RecentProducts/>
    </div>
  )
}
export default Home