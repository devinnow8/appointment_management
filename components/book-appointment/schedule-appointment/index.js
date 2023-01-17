import React from "react";
import { Button, Col, Row } from "reactstrap";
import Calendar from "./Calendar";
import ConfirmModal from "../ConfirmModal";
import TimeSlider from "./time-slider";
import Image from "next/image";

function ScheduleAppointment({
  setApplicantAppointment,
  applicantAppointment,
  modal,
  modalToggle,
  applicantDetail,
  handleConfirm,
  selectedService,
  confirmCalendar,
  handlePaymentProceed,
  slider,
  arrayTime,
  setSlideToShow,
  slideToShow,
  handleAppointment,
}) {
  return (
    <div className="appointment-calender">
      <Row>
        <Col md={10} lg={10} xl={10}>
          <Calendar
            setApplicantAppointment={setApplicantAppointment}
            applicantAppointment={applicantAppointment}
          />
          <ConfirmModal
            modal={modal}
            modalToggle={modalToggle}
            applicantDetail={applicantDetail}
            handleConfirm={handleConfirm}
            selectedService={selectedService}
            applicantAppointment={applicantAppointment}
            confirmCalendar={confirmCalendar}
            handlePaymentProceed={handlePaymentProceed}
          />
          <h2 className="d-block d-md-none sel-time">Select Time</h2>
        </Col>
        <Col md={2} lg={2} xl={2}>
          <div className="appointment-calender__time">
            <div className="appointment-calender__time--flex">
              <Button
                className="appointment-calender__time--arrow"
                onClick={() => slider.current.slickPrev()}
              >
                <Image
                  src="/images/up-arrow.png"
                  alt=""
                  width={12}
                  height={9}
                />
              </Button>
              <TimeSlider
                slider={slider}
                arrayTime={arrayTime}
                slideToShow={slideToShow}
                setSlideToShow={setSlideToShow}
              />
              <Button
                className="appointment-calender__time--arrow"
                onClick={() => slider.current.slickNext()}
              >
                <Image
                  src="/images/down-arrow.png"
                  alt=""
                  width={12}
                  height={9}
                />
              </Button>
            </div>
          </div>
        </Col>
        <Col sm={12} md={12} className="text-end">
          <div className="appointment-calender__buttons mt-4">
            <Button className="cancel me-3">Cancel</Button>
            <Button className="continue" onClick={handleAppointment}>
              Continue
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ScheduleAppointment;
