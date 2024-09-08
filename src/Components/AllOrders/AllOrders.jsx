import React, { useContext, useEffect, useState } from 'react';
import './AllOrders.module.css';
import { CartContext } from '../../Context/CartContext';
import { UserContext } from '../../Context/UserContext';
import Loading from '../Loading/Loading';

function AllOrders() {
  const { getAllOrders } = useContext(CartContext);
  const { userId } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUserOrders();
  }, [userId]);

  async function getUserOrders() {
    try {
      setIsLoading(true);
      const { data } = await getAllOrders(userId);
      setOrders(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) return <Loading />;

  return (
    <div className='pt-28 px-4 dark:text-white'>
      <h2 className="text-4xl font-bold text-center my-5 text-green-600">Your Orders</h2>
      <div className='grid gap-8'>
        {orders?.length === 0 ? (
          <p className='text-center dark:text-gray-300'>No orders found.</p>
        ) : (
          orders?.map((order) => (
            <div
              key={order?._id}
              className='border border-gray-300 p-6 rounded-lg shadow-lg bg-gradient-to-r from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 dark:border-gray-700 hover:shadow-2xl transition-shadow'
            >
              <div className='flex justify-between items-center mb-6'>
                <h3 className='text-xl font-semibold dark:text-gray-200'>Order #{order?._id}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${order?.isDelivered ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {order?.isDelivered ? 'Delivered' : 'Pending'}
                </span>
              </div>

              <div className='grid gap-4 mb-4'>
                <p className='text-gray-600 dark:text-gray-400'>
                  <strong>Payment Method:</strong> {order?.paymentMethodType}
                </p>
                <p className='text-gray-600 dark:text-gray-400'>
                  <strong>Total Price:</strong> ${order?.totalOrderPrice}
                </p>
                <p className='text-gray-600 dark:text-gray-400'>
                  <strong>Paid:</strong> {order?.isPaid ? 'Yes' : 'No'}
                </p>
              </div>

              <div className='border-t pt-4 dark:border-gray-700'>
                <h4 className='text-lg font-medium mb-2 dark:text-gray-200'>Shipping Address</h4>
                <div className='grid gap-1 text-gray-600 dark:text-gray-400'>
                  <p>{order.shippingAddress.details}</p>
                  <p>{order.shippingAddress.city}</p>
                  <p>{order.shippingAddress.phone}</p>
                </div>
              </div>

              <div className='border-t pt-4 mt-4 dark:border-gray-700'>
                <h4 className='text-lg font-medium mb-2 dark:text-gray-200'>Items</h4>
                <ul className='space-y-4'>
                  {order.cartItems.map((item) => (
                    <li key={item._id} className='flex items-center justify-between'>
                      <div className='flex items-center'>
                        <img
                          src={item.product.imageCover}
                          alt={item.product.title}
                          className='w-16 h-16 object-cover rounded-md mr-4 shadow-md'
                        />
                        <div>
                          <h5 className='font-semibold text-gray-800 dark:text-gray-300'>{item.product.title}</h5>
                          <p className='text-sm text-gray-500 dark:text-gray-400'>
                            Quantity: {item.count}
                          </p>
                        </div>
                      </div>
                      <p className='font-semibold text-gray-800 dark:text-gray-300'>${item.price}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AllOrders;
