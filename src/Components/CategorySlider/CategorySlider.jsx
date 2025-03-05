import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
  ],
};

export default function CategorySlider() {

  const [categories, setCategories] = useState([])

  async function getCategories() {

    await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    .then((res) => 
      //console.log(res.data.data)
    setCategories(res.data.data))
    .catch ((err) => console.log(err))
  }

  useEffect(() => {

    getCategories()
  }, [])
  

  return (
    <div className="my-8 mx-1 slider">
      <Slider {...settings}>
        {categories.map((Category) => (
          <div key={Category._id} className="px-2">
            <img
              src={Category.image}
              className="w-full h-[320px] object-cover rounded-lg"
              alt={Category.name}
            />
            <h4 className="mt-3 mb-3 text-center font-semibold text-gray-800">
              {Category.name}
            </h4>
          </div>
        ))}
      </Slider>
    </div>
  );
}
