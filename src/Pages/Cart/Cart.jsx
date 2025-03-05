import { useContext, useEffect, useState } from 'react';
import { CartContext } from './../../Context/CartContext';
import Loader from './../../Components/Loader/Loader';
import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
    const { getLoggedCartData, reomveCartItem, updateProductQuantity, clearCart, setNumOfCartItems, setCartId } = useContext(CartContext);
    const [cartData, setCartData] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('cash')
    const navigate = useNavigate()

    async function getData() {
        let data = await getLoggedCartData();
        setCartData(data.data);
    }

    async function deletProduct(id) {
        let x = await reomveCartItem(id);
        setCartData(x.data);
        setNumOfCartItems(x.numOfCartItems)
        setCartId(x.cartId)
    }

    async function updateProduct(id, count) {
        const data = await updateProductQuantity(id, count);
        setCartData(data.data);
    }

    async function clrCart() {
        const clr = await clearCart();
        setCartData(clr);
        setNumOfCartItems(0)
        setCartId(clr.cartId)
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        document.title = 'Cart';
    }, []);

    return (
        <div className='p-8'>
            {cartData ? (
                <>
                    <div className="flex justify-between my-4">
                        <h4 className='text-2xl font-semibold'>Shopping Cart</h4>
                        <h6>
                            <span className='font-semibold'>Total Price: </span>
                            {cartData?.totalCartPrice ? cartData.totalCartPrice : '0'} EGP
                        </h6>
                    </div>

                    {cartData?.products?.length > 0 ? (
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
                                    {cartData.products.map((product) => (
                                        <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="p-4">
                                                <img src={product.product?.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product?.title} />
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                {product.product?.title}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <button disabled={product.count === 1} onClick={() => updateProduct(product.product.id, product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                                        <span className="sr-only">Quantity button</span>
                                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                                                        </svg>
                                                    </button>
                                                    <div>
                                                        <p>{product.count}</p>
                                                    </div>
                                                    <button onClick={() => updateProduct(product.product.id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                                        <span className="sr-only">Quantity button</span>
                                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                {product.price*product.count} EGP
                                            </td>
                                            <td className="px-6 py-4">
                                                <button onClick={() => deletProduct(product.product.id)}>
                                                    <FaTrashAlt className='text-2xl text-red-700' />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="border-transparent shadow-lg bg-gray-50 rounded-xl text-center text-xl font-semibold my-8  p-10">
                            Your cart is empty.
                        </div>
                    )}

                    {cartData?.products?.length > 0 && (
                        <div className="flex justify-between mt-3">
                            <div>
                                <button onClick={() => navigate('/checkout', { state: paymentMethod })} className='btn p-5 text-xl'>CheckOut</button>
                                <select className=' rounded-2xl m-1' name="payment" id="payment" onChange={(e) => { setPaymentMethod(e.target.value) }}>
                                <option value="cash">cash</option>
                                <option value="online">online</option>
                            </select>
                                </div>
                            <button onClick={() => clrCart()} className='border-green-400 border rounded-xl p-3 text-xl'>
                                Clear Your Cart
                            </button>

                        </div>
                    )}
                </>
            ) : (
                <Loader />
            )}

        </div>
    );
}