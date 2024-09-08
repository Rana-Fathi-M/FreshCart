import React, { useEffect, useRef } from 'react'
import './MainSlider.module.css'
import img_1 from '../../assets/imgs/main-slider-1.jpeg'
import img_2 from '../../assets/imgs/main-slider-2.jpeg'
import img_3 from '../../assets/imgs/main-slider-3.jpeg'
import slide_1 from '../../assets/imgs/slide-1.jpeg'
import slide_2 from '../../assets/imgs/slide-2.jpeg'
import Slider from 'react-slick'


 

 function MainSlider() {
  
  useEffect(
    () => {
      console.log("Mounting");
      
    }
    ,[]);

    let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };

    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows:false
    };
  return (
    <div className='grid pt-28 pb-12 grid-cols-1 md:grid-cols-12 '>
      <div className="md:col-span-8">
      <Slider  ref={slider => {
      sliderRef = slider;
    }}
    {...settings}>
        <img src={img_1} className='h-[400px] w-full object-cover' alt="" />
        <img src={slide_1} className='h-[400px] w-full object-cover' alt="" />
        <img src={slide_2} className='h-[400px] w-full object-cover' alt="" />
        
      </Slider>
      </div>
      <div className="md:col-span-4 flex flex-col">
      <img src={img_2} className='h-[200px] w-full object-cover' alt="" />
      <img src={img_3} className='h-[200px] w-full object-cover' alt="" />
      </div>

      <div className='flex justify-center items-center mt-4'>
        <button className="bg-gray-300 duration-300 hover:bg-green-600 w-5 rounded-md h-2" onClick={previous}>
          
        </button>
        <button className="bg-gray-300 duration-300 ms-2 hover:bg-green-600 w-5 rounded-md h-2" onClick={next}>
        </button>
      </div>

       
    </div>
  )
}
export default MainSlider