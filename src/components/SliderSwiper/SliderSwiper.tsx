// eslint-disable-next-line max-len
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './SliderSwiper.scss';
import { useMediaQuery } from 'react-responsive';
const desktopImages = [
  'img/banner-iphone.png',
  'img/banner-tablets.png',
  'img/banner-phones.png',
];
const mobileImages = [
  'img/banner-iphone-mobver.png',
  'img/banner-tablets-mobver.png',
  'img/banner-phones-mobver.png',
];

export const SliderSwiper = () => {
  const isMobile = useMediaQuery({ maxWidth: 550 });
  const images = isMobile ? mobileImages : desktopImages;

  return (
    <div>
      <div className="slider__wrapper">
        <button className="custom-prev">‹</button>
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          className="swiper"
          navigation={{
            prevEl: '.custom-prev',
            nextEl: '.custom-next',
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true, el: '#pagination' }}
          // effect="fade"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`Slide ${index}`}
                className="slider__image"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="custom-next">›</button>
      </div>
      <div id="pagination" className="custom-pagination"></div>
    </div>
  );
};
