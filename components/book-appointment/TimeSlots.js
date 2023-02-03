import React, { useEffect, useCallback } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { Button } from "reactstrap";
import Loader from "../loader";

function TimeSlots({
  slider,
  arrayTime,
  slideToShow,
  setSlideToShow,
  isLoader,
}) {
  const settings = {
    dots: false,
    infinite: true,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    centerMode: true,
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

  const scroll = useCallback(
    (y) => {
      if (y > 0) {
        return slider?.current?.slickNext();
      } else {
        return slider?.current?.slickPrev();
      }
    },
    [slider],
  );

  useEffect(() => {
    if (document.getElementById("slider-scroll")) {
      document
        .getElementById("slider-scroll")
        .addEventListener("wheel", (e) => {
          scroll(e.deltaY);
        });
    }
  }, [scroll]);

  return (
    <div className="appointment-calender__time">
      <div className="appointment-calender__time--flex">
        <Button
          className="appointment-calender__time--arrowPrev"
          onClick={() => slider.current.slickPrev()}
        >
          <Image src="/images/up-arrow.png" alt="" width={12} height={9} />
        </Button>
        <div id="slider-scroll">
          <Slider ref={slider} {...settings}>
            {isLoader ? (
              <>
                <Loader isLoader={isLoader} />
              </>
            ) : (
              <>
                {arrayTime.length > 0 ? (
                  arrayTime.map((item, index) => {
                    return (
                      <div
                        className="appointment-calender__time--box"
                        key={item.id}
                        onClick={() => {
                          setSlideToShow(index);
                          slider.current.slickGoTo(index);
                        }}
                      >
                        <p
                          className={`time ${
                            index === slideToShow && "active"
                          }`}
                        >
                          {item.fromTime}
                        </p>
                      </div>
                    );
                  })
                ) : (
                  <>
                    <div>No Slots Available</div>
                  </>
                )}
              </>
            )}
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
