import './WishListItem.module.css'

 

 function WishListItem({price , title , image , removeWishList , addToCart ,id}) {
  
  return (
    <tr className="bg-white flex justify-between items-center border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    <td className="p-4 flex">
      <img src={image} className="w-32 md:w-40 max-w-full max-h-full" alt={title} />
      <div className="px-6 flex flex-col py-4 font-semibold text-gray-900 dark:text-white">
    <span className='lg:text-lg mt-6 mb-4'>{title}</span>
    <span className='lg:text-lg mb-4'>{price} EGP</span>
    <span onClick={() => removeWishList(id)}  className="font-medium lg:text-lg mb-4 cursor-pointer text-red-600 dark:text-red-500 hover:underline">Remove</span>
    </div>
    </td>
   
    <td className="px-14 py-4  ">
    <button onClick={() => addToCart(id) } className='bg-green-600 text-white rounded-lg p-3 font-bold lg:text-lg hover:bg-green-500 duration-100 transition-all'>Add to Cart </button> 
    </td>
   
  </tr>
  )
}
export default WishListItem