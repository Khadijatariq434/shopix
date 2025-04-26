import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SalesBanner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Show only 1 image at a time to take full width
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const salesImages = [
    "/images/sale.webp", // Ensure correct image path
    
  ];

  return (
    <div className="w-full">
      <Slider {...settings}>
        {salesImages.map((image, index) => (
          <div key={index} className="w-full h-40">
            <img
              src={image}
              alt={`Sales Banner ${index + 1}`}
              className="w-screen h-auto object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SalesBanner;
