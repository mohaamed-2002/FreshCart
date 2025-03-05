import { useContext, useEffect, useState } from 'react';
import { WishListContext } from '../../Context/WishListContext';
import Loader from '../../Components/Loader/Loader';
import { FaTrashAlt } from 'react-icons/fa';
import { CartContext } from '../../Context/CartContext';

export default function WishList() {

  const {addToCart}= useContext(CartContext)
  const { getLoggedWishListData, reomveWishList } = useContext(WishListContext);
  const [wishListData, setWishListData] = useState(null);
  


    async function addProduct(id) {
      let res= await addToCart(id)
    }

  async function getData() {
    let data = await getLoggedWishListData();
    //console.log(data.data);
    setWishListData(data.data);
  }

  async function deletProduct(id) {
      let response = await reomveWishList(id);
      if (response.status === 'success') {
        setWishListData((prevData) => prevData.filter((product) => product._id !== id));
      }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    document.title = 'WishList';
  }, []);

  return (
    <div className='p-8'>
      {wishListData ? (
        <>
          <div className="flex justify-between my-4">
            <h4 className='text-2xl font-semibold'>Wish List</h4>
          </div>

          {wishListData.length > 0 ? (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-16 py-3">
                      <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Add To Cart
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
                  {wishListData.map((product) => (
                    <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="p-4">
                        <img src={product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.title} />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.title}
                      </td>
                      <td className="px-6 py-4">
                        <button className='btn' onClick={()=>addProduct(product.id)}>Add To Cart</button>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.price} EGP
                      </td>
                      <td className="px-6 py-4">
                        <button onClick={() => deletProduct(product._id)}>
                          <FaTrashAlt className='text-2xl text-red-700' />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="border-transparent shadow-lg bg-gray-50 rounded-xl text-center text-xl font-semibold my-8 p-10">
              Your wishlist is empty.
            </div>
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}