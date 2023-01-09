import Image from "next/image";
import { Button, Col, Container, Row } from "reactstrap";
import ConfirmModal from "../components/ConfirmModal";
import InnerHeader from "../components/InnerHeader";

export default () => {
  return (
    <>
      <InnerHeader />
      <div className="applicant-details">
        <Container>
          <Row>
            <Col xs={12} sm={12}>
              <h2 className="applicant-details__title">Applicant Details</h2>
              <div className="applicant-details__card--wrapper">
                <div className="applicant-details__card me-0 me-sm-3">
                  <div className="applicant-details__card--flex">
                    <div className="applicant-details__card--info">
                      <h4 className="applicant-details__card--title">
                        Daisy Marry
                      </h4>
                      <p className="applicant-details__card--text">
                        Application ID
                      </p>
                      <p className="applicant-details__card--id">OLK4746535</p>
                    </div>
                    <Image
                      src="/images/delete.png"
                      alt=""
                      width={14}
                      height={14}
                    />
                  </div>
                </div>
                <div className="applicant-details__card">
                  <div className="applicant-details__card--flex">
                    <div className="applicant-details__card--info">
                      <h4 className="applicant-details__card--title">
                        Daisy Marry
                      </h4>
                      <p className="applicant-details__card--text">
                        Application ID
                      </p>
                      <p className="applicant-details__card--id">OLK4746535</p>
                    </div>
                    <Image
                      src="/images/delete.png"
                      alt=""
                      width={14}
                      height={14}
                    />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <div className="appointment-calender">
            <Row>
              <Col md={10} lg={10} xl={10}>
                <h1>Calender Here</h1>
                <ConfirmModal />
                <h2 className="d-block d-md-none sel-time">Select Time</h2>
              </Col>
              <Col md={2} lg={2} xl={2}>
                <div className="appointment-calender__time">
                  <div className="appointment-calender__time--flex">
                    <Button className="appointment-calender__time--arrow">
                      <Image
                        src="/images/up-arrow.png"
                        alt=""
                        width={12}
                        height={9}
                      />
                    </Button>
                    <div className="appointment-calender__time--box">
                      <p className="time">09:00 AM</p>
                    </div>
                    <div className="appointment-calender__time--box">
                      <p className="time">09:00 AM</p>
                    </div>
                    <div className="appointment-calender__time--box selected">
                      <p className="time active">12:00 PM</p>
                    </div>
                    <div className="appointment-calender__time--box">
                      <p className="time">01:30 PM</p>
                    </div>
                    <div className="appointment-calender__time--box">
                      <p className="time">02:00 PM</p>
                    </div>
                    <div className="appointment-calender__time--box">
                      <p className="time">03:30 PM</p>
                    </div>
                    <Button className="appointment-calender__time--arrow">
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
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

