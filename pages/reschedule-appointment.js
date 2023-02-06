import { Button, Col, Container, Row } from "reactstrap";
import Header from "../components/header";
import { useRouter } from "next/router";
import { useState } from "react";
import CancelModal from "../components/cancel-modal";

function RescheduleAppointment() {
  const { push } = useRouter();
  const [isCancel, setIsCancel] = useState(false)
  return (
    <>
      <Header />
      <Container>
        <Row className="justify-content-center appointment-booking">
          <Col sm={10} md={10} lg={5} >
          <h2 className="appointment-booking-title">Your Appointment is already Booked  </h2>
          <div className="appointment-booking-details">
            <div className="appointment-booking-details-list"><span className="booking-details-field">Name</span><span className="booking-details-value">Jhon Smith doe</span></div>
            <div className="appointment-booking-details-list"><span className="booking-details-field">Application ID</span><span className="booking-details-value">V1156574R57</span></div>
            <div className="appointment-booking-details-list"><span className="booking-details-field">Date</span><span className="booking-details-value">May 25,2022</span></div>
            <div className="appointment-booking-details-list"><span className="booking-details-field">Time</span><span className="booking-details-value">12:00 PM</span></div>
            <div className="appointment-booking-details-list"><span className="booking-details-field">Location</span><span className="booking-details-value">London, UK</span></div>
          </div>
          <div className="justify-content-between">
            <div className="mt-3 text-center">
            <button className="secondary-outline-btn me-2">Print Booking Slip</button>
            <button className="secondary-outline-btn">Print Checklist</button>
            </div>
            <div className="mt-3 text-center">
         <button className="primary-btn me-2">Reschedule</button>
            <button className="primary-outline-btn" onClick={()=>setIsCancel(true)}>Cancel Appointment</button>
         </div>
          </div>
       
          </Col>
        </Row>

        {isCancel && (
        <CancelModal
        isCancel={isCancel}
          setIsCancel={setIsCancel}
        />
      )}

      </Container>
    </>
  );
}

export default RescheduleAppointment;
