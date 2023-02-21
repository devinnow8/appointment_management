import "react-day-picker/dist/style.css";
import React, { useState, useEffect } from "react";
import { LocaleUtils, DayPicker } from "react-day-picker";
import { DAYS_FORMAT } from "../../../../constants/index";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const CalendarPicker = ({
  selectedDate,
  handleSelectDate,
  selectedCountry,
  selectedCenter,
  setSelectedDate,
  applicationDetails,
}) => {
  const { holidayList } = useSelector((state) => state.holidayList);
  const [holidaysList, setHolidaysList] = useState([]);
  const { appointmentDetails } = useSelector(
    (state) => state.appointmentDetails,
  );
  useEffect(() => {
    if (
      selectedCountry?.label !== undefined &&
      selectedCenter?.centerId !== undefined
    ) {
      const obtainedHoliday = holidayList.map((list) => {
        const date1 = new Date(list.day);
        return new Date(date1.toUTCString().slice(0, -4));
      });
      const filteredDate = holidayList.filter((list) => {
        const date1 = new Date(list.day);
        const date2 = new Date(date1.toUTCString().slice(0, -4));
        if (
          moment(selectedDate).format("MM/DD/YYYY") ===
          moment(date2).format("MM/DD/YYYY")
        ) {
          return list;
        }
      });
      if (filteredDate.length > 0) {
        setSelectedDate("");
      }
      setHolidaysList(obtainedHoliday);
    }
  }, [holidayList]);

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

  let defaultMonth = "";
  useEffect(() => {
    if (window.location?.search?.includes("appointmentId")) {
      defaultMonth = new Date(applicationDetails.appointmentDate);
    } else if (applicationDetails.appointmentId) {
      defaultMonth = new Date(applicationDetails.appointmentDate);
    } else if (appointmentDetails?.applicantAppointment) {
      defaultMonth = new Date(appointmentDetails.applicantAppointment.date);
    } else {
      defaultMonth = new Date();
    }
  }, [
    window.location?.search,
    applicationDetails.appointmentId,
    appointmentDetails?.applicantAppointment,
  ]);

  return (
    <>
      <DayPicker
        mode="range"
        max={60}
        className="calender-months"
        selected={selectedDate}
        defaultMonth={defaultMonth}
        disabled={[
          { before: new Date() },
          {
            after: nextMonth._d,
          },
          ...selectedDaysToDisable,
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
