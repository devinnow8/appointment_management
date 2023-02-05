import React from "react";
import TimeSlots from "./time-slots";
import { Button, Col, Row } from "reactstrap";
import { useRouter } from "next/router";
import Calendar from "./calendar";

const CalendarTime = ({
  slider,
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
}) => {
  const router = useRouter();

  return (
    <div className="appointment-calender">
      <Row>
        <Col md={10} lg={10} xl={10}>
          <Calendar
            setApplicantAppointment={setApplicantAppointment}
            selectedCenter={selectedCenter}
            setSelectedCenter={setSelectedCenter}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <h2 className="d-block d-md-none sel-time">Select Time</h2>
        </Col>
        <Col md={2} lg={2} xl={2}>
          <TimeSlots
            slider={slider}
            arrayTime={arrayTime}
            slideToShow={slideToShow}
            setSlideToShow={setSlideToShow}
            isLoader={isLoader}
          />
        </Col>
        <Col sm={12} md={12} className="text-end">
          <div className="appointment-calender__buttons">
            <Button className="cancel-btn me-3" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button
              className="continue"
              onClick={() => {
                setModal(true);
                setConfirmCalendar(true);
              }}
              disabled={!applicantAppointment.time?.length}
            >
              Continue
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CalendarTime;
