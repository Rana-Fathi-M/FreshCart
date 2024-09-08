import React, { useContext, useEffect, useRef, useState } from 'react';
import './ProductDetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaHeart, FaStar } from 'react-icons/fa';
import Loading from '../Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishListContext } from '../WishListContext/WishListContext';
import { ImSpinner } from 'react-icons/im';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function ProductDetails() {
  const { id } = useParams();
  const { isLoading, isError, error, data: productDetails } = useQuery({
    queryKey: ['productDetails', id],
    queryFn: () => axios(`https://ecommerce.routemisr.com/api/v1/products/${id}`),
    select: (data) => data.data.data
  });
  const [cartButtonLoad, setCartButtonLoad] = useState(null);
  const [wishlistIconLoad, setWishlistIconLoad] = useState(null);
  const [wishlistItems, setWishlistItems] = useState([]);

  const { addItemToCart, setCartItems } = useContext(CartContext);
  const { addItemToWishList, getUserWishList } = useContext(WishListContext);

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
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 669,
        settings: {
          dots: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2
        }
      }
    ]
  };

  useEffect(() => {
    async function fetchWishlistItems() {
      try {
        const { data } = await getUserWishList();
        setWishlistItems(data.data.map(item => item._id)); // Store the wishlist item IDs
      } catch (err) {
        console.error(err);
      }
    }
    fetchWishlistItems();
  }, [getUserWishList]);

  async function addItem(productId) {
    try {
      setCartButtonLoad(productId);
      const { data } = await addItemToCart(productId);
      if (data.status === 'success') {
        setCartItems(data.numOfCartItems);
        toast.success('Added Successfully');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setCartButtonLoad(null);
    }
  }

  async function addToWishList(productId) {
    try {
      setWishlistIconLoad(productId);
      const { data } = await addItemToWishList(productId);
      if (data.status === 'success') {
        toast.success('Added To WishList');
        setWishlistItems(prevWishlistItems => [...prevWishlistItems, productId]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setWishlistIconLoad(null);
    }
  }

  if (isError) {
    return <h3>{error.message}</h3>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='pt-28'>
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 justify-center items-center p-4">
        <div className="col-span-12 sm:col-span-4">
          <Slider
            ref={slider => {
              sliderRef = slider;
            }}
            {...settings}
          >
            {productDetails.images.map((image, index) => (
              <div key={index}>
                <img className="w-full block" src={image} alt={`Product image ${index + 1}`} />
              </div>
            ))}
          </Slider>
          <div className='flex justify-center items-center mt-4'>
            <button className="bg-gray-300 duration-300 hover:bg-green-600 w-5 rounded-md h-2" onClick={previous}></button>
            <button className="bg-gray-300 duration-300 ms-2 hover:bg-green-600 w-5 rounded-md h-2" onClick={next}></button>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-8">
          <div className="flex flex-col justify-between leading-normal px-0 sm:px-5">
            <h5 className="mb-2 text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {productDetails.title}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {productDetails.description}
            </p>
          </div>
          <div className="flex flex-row justify-between my-3 px-0 sm:px-5">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {productDetails.price} <p className="font-normal inline-block text-sm">EGP</p>
            </span>
            <div className="flex items-center mt-3 sm:mt-0">
              <span className="text-gray-600 text-lg font-semibold rounded dark:text-gray-300 me-1">
                {productDetails.ratingsAverage}
              </span>
              <FaStar className="text-yellow-400" />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between px-0 sm:px-5">
            <button
              onClick={() => addItem(productDetails.id)}
              className={`${
                cartButtonLoad === productDetails.id
                  ? 'bg-green-400 py-2 rounded-md mt-3 flex justify-center items-center text-white px-10 sm:px-20 sm:py-3 lg:px-32 text-center sm:mt-0 cursor-not-allowed'
                  : 'text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-10 py-3 sm:px-20 sm:py-3 lg:px-32 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mt-3 sm:mt-0'
              }`}
              disabled={cartButtonLoad === productDetails.id}
            >
              {cartButtonLoad === productDetails.id ? (
                <ImSpinner className='animate-spin text-2xl' />
              ) : (
                'Add to cart'
              )}
            </button>
            <button
              onClick={() => addToWishList(productDetails.id)}
              className={`text-3xl cursor-pointer mt-3 sm:mt-0 ${
                wishlistItems.includes(productDetails.id) ? 'text-red-500' : 'dark:text-white'
              }`}
            >
              {wishlistIconLoad === productDetails.id ? (
                <ImSpinner className='animate-spin text-3xl' />
              ) : (
                <FaHeart />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
