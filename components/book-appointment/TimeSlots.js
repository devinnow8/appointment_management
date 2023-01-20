import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { Button } from "reactstrap";

function TimeSlots({ slider, arrayTime, slideToShow, setSlideToShow }) {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          vertical: false,
          verticalSwiping: false,
        },
      },
    ],
    beforeChange: function (currentSlide, nextSlide) {},
    afterChange: function (currentSlide) {
      setSlideToShow(currentSlide);
    },
  };
  return (
    <div className="appointment-calender__time">
      <div className="appointment-calender__time--flex">
        <Button
          className="appointment-calender__time--arrowPrev"
          onClick={() => slider.current.slickPrev()}
        >
          <Image src="/images/up-arrow.png" alt="" width={12} height={9} />
        </Button>
        <div>
          <Slider ref={slider} {...settings}>
            {arrayTime.map((item, index) => {
              return (
                <div
                  className="appointment-calender__time--box"
                  key={item.id}
                  onClick={() => {
                    setSlideToShow(index);
                    slider.current.slickGoTo(index);
                  }}
                >
                  <p className={`time ${index === slideToShow && "active"}`}>
                    {item.time}
                  </p>
                </div>
              );
            })}
          </Slider>
        </div>
        <Button
          className="appointment-calender__time--arrowNext"
          onClick={() => slider.current.slickNext()}
        >
          <Image src="/images/down-arrow.png" alt="" width={12} height={9} />
        </Button>
      </div>
    </div>
  );
}

export default TimeSlots;
