import { Col, Container, Row } from "reactstrap";
import Header from "../components/header";
import { useState, useEffect } from "react";
import CancelModal from "../components/cancel-modal";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import checkIcon from "../public/images/check-icon.png";
import {
  appointmentBookedPdfRequest,
  appointmentBookedChecklistRequest,
} from "../redux/reducer/appointment-booked";
import {
  applicationDetailsFetchSuccess,
  applicationDetailsFetchMemberSuccess,
} from "../redux/reducer/application-detail";
import { appointmentBookedDetailsRequest } from "../redux/reducer/appointment-booked";

function RescheduleAppointment() {
  const { push } = useRouter();
  const { applicationDetails } = useSelector(
    (state) => state.applicationDetails,
  );
  const dispatch = useDispatch();
  const [isCancel, setIsCancel] = useState(false);

  const handleReschedule = () => {
    push({
      pathname: "/book-appointment",
    });
  };

  useEffect(() => {
    if (window.location?.search?.includes("appointmentId")) {
      const appointmentIdParam = window.location?.search
        .split("/")[0]
        .split("=")[1];
      dispatch(
        appointmentBookedDetailsRequest(
          appointmentIdParam,
          (success) => {
            if (success.data.status === "Cancel") {
              push({
                pathname: "/",
              });
            } else {
              const tempArray = [];
              tempArray.push(success.data);
              dispatch(applicationDetailsFetchMemberSuccess(tempArray));
              dispatch(applicationDetailsFetchSuccess(success.data));
            }
          },
          (error) => {
            push({
              pathname: "/",
            });
          },
        ),
      );
    }
  }, [window?.location?.search]);

  const handlePrintSlip = async (id) => {
    dispatch(
      appointmentBookedPdfRequest(id, (success) => {
        const file = new Blob([success.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = fileURL;
        link.download = "AppointmentBooked.pdf";
        link.click();
      }),
    );
  };

  const printDocument = (id) => {
    const details = {
      centreId: id,
      serviceType: applicationDetails.category,
    };
    dispatch(
      appointmentBookedChecklistRequest(details, (success) => {
        const file = new Blob([success.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = fileURL;
        link.download = "AppointmentBookedChecklist.pdf";
        link.click();
      }),
    );
  };

  useEffect(() => {
    if (!applicationDetails.applicationId) {
      push("/");
    }
  }, [applicationDetails]);

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
                    {applicationDetails.country}
                  </span>
                </div>
              </div>
            </div>
            <div className="justify-content-between">
              <div className="mt-3 text-center">
                <button
                  className="secondary-outline-btn reschedule-btn  me-4"
                  onClick={handleReschedule}
                >
                  Reschedule
                </button>
                <button
                  className="secondary-outline-btn cancel-apt-btn"
                  onClick={() => setIsCancel(true)}
                >
                  Cancel Appointment
                </button>
              </div>
              <div className="mt-3 text-center">
                <button
                  className="primary-btn slip-btn me-4"
                  onClick={() =>
                    handlePrintSlip(applicationDetails.appointmentId)
                  }
                >
                  Print Booking Slip
                </button>
                <button
                  className="primary-outline-btn checklist-btn"
                  onClick={() => printDocument(applicationDetails.centerId)}
                >
                  Print Checklist
                </button>
              </div>
              <div className="text-center mt-4">
                <p className="back-home">
                  <span style={{ cursor: "pointer" }} onClick={() => push("/")}>
                    Back to Home
                  </span>
                </p>
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
