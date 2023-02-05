import "react-day-picker/dist/style.css";
import React from "react";
import { LocaleUtils, DayPicker } from "react-day-picker";
import { DAYS_FORMAT } from "../../../../constants/index";
import { useSelector } from "react-redux";

const holidays = [
  new Date(2023, 1, 18),
  new Date(2023, 1, 22),
  new Date(2023, 1, 27),
  new Date(2023, 1, 28),
];

const CalendarPicker = ({ selectedDate, handleSelectDate }) => {
  const { holidayList } = useSelector((state) => state.holidayList);
  const getSundays = (date) => {
    var d = date || new Date(),
      month = d.getMonth(),
      sundays = [];

    d.setDate(1);

    // Get the first Sunday in the month
    while (d.getDay() !== 0) {
      d.setDate(d.getDate() + 1);
    }
    // Get all the other Sundays in the month
    while (d.getMonth() === month) {
      sundays.push(new Date(d.getTime()));
      d.setDate(d.getDate() + 7);
    }

    return sundays;
  };
  const weekends = getSundays();
  const selectedDaysToDisable = holidays;

  const getModifierStyles = () => {
    return {
      available: {
        color: "#E27224",
        backgroundColor: "white",
      },
      disabled: {
        color: "rgba(0, 0, 0, 0.8)",
        fontWeight: "700",
      },
      selected: {
        color: "white",
        backgroundColor: "#f1651c",
      },
      holidays: {
        color: "#000000",
        backgroundColor: "#FFAFAF",
      },
      weekend: {
        color: "#000000",
        backgroundColor: "#D7D7D7",
      },
    };
  };

  const getFormattedDayTitle = (day = 0) => {
    return DAYS_FORMAT[day] || "M";
  };

  return (
    <>
      <DayPicker
        mode="range"
        max={60}
        className="calender-months"
        selected={selectedDate}
        defaultMonth={new Date()}
        disabled={[
          { before: new Date() },
          {
            after: new Date(2023, 2, 24),
          },
          ...selectedDaysToDisable,
        ]}
        modifiers={{ holidays: holidays, weekend: weekends }}
        modifiersStyles={getModifierStyles()}
        onDayClick={(day) => {
          handleSelectDate(day);
        }}
        localeUtils={{
          ...LocaleUtils,
          formatWeekdayShort: getFormattedDayTitle,
        }}
      />

      <div className="calender-status">
        <p className="calender-status__title">Legends:</p>
        <div className="calender-status__box">
          <div className="box"></div>
          <p className="status">Available</p>
        </div>
        <div className="calender-status__box">
          <div className="box not-avail"></div>
          <p className="status">Not Available</p>
        </div>
        <div className="calender-status__box">
          <div className="box selected"></div>
          <p className="status">Selected</p>
        </div>
      </div>
    </>
  );
};

export default CalendarPicker;
