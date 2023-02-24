import "react-day-picker/dist/style.css";
import React, { useState, useEffect, useMemo } from "react";
import { LocaleUtils, DayPicker } from "react-day-picker";
import { DAYS_FORMAT } from "../../../../constants/index";
import { useSelector } from "react-redux";
import moment from "moment";
import { addMonths } from "date-fns";

const CalendarPicker = ({
  selectedDate,
  handleSelectDate,
  selectedCountry,
  selectedCenter,
  setSelectedDate,
  applicationDetails,
}) => {
  const { holidayList } = useSelector((state) => state.holidayList);
  const { appointmentDetails } = useSelector(
    (state) => state.appointmentDetails,
  );
  const nextMonth1 = addMonths(new Date(), 0);
  const [holidaysList, setHolidaysList] = useState([]);
  const [weekendList, setWeekendList] = useState([]);
  const [holidayListUpdate, setHolidayListUpdate] = useState([]);
  const [month, setMonth] = useState(nextMonth1);

  useEffect(() => {
    let newHolidaylist =
      holidayList.length > 0 &&
      holidayList.map((item) => {
        return {
          ...item,
          title: item.description,
          start: item.day,
          end: item.day,
          color: item.type === "holiday" ? "#F69D9F" : "#d7d7d7",
        };
      });
    if (newHolidaylist) {
      setHolidayListUpdate(newHolidaylist);
    } else {
      setHolidayListUpdate([]);
    }
  }, [holidayList]);

  const getAllWeekendSlotsForEventsList = (
    holidayList,
    currentNavigatedDate,
  ) => {
    return [...Array(31)].reduce((result, _, index) => {
      let currentDateInstance = moment(currentNavigatedDate)
        .startOf("month")
        .add(index, "days");
      console.log(currentDateInstance, "currentDateInstance==>");
      let currentDate = currentDateInstance.format("YYYY-MM-DD");
      let currentDay = currentDateInstance.format("dddd");
      let isCurrendDayWeekend = holidayList.some(
        ({ day, type }) => type === "weekend" && day === currentDay,
      );
      if (isCurrendDayWeekend)
        return [
          ...result,
          {
            display: "background",
            day: currentDay,
            date: currentDate,
          },
        ];
      else return result;
    }, []);
  };

  const allWeekendList = useMemo(
    () => getAllWeekendSlotsForEventsList(holidayListUpdate, month),
    [holidayListUpdate, month],
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

  useEffect(() => {
    const obtainedHoliday1 = allWeekendList.map((list) => {
      const date1 = new Date(list.date);
      return new Date(date1.toUTCString().slice(0, -4));
    });
    const filteredDate1 = allWeekendList.filter((list) => {
      const date1 = new Date(list.day);
      const date2 = new Date(date1.toUTCString().slice(0, -4));
      if (
        moment(selectedDate).format("MM/DD/YYYY") ===
        moment(date2).format("MM/DD/YYYY")
      ) {
        return list;
      }
    });
    if (filteredDate1.length > 0) {
      setSelectedDate("");
    }
    setWeekendList(obtainedHoliday1);
  }, [allWeekendList]);

  const selectedDaysToDisable = [...holidaysList, ...weekendList];

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

  let defaultMonth1 = "";
  if (window.location?.search?.includes("appointmentId")) {
    defaultMonth1 = new Date(applicationDetails.appointmentDate);
  }
  if (applicationDetails.appointmentId) {
    defaultMonth1 = new Date(applicationDetails.appointmentDate);
  } else if (appointmentDetails?.applicantAppointment) {
    defaultMonth1 = new Date(appointmentDetails.applicantAppointment.date);
  }

  // useEffect(() => {
  //   let date = new Date();
  //   if (month.getMonth() === date.getMonth()) {
  //     setSelectedDate(new Date());
  //   } else {
  //     setSelectedDate(month);
  //   }
  // }, [month]);

  return (
    <>
      <DayPicker
        mode="range"
        max={60}
        className="calender-months"
        selected={selectedDate}
        defaultMonth={defaultMonth1}
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
        onMonthChange={setMonth}
      />
    </>
  );
};

export default CalendarPicker;
