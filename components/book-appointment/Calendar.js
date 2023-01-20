import React, { useState, useEffect } from "react";
import "react-day-picker/dist/style.css";
import { LocaleUtils, DayPicker } from "react-day-picker";
import moment from "moment";
import Select from "react-select";
import { DAYS_FORMAT, monthNames, centers } from "../../constants";

const Calendar = ({ setApplicantAppointment }) => {
  const [isDateSelected, setDateSelected] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState(centers[0]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleSelectDate = (value) => {
    setSelectedDate(value);

    setApplicantAppointment({
      date: `${monthNames[value.getMonth()]}
      ${value.getDate()}, ${value.getFullYear()}`,
    });
    setDateSelected(true);
  };

  useEffect(() => {
    setApplicantAppointment((prev) => ({
      ...prev,
      date: `${monthNames[selectedDate.getMonth()]}
      ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`,
      location: selectedCenter.label,
    }));
  }, []);

  const isAvailableDate = (availableDatesList, day) => {
    return availableDatesList.includes(day.getDate());
  };

  const isUnAvailableDate = (availableDatesList, day) => {
    if (day >= new Date()) {
      return false;
      return !availableDatesList.includes(day.getDate());
    } else {
      return true;
    }
  };

  const isSelectedDate = (
    isDateSelected,
    availableDatesList,
    day,
    selected,
  ) => {
    return (
      isAvailableDate(availableDatesList, day) &&
      selected.getDate() === day.getDate() &&
      selected.getMonth() === day.getMonth() &&
      isDateSelected
    );
  };

  const getFormattedDayTitle = (day = 0) => {
    return DAYS_FORMAT[day] || "M";
  };

  const getAvailableDays = (availableDatesList) => {
    return availableDatesList.map((value) =>
      Number(moment(value).format("DD")),
    );
  };

  const getModifiers = (availableDays) => {
    return {
      available: (day) => isAvailableDate(availableDays, day),
      // booked: bookedDays,
    };
  };

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
    };
  };
  // const availableDays = getAvailableDays(availableDates);

  return (
    <>
      <Select
        options={centers}
        className="location-select"
        name="location"
        classNamePrefix="react-select"
        value={selectedCenter}
        onChange={(selected) => {
          setSelectedCenter(selected);
          setApplicantAppointment((prev) => ({
            ...prev,
            location: selected.label,
          }));
        }}
        // menuIsOpen={true}
      />

      <DayPicker
        mode="single"
        className="calender-months"
        selected={selectedDate}
        defaultMonth={new Date()}
        disabled={[
          { before: new Date() },
          // ...selectedDaysToDisable,
        ]}
        // modifiers={getModifiers(availableDays)}
        modifiersStyles={getModifierStyles()}
        onDayClick={(day, modifiers) => {
          if (!modifiers.disabled) {
            handleSelectDate(day);
          }
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

export default Calendar;
