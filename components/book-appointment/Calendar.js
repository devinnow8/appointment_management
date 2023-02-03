import React, { useState, useEffect } from "react";
import "react-day-picker/dist/style.css";
import { LocaleUtils, DayPicker } from "react-day-picker";
import moment from "moment";
import Select from "react-select";
import { DAYS_FORMAT, monthNames, centers, countries } from "../../constants";
import { Col, Row } from "reactstrap";

const holidays = [
  new Date(2023, 1, 18),
  new Date(2023, 1, 22),
  new Date(2023, 1, 27),
  new Date(2023, 1, 28),
];

const Calendar = ({
  setApplicantAppointment,
  centerList,
  setCentersDetails,
  applicationDetails,
}) => {
  const [newCenterList, setNewCenterList] = useState([]);
  const [isDateSelected, setDateSelected] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCountry, setSelectedCountry] = useState({
    label: applicationDetails.country,
    value: applicationDetails.country,
  });

  const handleSelectDate = (value) => {
    setSelectedDate(value);
    setApplicantAppointment({
      date: `${monthNames[value.getMonth()]}
      ${value.getDate()}, ${value.getFullYear()}`,
    });
    setDateSelected(true);
  };

  useEffect(() => {
    const filteredCenter = centerList.filter(
      (center) => center?.centerName === selectedCenter?.centerName,
    );
    setCentersDetails(filteredCenter[0]);
    setApplicantAppointment((prev) => ({
      ...prev,
      date: `${monthNames[selectedDate.getMonth()]}
      ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`,
      location: selectedCenter?.label,
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
  // const availableDays = getAvailableDays(availableDates);
  const optionData = () => {
    let value = centers.map((item, index) => {
      return { value: item[index] || {}, label: item[index] };
    });
  };
  optionData();

  const formatOptionLabel = (item) => {
    if (item.country === selectedCountry.label) {
      return <>{item.centerName}</>;
    }
  };

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

  useEffect(() => {
    const obtainedArray = centerList.map((centre) => {
      return {
        ...centre,
        value: centre?.centerId,
        label: centre?.centerName,
      };
    });
    setNewCenterList(obtainedArray);
    setSelectedCenter(obtainedArray[0])
  },[]);
  return (
    <>
      <div className="appointment-calender__center">
        <div className="appointment-calender__center--country">
          <div>
            <label htmlFor="" className="label">
              Country
            </label>
            <Select
              options={countries}
              isDisabled={true}
              className="location-select"
              name="location"
              classNamePrefix="react-select"
              value={selectedCountry}
              onChange={(selected) => {
                setSelectedCountry(selected);
                setApplicantAppointment((prev) => ({
                  ...prev,
                  location: selected.label,
                }));
              }}
            />
          </div>

          {selectedCountry !== "" && (
            <div>
              <label htmlFor="" className="label">
                Center
              </label>
              <Select
                options={newCenterList}
                className="location-select"
                name="location"
                classNamePrefix="react-select"
                value={selectedCenter}
                formatOptionLabel={formatOptionLabel}
                onChange={(selected) => {
                  setSelectedCenter(selected);
                  setApplicantAppointment((prev) => ({
                    ...prev,
                    location: selected.centerName,
                  }));
                  const filteredCenter = centerList.filter(
                    (center) => center?.centerName === selected?.centerName,
                  );
                  setCentersDetails(filteredCenter[0]);
                }}
              />
            </div>
          )}
        </div>
        <div>
          <label htmlFor="" className="service-label p-0">
            Service
          </label>
          <p className="service-name mb-0">{applicationDetails.category}</p>
        </div>
      </div>

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
        // onMonthChange={(month) => setMonthChange(month)}
        modifiersStyles={getModifierStyles()}
        // onDayClick={(day, modifiers) => {
        //   if (!modifiers.disabled) {
        //     handleSelectDate(day);
        //   }
        // }}
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

export default Calendar;
