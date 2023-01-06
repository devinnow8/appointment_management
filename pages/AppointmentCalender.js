import Image from "next/image";
import { Col, Container, Row } from "reactstrap";
import delIcon from "../public/images/delete.png";

function AppointmentCalender() {
  return (
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
                  <Image src={delIcon.src} alt="" width={14} height={14} />
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
                  <Image src={delIcon.src} alt="" width={14} height={14} />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AppointmentCalender;
