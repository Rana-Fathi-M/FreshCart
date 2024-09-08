import React, { useContext, useEffect, useState } from 'react';
import { FaStar, FaHeart } from "react-icons/fa";
import { ImSpinner } from "react-icons/im";
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import useProducts from '../../Hooks/useProducts';
import { CartContext } from '../../Context/CartContext';
import { WishListContext } from '../WishListContext/WishListContext';
import toast from 'react-hot-toast';

function RecentProducts() {
  //aw n7ot default options f el app.jsx lw 7atet dol bardoo hna y3mlo override 3leh
  const { data: products = [], error, isLoading, isError } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlistItems, setWishlistItems] = useState([]); // Store wishlist item IDs
  const [wishlistIconLoad, setWishlistIconLoad] = useState(null);
  const [cartButtonLoad, setCartButtonLoad] = useState(null);

  const { addItemToCart, setCartItems } = useContext(CartContext);
  const { addItemToWishList, getUserWishList } = useContext(WishListContext);

  // Fetch wishlist items on component mount
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

  // Filter products based on the search query
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  async function addItem(id) {
    try {
      setCartButtonLoad(id);
      const { data } = await addItemToCart(id);
      if (data.status === "success") {
        setCartItems(data.numOfCartItems);
        toast.success('Added Successfully');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCartButtonLoad(null);
    }
  }

  async function addToWishList(id) {
    try {
      setWishlistIconLoad(id);
      const { data } = await addItemToWishList(id);
      if (data.status === "success") {
        toast.success('Added To WishList ❤️');
        setWishlistItems(prevWishlistItems => [...prevWishlistItems, id]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setWishlistIconLoad(null);
    }
  }

  if (isLoading) return <Loading />;
  if (isError) return <div>{error.message}</div>;

  return (
    <div>
      {/* Search input */}
      <div className="pt-28 px-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border-2 border-gray-300 rounded-md dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600"
        />
      </div>

      <div className="grid gap-4 mb-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product._id} className='group hover:shadow-green-500 shadow-lg overflow-hidden'>
              <Link to={`/productdetails/${product._id}`}>
                <img src={product.imageCover} alt={product.name} />
              </Link>
              <div className="my-5 mx-5">
                <h3 className='text-green-600 my-3'>{product.category.name}</h3>
                <h4 className='dark:text-white my-3'>{product.title.split(' ').slice(0, 2).join(' ')}</h4>
                <div className="flex justify-between">
                  <h4 className='text-lg'>{product.price} EGP</h4>
                  <div className='flex justify-center items-center'>
                    <FaStar className='text-yellow-500 text-lg' />
                    <h4 className='text-lg ms-2'>{product.ratingsAverage}</h4>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  {/* <p className="line-clamp-3">{product.description}</p> */}
                  <button
                    onClick={() => addItem(product._id)}
                    className={`${cartButtonLoad === product._id ? 'bg-green-400 cursor-not-allowed py-2 text-white rounded-md mt-3 flex justify-center items-center lg:w-36 md:w-44 sm:w-56 w-80' : 'lg:w-36 md:w-44 sm:w-56 w-80 mt-3 group-hover:translate-y-0 group-hover:opacity-100 translate-y-full bg-green-600 text-white py-2 transition-all duration-500 rounded-md opacity-0'} `}
                    disabled={cartButtonLoad === product._id}
                  >
                    {cartButtonLoad === product._id ? (
                      <ImSpinner className='animate-spin text-2xl' />
                    ) : (
                      'Add to cart'
                    )}
                  </button>
                  <button
                    onClick={() => addToWishList(product._id)}
                    className={`text-3xl cursor-pointer mt-3 sm:mt-0 ${wishlistItems.includes(product._id) ? 'text-red-500' : 'dark:text-white'}`}
                  >
                    {wishlistIconLoad === product._id ? (
                      <ImSpinner className='animate-spin text-3xl' />
                    ) : (
                      <FaHeart />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">No products found</div>
        )}
      </div>
    </div>
  );
}

export default RecentProducts;
