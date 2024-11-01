// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
// Nhập các thành phần Swiper React
import { Swiper, SwiperSlide } from "swiper/react";

// Nhập các kiểu dáng của Swiper
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import "./SliderBanner.css";

export default function SliderBanner() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const imgs = [
    {
      title: "Bộ sưu tập Điện Thoại Smartphone",
      description: "Smartphone",
      image: "https://s.net.vn/kWGE",
      link: "url_1",
    },
    {
      title: "Bộ sưu tập Laptop Gaming",
      description: "Laptop Gaming",
      image: "https://example.com/banner_laptop_gaming.jpg",
      link: "url_2",
    },
    {
      title: "Bộ sưu tập Máy Tính Bảng",
      description: "Máy Tính Bảng",
      image: "https://example.com/tablet.jpg",
      link: "url_3",
    },
  ];

  // Hàm xử lý khi chuyển slide
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  // Hàm xử lý khi nhấn vào hình ảnh
  const handleImageClick = (swiper) => {
    if (activeIndex === imgs.length - 1) {
      swiper.slideTo(0); // Quay lại hình đầu tiên nếu đang ở hình cuối
    } else {
      swiper.slideNext(); // Chuyển sang hình tiếp theo
    }
  };

  return (
    <>
      <Swiper
        spaceBetween={10}
        navigation={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {imgs.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img.src} alt={img.title} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        {imgs.map((img, index) => (
          <SwiperSlide key={index}>
            <button className="p-2 ">
              <h1>{img.title}</h1>
              <h6>{img.descrtiption}</h6>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
