import { Button, Col, Container, Row } from "reactstrap";
import Header from "../components/Header";

function AppointmentBooked() {
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
                Your appointment booking is complete, Appointment ID is:
                XYZ12345. A copy of the appointment slip and checklist have been
                sent to your email. Optionally you can download it by click the
                buttons given below.
              </p>
              <p className="apt-booked__para mb-5">
                In case you want to reschedule, Please <span>click here</span>.
              </p>
              <Button className="slip-btn mb-3 mb-sm-0">
                Print Booking Slip
              </Button>
              <Button className="checklist-btn">Print Checklist</Button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default AppointmentBooked;
