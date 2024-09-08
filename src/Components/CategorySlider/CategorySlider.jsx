import React, { useEffect, useRef, useState } from 'react'
import './CategorySlider.module.css'
import Slider from 'react-slick';
import Loading from '../Loading/Loading';
import axios from 'axios';

 function CategorySlider() {
  const [categories, setCategories] = useState([]);
    useEffect(
    () => {
      console.log("Mounting");
      getCategories();
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
      slidesToShow: 6,
      slidesToScroll: 1,
      arrows:false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            dots: false,
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
          }
        },
        {
          breakpoint: 669,
          settings: {
            dots: false,
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 2
          }
        }
      ]
    };
    async function getCategories() {
      const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      console.log(data.data);
      setCategories(data.data);
    }
    if(categories.length === 0){
      return <Loading/>
    }

  return <div>
    <Slider  ref={slider => {
      sliderRef = slider;
    }}
    {...settings}>
      {
        categories.map(function (category){
          return <div key={category._id}>
            <img className=' h-[250px] w-full  object-cover' src={category.image} alt={category.name} />
            <h3 className='text-sm text-green-600 my-3'>{category.name}</h3>
          </div>
        })
      }
 
    </Slider>
      <div className='flex justify-center items-center mt-4'>
        <button className="bg-gray-300 duration-300 hover:bg-green-600 w-5 rounded-md h-2" onClick={previous}>
          
        </button>
        <button className="bg-gray-300 duration-300 ms-2 hover:bg-green-600 w-5 rounded-md h-2" onClick={next}>
        </button>
      </div>
 </div>
}
export default CategorySlider