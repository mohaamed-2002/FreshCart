import React, { useEffect } from 'react'
import LatestProduct from '../../Components/LatestProduct/LatestProduct'
import CategorySlider from './../../Components/CategorySlider/CategorySlider';
import MainSlider from './../../Components/MainSlider/MainSlider';

export default function Home() {

  useEffect(() => {
    document.title = 'home';
  }, []);
  return (
    <div className="container">
      <MainSlider />
      <CategorySlider />
      <LatestProduct />
    </div>
  )
}
