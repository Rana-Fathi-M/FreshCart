import React, { useContext, useEffect, useState } from 'react'
import './Cart.module.css'
import { CartContext } from '../../Context/CartContext';
import { FaTrash } from 'react-icons/fa';
import CartItem from '../CartItem/CartItem';
import { Link} from 'react-router-dom';
import Loading from '../Loading/Loading';



function Cart() {
  const [cartDetails, setCartDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    getUserCartLogged();
  }
    , [])
  const { getUserCart, updateCartCount, deleteItemFromCart, clearCart, cartItems ,setCartItems} = useContext(CartContext)

  async function getUserCartLogged() {
    try {
      setIsLoading(true)
      const { data } = await getUserCart();
      console.log(data.data);
      if (data.status == "success") {
        setCartDetails(data.data)
      }
    }
    catch (err) {
      console.log(err)
    }
    finally {
      setIsLoading(false)
    }

  }

  async function updateCount(id, count) {
    try {
      setIsLoading(true)
      const { data } = await updateCartCount(id, count);
      console.log(data.status);
      if (data.status == "success") {
        setCartDetails(data.data)
      }
    }
    catch (err) {
      console.log(err)
    }
    finally {
      setIsLoading(false)
    }
  }
  if (isLoading) return <Loading />;

  async function deleteItem(pId) {
    try {
      setIsLoading(true)
      const { data } = await deleteItemFromCart(pId);
      console.log(data.status);
      if (data.status == "success") {
        setCartDetails(data.data)
        setCartItems(data.numOfCartItems);
      }
    }
    catch (err) {
      console.log(err)
    }
    finally {
      setIsLoading(false)
    }
  }

  async function clearItemsFromCart() {
    try {
      setIsLoading(true)
      const { data } = await clearCart();
      console.log(data.status);
      setCartDetails(null);
      setCartItems(data.numOfCartItems);
    }
    catch (err) {
      console.log(err)
    }
    finally {
      setIsLoading(false)
    }
  }


  return (

    <div className="relative pt-28 overflow-x-auto ">
      <h2 className='text-green-600 text-4xl text-center my-3'>Cart Details</h2>

      
      <div className="flex justify-between items-center">
        <p className='h3 text-green-600'>Total Price : {cartDetails?.totalCartPrice}</p>
        <p className='h3 text-green-600'>Total Number Of Items : {cartItems}</p>

      </div>
      <table className="w-full shadow-md sm:rounded-lg text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-16 py-3">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-6 py-3">
              Product
            </th>
            <th scope="col" className="px-6 py-3">
              Qty
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {
            cartDetails?.products.map(p => <CartItem updateCount={updateCount} count={p.count} price={p.price} product={p.product} deleteItem={deleteItem} />)
          }

        </tbody>
      </table>
      <div className="flex mt-5 justify-between items-center">
        <button onClick={() => clearItemsFromCart()} className='bg-green-600 text-lg text-white rounded-lg p-4 font-bold hover:bg-green-500 duration-100 transition-all'>Clear Cart <FaTrash className='inline-block' /> </button>

        <Link to={'/checkout/' + cartDetails?._id} className='bg-green-600 button text-lg text-white rounded-lg p-4 font-bold hover:bg-green-500 duration-100 transition-all'>
         CheckOut
        </Link>
      </div>
    </div>


  )
}
export default Cart