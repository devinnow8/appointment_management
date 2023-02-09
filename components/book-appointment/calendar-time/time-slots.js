import React, { useEffect, useCallback, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { Button } from "reactstrap";
import Loader from "../../loader";
import $ from "jquery";

function TimeSlots({ arrayTime, slideToShow, setSlideToShow, isLoader }) {
  const [buttonClick, setButtonClick] = useState(0);

  useEffect(() => {
    $(".wrapper").animate(
      {
        scrollTop: buttonClick,
      },
      1000,
    );
  }, [buttonClick]);

  return (
    <div
      className={`${
        arrayTime.length == 0 ? `no-slot-div ` : ""
      }appointment-calender__time`}
    >
      {isLoader ? (
        <>
          <div className="appointment-calender__time--flex">
            <div className="no-slots">
              <Loader isLoader={isLoader} />
            </div>
          </div>
        </>
      ) : arrayTime.length > 0 ? (
        <>
          <button
            className="prev-btn"
            onClick={() => setButtonClick(Number(buttonClick) + 100)}
          >
            <Image src="/images/up-arrow.png" alt="" width={12} height={9} />
          </button>
          <div className="time-slot wrapper">
            {arrayTime.map((item, index) => {
              return (
                <p
                  className={`time-box ${index === slideToShow && "active"}`}
                  onClick={() => setSlideToShow(index)}
                >
                  {item.fromTime}
                </p>
              );
            })}
          </div>
          <button
            className="next-btn"
            onClick={() => setButtonClick(Number(buttonClick) - 100)}
          >
            <Image src="/images/down-arrow.png" alt="" width={12} height={9} />
          </button>
        </>
      ) : (
        <div className="appointment-calender__time--flex">
          <div className="no-slots">No Slot Available</div>
        </div>
      )}
    </div>
  );
}

export default TimeSlots;
