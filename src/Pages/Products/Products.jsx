import React, { useContext, useEffect, useState } from 'react'
import  axios  from 'axios';
import ProductItem from './../../Components/ProductItem/ProductItem';
import Loader from './../../Components/Loader/Loader';
import { CartContext } from '../../Context/CartContext';
import toast from './../../../node_modules/react-hot-toast/src/index';
import { WishListContext } from '../../Context/WishListContext';

export default function Product() {

  const {addToCart,setNumOfCartItems,setCartId}= useContext(CartContext)
  const{addToWishList}= useContext(WishListContext)
  const [products, setProducts] = useState([])

async function getProduct(){
    //call api
await axios.get('https://ecommerce.routemisr.com/api/v1/products').then((res)=>{
  setProducts(res.data.data);

}).catch((err)=>{
    console.log(err);    
})
}

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

useEffect(() => {
    //getproduct()
    getProduct()
}, [])

useEffect(() => {
  document.title = 'Product';
}, []);

  return (

    <div className='row justify-center'>
      {products.length>0? products.map((product) => <div className='p-2 xl:w-1/6 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 ' key={product.id}>
      <ProductItem product={product} addProduct={addProduct} addProductToWishList={addProductToWishList} />
        
      </div>)
      :<Loader/>}
    </div>
  )
}