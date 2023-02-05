import React from "react";
import Applicants from "../applicants";
import CalendarTime from "../calendar-time";
import { Container } from "reactstrap";

const DetailSection = (
  handleDeleteApplicant,
  arrayTime,
  slideToShow,
  setSlideToShow,
  isLoader,
  applicantAppointment,
  setApplicantAppointment,
  selectedCenter,
  setSelectedCenter,
  selectedDate,
  setSelectedDate,
  setModal,
  setConfirmCalendar,
) => {
  return (
    <div className="applicant-details calendar-time">
      <Container>
        <Applicants handleDeleteApplicant={handleDeleteApplicant} />
        <CalendarTime
          arrayTime={arrayTime}
          slideToShow={slideToShow}
          setSlideToShow={setSlideToShow}
          isLoader={isLoader}
          applicantAppointment={applicantAppointment}
          setApplicantAppointment={setApplicantAppointment}
          selectedCenter={selectedCenter}
          setSelectedCenter={setSelectedCenter}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          setModal={setModal}
          setConfirmCalendar={setConfirmCalendar}
        />
      </Container>
    </div>
  );
};

export default DetailSection;
