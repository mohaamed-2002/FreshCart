import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { FaRegHeart, FaStar } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import Loader from './../../Components/Loader/Loader';
import { CartContext } from '../../Context/CartContext';
import toast from './../../../node_modules/react-hot-toast/src/index';
import { WishListContext } from './../../Context/WishListContext';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplayspeed: 1000,
};

export default function ProductDetails() {
  const { addToCart, setNumOfCartItems, setCartId } = useContext(CartContext);
  const { addToWishList } = useContext(WishListContext);

  const { productId } = useParams();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  async function addProduct(id) {
    let res = await addToCart(id);
    if (res.status === 'success') {
      toast.success(res.message);
      setNumOfCartItems(res.numOfCartItems);
      setCartId(res.cartId);
    } else {
      toast.error('Something went wrong');
    }
  }

  async function addProductToWishList(id) {
    let res = await addToWishList(id);
    if (res.status === 'success') {
      toast.success(res.message);
    } else {
      toast.error('Something went wrong');
    }
  }

  async function getProductDetails() {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
      .then((res) => setDetails(res.data.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getProductDetails();
  }, []);

  useEffect(() => {
    if (details.title) {
      document.title = details.title;
    }
  }, [details.title]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 py-14">
      <div className="flex flex-col md:flex-row items-center">
        <div className="slider mb-5 w-full md:w-1/4">
          <Slider {...settings}>
            {details.images?.map((img, i) => (
              <img src={img} key={i} className="w-full h-auto" alt={`Product Image ${i}`} />
            ))}
          </Slider>
        </div>
        <div className="w-full md:w-3/4 px-4 md:px-10 py-4">
          <div className="inner">
            <h2 className="text-2xl font-bold">{details.title}</h2>
            <p className="text-gray-700 text-md my-4">{details.description}</p>
            <small>{details.category?.name}</small>
            <div className="flex justify-between mt-4">
              <p>{details.price} EGP</p>
              <div className="flex items-center">
                <FaStar className="text-yellow-300 mx-1" />
                <span>{details.ratingsAverage}</span>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <button
                className="btn w-full bg-green-500 text-white py-2 px-4 rounded-xl"
                onClick={() => addProduct(details.id)}
              >
                Add To Cart
              </button>
              <FaRegHeart
                onClick={() => addProductToWishList(details.id)}
                className="cursor-pointer w-8 h-8 mx-4 text-green-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}