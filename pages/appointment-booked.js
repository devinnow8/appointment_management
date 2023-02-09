import { Button, Col, Container, Row } from "reactstrap";
import Header from "../components/header";
import jsPDF from "jspdf";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { appointmentBookedPdfRequest } from "../redux/reducer/appointment-booked";

function AppointmentBooked() {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const { appointment } = useSelector((state) => state.appointmentSchedule);
  const { appointmentBookedPdf } = useSelector(
    (state) => state.appointmentBooked,
  );

  const printDocument = () => {
    const pdf = new jsPDF();
    pdf.text(
      `Requirements\n\n You will be required to present the following:\n\n 1. Valid ID(any of the following): \n
      a) Nigerian International Passport
      b) Nigerian National ID Card
      c) Nigerian Drivers License
      d) International Passport (Non Nigerian)
      `,
      10,
      10,
    );
    pdf.save("download.pdf");
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
                ${appointment.appointment_id}. A copy of the appointment slip and checklist have been
                sent to your email. Optionally you can download it by click the
                buttons given below.`}
              </p>
              <p className="apt-booked__para">
                In case you want to reschedule, Please{" "}
                <span style={{ cursor: "pointer" }} onClick={() => push("/")}>
                  click here
                </span>
                .
              </p>
              <div className="d-flex justify-content-center align-items-center">
                <Button
                  className="slip-btn mb-sm-0"
                  onClick={() => handlePrintSlip(appointment.appointment_id)}
                >
                  Print Booking Slip
                </Button>
                <Button className="checklist-btn" onClick={printDocument}>
                  Print Checklist
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default AppointmentBooked;
