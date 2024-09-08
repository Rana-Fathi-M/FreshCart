import React, { useContext, useEffect, useState } from 'react';
import './WishList.module.css';
import { WishListContext } from '../WishListContext/WishListContext';
import WishListItem from '../WishListItem/WishListItem';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import Loading from '../Loading/Loading';

function WishList() {
  const [isLoading, setIsLoading] = useState(false);
  const [wishListDetails, setWishListDetails] = useState([]);
  const { addItemToCart, setCartItems } = useContext(CartContext);
  const { getUserWishList, removeItemFromWishList } = useContext(WishListContext);

  useEffect(() => {
    getWishList();
  }, []);

  async function getWishList() {
    try {
      setIsLoading(true);
      const { data } = await getUserWishList();
      setWishListDetails(data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function removeWishList(pId) {
    try {
      setIsLoading(true);
      const { data } = await removeItemFromWishList(pId);
      if (data.status === 'success') {
        toast.success('Removed Successfully');
        // Update the wishlist details state to reflect the removal
        setWishListDetails(prevDetails => prevDetails.filter(item => item._id !== pId));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function addToCart(pId) {
    try {
      setIsLoading(true);
      const { data } = await addItemToCart(pId);
      if (data.status === 'success') {
        setCartItems(data.numOfCartItems);
        toast.success('Added Successfully');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) return <Loading />;

  return (
    <div className="relative pt-28 overflow-x-auto">
      <h2 className="text-green-600 text-4xl text-center my-5">My Wishlist</h2>
      {wishListDetails.length>0 ? <>
        <table className="w-full shadow-md sm:rounded-lg text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        </thead>
        <tbody>
          {wishListDetails.map(p => (
            <WishListItem
              key={p._id}
              price={p.price}
              title={p.title}
              image={p.imageCover}
              removeWishList={removeWishList}
              addToCart={addToCart}
              id={p._id}
            />
          ))}
        </tbody>
      </table>
      </> : <h3 className='text-center mt-5 h-screen'>No Products Added To WishList</h3>}
      
    </div>
  );
}

export default WishList;
