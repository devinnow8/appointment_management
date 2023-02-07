import { Col, Container, Row } from "reactstrap";
import Header from "../components/header";
import { useState, useEffect } from "react";
import CancelModal from "../components/cancel-modal";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

function RescheduleAppointment() {
  const { push } = useRouter();
  const { applicationDetails } = useSelector(
    (state) => state.applicationDetails,
  );
  const { centerList } = useSelector((state) => state.centerList);
  const [isCancel, setIsCancel] = useState(false);
  // const centerName =
  //   centerList.length > 0 &&
  //   centerList.filter(
  //     (data) => data?.centerId === applicationDetails?.centerId,
  //   );
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
            <h2 className="appointment-booking-title">
              Your Appointment is already Booked{" "}
            </h2>
            <div className="appointment-booking-details">
              <div className="appointment-booking-details-list">
                <span className="booking-details-field">Name</span>
                <span className="booking-details-value">
                  {applicationDetails.applicantFullName}
                </span>
              </div>
              <div className="appointment-booking-details-list">
                <span className="booking-details-field">Application ID</span>
                <span className="booking-details-value">
                  {applicationDetails.applicationId}
                </span>
              </div>
              <div className="appointment-booking-details-list">
                <span className="booking-details-field">Date</span>
                <span className="booking-details-value">
                  {applicationDetails.appointmentDate}
                </span>
              </div>
              <div className="appointment-booking-details-list">
                <span className="booking-details-field">Time</span>
                <span className="booking-details-value">
                  {applicationDetails.appointmentTime}
                </span>
              </div>
              <div className="appointment-booking-details-list">
                <span className="booking-details-field">Location</span>
                <span className="booking-details-value">
                  {/* {centerName[0]?.centerName} */}
                  {applicationDetails.country}
                </span>
              </div>
            </div>
            <div className="justify-content-between">
              <div className="mt-3 text-center">
                <button className="secondary-outline-btn me-2">
                  Print Booking Slip
                </button>
                <button className="secondary-outline-btn">
                  Print Checklist
                </button>
              </div>
              <div className="mt-3 text-center">
                <button className="primary-btn me-2" onClick={handleReschedule}>
                  Reschedule
                </button>
                <button
                  className="primary-outline-btn"
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
