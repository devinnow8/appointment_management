import React, { useState, useEffect } from "react";
import { monthNames, countries } from "../../../../constants/index";
import CalendarPicker from "./calendar-picker";
import SelectDropdowns from "./country-centre-select";
import { useSelector } from "react-redux";

const Calendar = ({
  setApplicantAppointment,
  selectedCenter,
  setSelectedCenter,
  selectedDate,
  setSelectedDate,
}) => {
  const { centerList } = useSelector((state) => state.centerList);
  const { applicationDetails } = useSelector(
    (state) => state.applicationDetails,
  );
  const [newCenterList, setNewCenterList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({
    label: applicationDetails.country,
    value: applicationDetails.country,
  });

  const handleSelectDate = (value) => {
    setSelectedDate(value);
    setApplicantAppointment((prev) => ({
      ...prev,
      date: `${monthNames[value.getMonth()]}
      ${value.getDate()}, ${value.getFullYear()}`,
    }));
  };

  useEffect(() => {
    setApplicantAppointment((prev) => ({
      ...prev,
      date: `${monthNames[selectedDate.getMonth()]}
      ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`,
      location: selectedCenter?.label,
    }));
  }, [centerList, applicationDetails]);

  const formatOptionLabel = (item) => {
    if (item.country === selectedCountry.label) {
      return <>{item.centerName}</>;
    }
  };

  useEffect(() => {
    const filteredArray = centerList.filter(
      (centre) => selectedCountry.label === centre?.country,
    );
    const obtainedArray = filteredArray.map((centre) => {
      return {
        ...centre,
        value: centre?.centerId,
        label: centre?.centerName,
      };
    });
    setNewCenterList(obtainedArray);
    setSelectedCenter(obtainedArray[0]);
  }, [applicationDetails, centerList]);

  return (
    <>
      <SelectDropdowns
        countries={countries}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        newCenterList={newCenterList}
        selectedCenter={selectedCenter}
        formatOptionLabel={formatOptionLabel}
        setSelectedCenter={setSelectedCenter}
        setApplicantAppointment={setApplicantAppointment}
        applicationDetails={applicationDetails}
      />
      <CalendarPicker
        selectedDate={selectedDate}
        handleSelectDate={handleSelectDate}
      />
    </>
  );
};

export default Calendar;
