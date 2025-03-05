import Slider from 'react-slick';
import img1 from './../../assets/images/slider-image-1.jpeg';
import img2 from './../../assets/images/slider-image-2.jpeg';
import img3 from './../../assets/images/slider-image-3.jpeg';


const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 2000,
};

export default function MainSlider() {
  return (
    <div className="slider p-5">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="pb-5 w-full md:w-3/4">
          <Slider {...settings}>
            <div>
              <img src={img1} className="w-full h-[300px] md:h-[500px] object-cover rounded-lg" alt="" />
            </div>
            <div>
              <img src={img2} className="w-full h-[300px] md:h-[500px] object-cover rounded-lg" alt="" />
            </div>
            <div>
              <img src={img3} className="w-full h-[300px] md:h-[500px] object-cover rounded-lg" alt="" />
            </div>
          </Slider>
        </div>

        <div className=" w-full md:w-1/4 flex flex-col gap-4">
          <img src={img2} className="w-full h-[150px] md:h-[245px] object-cover rounded-lg" alt="" />
          <img src={img3} className="w-full h-[150px] md:h-[245px] object-cover rounded-lg" alt="" />
        </div>
      </div>
    </div>
  );
}