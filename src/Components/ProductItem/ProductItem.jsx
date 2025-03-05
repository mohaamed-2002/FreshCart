import React, { useState } from 'react'
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';


export default function ProductItem(props) {
  const { product, addProduct, addProductToWishList } = props;
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
    addProductToWishList(product.id);
  };


  return (

    
    <div className='inner product p-2 border border-gray-100 rounded-md'>
      
      <Link to={`/productdetails/${product.id}`}>
        <img src={product.imageCover} className='w-full' alt="" />
        <small className='text-green-600 font-semibold'>{product.category?.name}</small>
        <h5 className='font-semibold my-3'>{product.title.split(' ').slice(0, 2).join(' ')}</h5>
        <div className="flex justify-between">
          <p>{product.price} EGP</p>
          <div className='flex items-center'>{' '} <span className='mx-1'>{' '} <FaStar className='text-yellow-300' /></span>
            <span>{product.ratingsAverage}</span>
          </div>


        </div>
      </Link>
      <div className='flex items-center'>
      <button className='btn w-full' onClick={()=>addProduct(product.id)} >Add To Cart</button>
      {isHeartFilled ? (
          <FaHeart onClick={handleHeartClick} className='cursor-pointer w-8 h-8 mx-1 text-green-500' />
        ) : (
          <FaRegHeart onClick={handleHeartClick} className='cursor-pointer w-8 h-8 mx-1 text-green-500' />
        )}
      </div>
    </div>
  )
}
