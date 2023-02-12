import React, { useState, useEffect } from "react";
import { monthNames, countries } from "../../../../constants/index";
import CalendarPicker from "./calendar-picker";
import SelectDropdowns from "./country-centre-select";
import { useSelector } from "react-redux";
import TimeSlots from "../time-slots";
import { Col, Row } from "reactstrap";

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
}) => {
  const { centerList } = useSelector((state) => state.centerList);
  const { applicationDetails } = useSelector(
    (state) => state.applicationDetails,
  );
  const { appointmentDetails } = useSelector(
    (state) => state.appointmentDetails,
  );
  const [newCenterList, setNewCenterList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({
    label: applicationDetails.country,
    value: applicationDetails.country,
  });

  useEffect(() => {
    if (appointmentDetails.applicantAppointment !== undefined) {
      // if click cancel after going to payment page
      const filteredArray = centerList.filter(
        (centre) =>
          selectedCountry.label === centre?.country &&
          centre.centerId === appointmentDetails.centerId,
      );
      const obtainedArray = filteredArray.map((centre) => {
        return {
          ...centre,
          value: centre?.centerId,
          label: centre?.centerName,
        };
      });
      setSelectedCenter(obtainedArray[0]);
      setSelectedDate(new Date(appointmentDetails.applicantAppointment.date));
      const index = arrayTime.findIndex(
        (x) => x.fromTime === appointmentDetails.applicantAppointment.time,
      );
      setSlideToShow(index);
    }
  }, [
    appointmentDetails.applicantAppointment,
    appointmentDetails.applicantAppointment?.time,
    appointmentDetails.applicantAppointment?.date,
    appointmentDetails.centerId,
    selectedCountry.label,
    centerList,
  ]);

  useEffect(() => {
    if (applicationDetails.appointmentId !== undefined) {
      // RESCHULE
      const filteredArray = centerList.filter(
        (centre) =>
          selectedCountry.label === centre?.country &&
          centre.centerId === applicationDetails.centerId,
      );
      const obtainedArray = filteredArray.map((centre) => {
        return {
          ...centre,
          value: centre?.centerId,
          label: centre?.centerName,
        };
      });
      setSelectedCenter(obtainedArray[0]);
      const index = arrayTime.findIndex(
        (x) => x.fromTime === applicationDetails.appointmentTime,
      );
      setSlideToShow(index);
      setSelectedDate(new Date(applicationDetails.appointmentDate));
      setApplicantAppointment((prev) => ({
        ...prev,
        location: selectedCenter?.label,
      }));
    }
  }, [
    applicationDetails.appointmentId,
    applicationDetails,
    applicationDetails.appointmentTime,
    applicationDetails.appointmentDate,
    applicationDetails.centerId,
    selectedCountry.label,
    centerList,
    applicationDetails.serviceType,
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
        date: `${monthNames[selectedDate.getMonth()]}
      ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`,
        location: selectedCenter?.label,
      }));
    }
  }, [centerList, applicationDetails, selectedCenter?.label]);

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
    if (
      !Object.keys(appointmentDetails).length &&
      applicationDetails.appointmentId === undefined
    ) {
      // general scenario
      setSelectedCenter(obtainedArray[0]);
    }
  }, [centerList, applicationDetails]);

  return (
    <>
      <Row>
        <Col md={10} lg={10} xl={10}>
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
        </Col>
      </Row>
      <Row className="justify-content-end align-items-cente">
        <Col md={10} lg={10} xl={10}>
          <CalendarPicker
            selectedDate={selectedDate}
            selectedCountry={selectedCountry}
            handleSelectDate={handleSelectDate}
            selectedCenter={selectedCenter}
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
        </Col>
        <Col
          md={2}
          lg={2}
          xl={2}
          className="d-block d-md-flex justify-content-start justify-content-md-end"
        >
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
