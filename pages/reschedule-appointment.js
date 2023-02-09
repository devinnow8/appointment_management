import { Col, Container, Row } from "reactstrap";
import Header from "../components/header";
import { useState, useEffect } from "react";
import CancelModal from "../components/cancel-modal";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import moment from "moment";
import checkIcon from "../public/images/check-icon.png";

function RescheduleAppointment() {
  const { push } = useRouter();
  const { applicationDetails } = useSelector(
    (state) => state.applicationDetails,
  );
  const [isCancel, setIsCancel] = useState(false);
  const handleReschedule = () => {
    push({
      pathname: "/book-appointment",
    });
  };

  useEffect(() => {
    if (applicationDetails.appointmentId === undefined) {
      push({
        pathname: "/",
      });
    }
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Row className="justify-content-center appointment-booking">
          <Col sm={10} md={10} lg={5}>
            <div className="text-center">
              <img src={checkIcon.src} className="check-icon" alt="" />
            </div>
            <h2 className="appointment-booking-title">You’re Booked!</h2>
            <div className="appointment-booking-details">
              <div className="appointment-booking-details-list">
                <div className="text-left">
                  <span className="booking-details-field">Name</span>
                </div>
                <div className="booking-details-div">
                  <span className="booking-details-value">
                    {applicationDetails.applicantFullName}
                  </span>
                </div>
              </div>
              <div className="appointment-booking-details-list">
                <span className="booking-details-field">Application ID</span>
                <div className="booking-details-div">
                  <span className="booking-details-value">
                    {applicationDetails.applicationId}
                  </span>
                </div>
              </div>
              <div className="appointment-booking-details-list">
                <span className="booking-details-field">
                  Date <span>(dd/mm/yyyy)</span>
                </span>
                <div className="booking-details-div">
                  <span className="booking-details-value">
                    {moment(applicationDetails.appointmentDate).format(
                      "DD/MM/YYYY",
                    )}
                  </span>
                </div>
              </div>
              <div className="appointment-booking-details-list">
                <span className="booking-details-field">Time</span>
                <div className="booking-details-div">
                  <span className="booking-details-value">
                    {applicationDetails.appointmentTime}
                  </span>
                </div>
              </div>
              <div className="appointment-booking-details-list">
                <span className="booking-details-field">Location</span>
                <div className="booking-details-div">
                  <span className="booking-details-value">
                    {/* {centerName[0]?.centerName} */}
                    {applicationDetails.country}
                  </span>
                </div>
              </div>
            </div>
            <div className="justify-content-between">
              <div className="mt-3 text-center">
                <button className="secondary-outline-btn slip-btn me-4">
                  Print Booking Slip
                </button>
                <button className="secondary-outline-btn checklist-btn">
                  Print Checklist
                </button>
              </div>
              <div className="mt-3 text-center">
                <button
                  className="primary-btn reschedule-btn me-4"
                  onClick={handleReschedule}
                >
                  Reschedule
                </button>
                <button
                  className="primary-outline-btn cancel-apt-btn"
                  onClick={() => setIsCancel(true)}
                >
                  Cancel Appointment
                </button>
              </div>
            </div>
          </Col>
        </Row>

        {isCancel && (
          <CancelModal isCancel={isCancel} setIsCancel={setIsCancel} />
        )}
      </Container>
    </>
  );
}

export default RescheduleAppointment;
