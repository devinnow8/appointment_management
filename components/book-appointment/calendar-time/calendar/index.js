import React, { useEffect, useMemo, useRef } from "react";
import { monthNames } from "../../../../constants/index";
import CalendarPicker from "./calendar-picker";
import SelectDropdowns from "./country-centre-select";
import { useSelector } from "react-redux";
import TimeSlots from "../time-slots";
import { Col, Row } from "reactstrap";
import moment from "moment";

const getCountriesList = (centers) => {
  const result = [];
  const map = new Map();
  for (const item of centers) {
    if (item && !map.has(item.country)) {
      map.set(item.country, true); // set any value to Map
      result.push({
        label: item.country,
        value: item.country,
      });
    }
  }
  return result;
};

const Calendar = ({
  setApplicantAppointment,
  selectedCenter,
  setSelectedCenter,
  selectedDate,
  setSelectedDate,
  arrayTime,
  slideToShow,
  setSlideToShow,
  isLoader,
  selectedCountry,
  setSelectedCountry,
}) => {
  const { centerList } = useSelector((state) => state.centerList);
  const { applicationDetails } = useSelector(
    (state) => state.applicationDetails,
  );
  const { appointmentDetails } = useSelector(
    (state) => state.appointmentDetails,
  );
  const countries = useMemo(() => getCountriesList(centerList), [centerList]);
  const newCenterList = useRef([]);
  useEffect(() => {
    const filteredCenterArray = centerList.filter(
      (centre) => selectedCountry.label === centre?.country,
    );
    newCenterList.current = filteredCenterArray.map((centre) => {
      return {
        ...centre,
        value: centre?.centerId,
        label: centre?.centerName,
      };
    });
    console.log(newCenterList, "newCenterList==>");
    let selectedCenterTemp = {};
    if (!!appointmentDetails.applicantAppointment) {
      const tmpCenter = newCenterList.current.find(
        //cancel
        (i) => i.label === appointmentDetails.applicantAppointment.location,
      );

      if (tmpCenter) {
        selectedCenterTemp = tmpCenter;
      }
    } else if (!!applicationDetails.appointmentId) {
      //rechedule
      const tmpCenter = newCenterList.current.find(
        (i) => i.centerId === applicationDetails?.center?.centerId,
      );
      if (tmpCenter) {
        selectedCenterTemp = tmpCenter;
      }
    } else {
      //general scenario
      selectedCenterTemp = newCenterList.current[0];
    }
    setApplicantAppointment((prev) => ({
      ...prev,
      location: selectedCenterTemp?.label,
    }));

    setSelectedCenter(selectedCenterTemp);
  }, [
    selectedCountry,
    JSON.stringify(appointmentDetails),
    applicationDetails.appointmentId,
  ]);

  const handleSelectDate = (value) => {
    setSelectedDate(value);
    setApplicantAppointment((prev) => ({
      ...prev,
      date: `${monthNames[value.getMonth()]}
      ${value.getDate()}, ${value.getFullYear()}`,
    }));
  };

  useEffect(() => {
    // GENERAL SCENARIO
    if (!applicationDetails.appointmentId) {
      setApplicantAppointment((prev) => ({
        ...prev,
        date: moment(selectedDate).format("DD/MM/YYYY"),
        location: selectedCenter?.label,
      }));
    }
  }, [centerList, applicationDetails, selectedCenter?.label, selectedDate]);

  const formatOptionLabel = (item) => {
    if (item.country === selectedCountry.label) {
      return <>{item.centerName}</>;
    }
  };

  return (
    <>
      <Row>
        <Col md={10} lg={10} xl={10}>
          <SelectDropdowns
            countries={countries}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            newCenterList={newCenterList.current}
            selectedCenter={selectedCenter}
            formatOptionLabel={formatOptionLabel}
            setSelectedCenter={setSelectedCenter}
            setApplicantAppointment={setApplicantAppointment}
            applicationDetails={applicationDetails}
          />
        </Col>
        {selectedCenter?.timeZone && (
          <Col md={2} lg={2}>
            <div className="time-zone-text">
              <label>Time Zone</label>
              <p className="value">
                {!!selectedCenter && selectedCenter?.timeZone}
              </p>
            </div>
          </Col>
        )}
      </Row>
      <Row className="justify-content-end align-items-cente">
        <Col md={10} lg={10} xl={10}>
          <CalendarPicker
            selectedDate={selectedDate}
            selectedCountry={selectedCountry}
            handleSelectDate={handleSelectDate}
            selectedCenter={selectedCenter}
            setSelectedDate={setSelectedDate}
            applicationDetails={applicationDetails}
          />
          <div className="calender-status">
            <p className="calender-status__title">Legends:</p>
            <div className="calender-status__box">
              <div className="box"></div>
              <p className="status">Available</p>
            </div>
            <div className="calender-status__box">
              <div className="box not-avail"></div>
              <p className="status">Holidays</p>
            </div>
            <div className="calender-status__box">
              <div className="box selected"></div>
              <p className="status">Selected</p>
            </div>
          </div>
        </Col>
        <Col
          md={2}
          lg={2}
          xl={2}
          className="d-block d-md-flex justify-content-start justify-content-md-end"
        >
          {selectedCenter?.timeZone && (
            <div className="time-zone-mobile">
              <label>Time Zone</label>
              <p className="value">
                {!!selectedCenter && selectedCenter?.timeZone}
              </p>
            </div>
          )}
          <h2 className="d-block d-md-none sel-time">Select Time</h2>
          <TimeSlots
            arrayTime={arrayTime}
            slideToShow={slideToShow}
            setSlideToShow={setSlideToShow}
            isLoader={isLoader}
          />
        </Col>
      </Row>
    </>
  );
};

export default Calendar;
