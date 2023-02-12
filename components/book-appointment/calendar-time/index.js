import React from "react";
import { Button, Col, Row } from "reactstrap";
import { useRouter } from "next/router";
import Calendar from "./calendar/index";
import { useSelector } from "react-redux";

const CalendarTime = ({
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
  const { applicationDetails } = useSelector(
    (state) => state.applicationDetails,
  );

  return (
    <div className="appointment-calender">
      <Row>
        <Col md={12} lg={12} xl={12}>
          <Calendar
            setApplicantAppointment={setApplicantAppointment}
            selectedCenter={selectedCenter}
            setSelectedCenter={setSelectedCenter}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            arrayTime={arrayTime}
            slideToShow={slideToShow}
            setSlideToShow={setSlideToShow}
            isLoader={isLoader}
          />
        </Col>

        <Col sm={12} md={12} className="text-end">
          <div className="appointment-calender__buttons">
            {applicationDetails.appointmentId ? (
              <Button
                className="cancel-btn me-3"
                onClick={() => router.push("/")}
              >
                Cancel
              </Button>
            ) : (
              <Button className="cancel-btn me-3" onClick={() => router.back()}>
                Cancel
              </Button>
            )}
            <Button
              className="continue"
              onClick={() => {
                setModal(true);
                setConfirmCalendar(true);
              }}
              disabled={!applicantAppointment?.time?.length}
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
