import "react-day-picker/dist/style.css";
import React, { useState, useEffect } from "react";
import { LocaleUtils, DayPicker } from "react-day-picker";
import { DAYS_FORMAT } from "../../../../constants/index";
import { useSelector } from "react-redux";
import moment from "moment";

const CalendarPicker = ({
  selectedDate,
  handleSelectDate,
  selectedCountry,
  selectedCenter,
}) => {
  const { holidayList } = useSelector((state) => state.holidayList);
  const [holidaysList, setHolidaysList] = useState([]);

  useEffect(() => {
    if (
      selectedCountry?.label !== undefined &&
      selectedCenter?.centerId !== undefined
    ) {
      const obtainedHoliday = holidayList.map((list) => {
        const date1 = new Date(list.date);
        return new Date(date1.toUTCString().slice(0, -4));
      });
      setHolidaysList(obtainedHoliday);
    }
  }, [selectedCountry?.label, selectedCenter?.centerId, holidayList]);

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
  const selectedDaysToDisable = holidaysList;

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

  moment.addRealMonth = function addRealMonth(d) {
    var fm = moment(d).add(1, "M");
    var fmEnd = moment(fm).endOf("month");
    return d.date() != fm.date() && fm.isSame(fmEnd.format("YYYY-MM-DD"))
      ? fm.add(1, "d")
      : fm;
  };

  var nextMonth = moment.addRealMonth(moment());

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
            after: nextMonth._d,
          },
          ...selectedDaysToDisable,
          // weekends,
        ]}
        modifiers={{ holidays: holidaysList }}
        modifiersStyles={getModifierStyles()}
        onDayClick={(day) => {
          handleSelectDate(day);
        }}
        localeUtils={{
          ...LocaleUtils,
          formatWeekdayShort: getFormattedDayTitle,
        }}
      />
    </>
  );
};

export default CalendarPicker;
