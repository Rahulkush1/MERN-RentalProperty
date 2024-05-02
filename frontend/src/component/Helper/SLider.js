import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import "./Slider.css";

// import required modules
import { Pagination } from 'swiper/modules';
import CircleCard from './CircleCard';

export default function SLider({cities}) {
  return (
    <>
      <Swiper
        slidesPerView={5}
        spaceBetween={0}
        modules={[Pagination]}
        className="mySwiper"
        
      >
        {cities && cities.map((currentValue, index) => {
          return (
              <SwiperSlide key={currentValue.id} >
                <CircleCard  data={currentValue} />
              </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

