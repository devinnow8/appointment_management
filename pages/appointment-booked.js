import { Button, Col, Container, Row } from "reactstrap";
import Header from "../components/header";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  appointmentBookedPdfRequest,
  appointmentBookedChecklistRequest,
} from "../redux/reducer/appointment-booked";
import { useEffect } from "react";

function AppointmentBooked() {
  const {
    push,
    query: { centreId },
  } = useRouter();
  const dispatch = useDispatch();
  const { appointment } = useSelector((state) => state.appointmentSchedule);
  const { applicationDetails } = useSelector(
    (state) => state.applicationDetails,
  );

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

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, "", window.location.href);
    };
  }, [appointment.appointment_id, applicationDetails.appointmentId]);

  return (
    <>
      <Header />
      <section className="apt-booked">
        <Container>
          <Row>
            <Col sm={12} className="text-center">
              <img
                src="/images/apt-booked.png"
                className="apt-booked__img"
                alt=""
              />
              <h2 className="apt-booked__title">Appointment Booked</h2>
              <p className="apt-booked__para">
                {`Your appointment booking is complete, Appointment ID is:
                ${
                  applicationDetails.appointmentId !== undefined
                    ? applicationDetails.appointmentId
                    : appointment.appointment_id || appointment.application_id
                }. A copy of the appointment slip and checklist have been
                sent to your email (${
                  applicationDetails.email
                }). Optionally you can download it by click the
                buttons given below.`}
              </p>
              <p className="apt-booked__para">
                In case you want to reschedule, Please{" "}
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    push(
                      `reschedule-appointment/?appointmentId=${appointment?.appointment_id}`,
                    )
                  }
                >
                  click here
                </span>
                .
              </p>
              <div className="d-flex justify-content-center align-items-center">
                <Button
                  className="slip-btn mb-sm-0"
                  onClick={() =>
                    handlePrintSlip(
                      applicationDetails.appointmentId !== undefined
                        ? applicationDetails.appointmentId
                        : appointment.appointment_id ||
                            appointment.application_id,
                    )
                  }
                >
                  Print Booking Slip
                </Button>
                <Button
                  className="checklist-btn"
                  onClick={() => printDocument(centreId)}
                >
                  Print Checklist
                </Button>
              </div>
              <div className="text-center mt-4">
                <p className="back-home">
                  <span style={{ cursor: "pointer" }} onClick={() => push("/")}>
                    Back to Home
                  </span>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default AppointmentBooked;
