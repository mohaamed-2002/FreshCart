import Slider from 'react-slick';
import img1 from './../../assets/images/slider-image-1.jpeg'
import img2 from './../../assets/images/slider-image-2.jpeg'
import img3 from './../../assets/images/slider-image-3.jpeg'

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true,
    autoplayspeed:1000,
    
  };

export default function MainSlider() {
  return (
    <div className='row p-5 slider'>
      <div className='w-3/4'>
      <Slider {...settings}>
        <div>
        <img src={img1} className='w-full h-[500px]' alt="" />
        </div>
        <div>
        <img src={img2} className='w-full h-[500px]' alt="" />
        </div>
        <div>
        <img src={img3} className='w-full h-[500px]' alt="" />
        </div>
      </Slider>
      </div>
      <div className="w-1/4">
      <img src={img2} className='h-[250px]' alt="" />
      <img src={img3} className='h-[250px]' alt="" />

      </div>
    </div>
  )
}
