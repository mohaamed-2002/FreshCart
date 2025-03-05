import React, { useContext, useEffect, useState } from 'react'
import  axios  from 'axios';
import ProductItem from '../ProductItem/ProductItem';
import Loader from './../Loader/Loader';
import { CartContext } from '../../Context/CartContext';
import toast from './../../../node_modules/react-hot-toast/src/index';
import { WishListContext } from '../../Context/WishListContext';


export default function LatestProduct() {

  const {addToCart,setNumOfCartItems,setCartId}= useContext(CartContext)
  const{addToWishList}= useContext(WishListContext)

  const [products, setProducts] = useState([])

  async function addProduct(id) {
    let res= await addToCart(id)
    //console.log(res);


    if (res.status==='success') {
      setNumOfCartItems(res.numOfCartItems)
      setCartId(res.cartId)
      toast.success(res.message)
      
    }else{
      toast.error('something wrong')
    }
    
    
  }

    async function addProductToWishList(id) {
      let res= await addToWishList(id)
      //console.log(res);
      if (res.status==='success') {
        toast.success(res.message)
        
      }else{
        toast.error('something wrong')
      }
      
      
    }


async function getProduct(){
    //call api
await axios.get('https://ecommerce.routemisr.com/api/v1/products').then((res)=>{
  setProducts(res.data.data);
}).catch((err)=>{
    console.log(err);
})
}

useEffect(() => {
    //getproduct()
    getProduct()
}, [])


let [filteredData, setFilteredData] = useState();

  useEffect(() => {
    setFilteredData(products);
  }, [products]);

  function search(value) {
    setFilteredData(
      products?.filter((product) =>
        product.title.toLowerCase().includes(value.toLowerCase())
      )
    );}


  return (

<div>
<div className="max-w-4xl m-6 mx-auto ">
    <label
      htmlFor="default-search"
      className="mb-2 text-sm font-medium text-gray-900 sr-only "
    >
      Search
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 start-0 flex items-center  ps-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500 "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        onChange={(e) => search(e.target.value)}
        type="search"
        id="default-search"
        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-green-600 rounded-full bg-gray-50 focus:ring-greborder-green-600 focus:border-green-600 "
        placeholder="Search ..."
        required
      />
    </div>
  </div>
    <div className='row justify-center'>

      {filteredData? filteredData.map((product) => <div className='p-2 xl:w-1/6 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 ' key={product.id}>
      <ProductItem product={product} addProduct={addProduct} addProductToWishList={addProductToWishList}/>
        
      </div>)
      :<Loader/>}
    </div>
</div>
  )
}
