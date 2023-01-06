import Image from "next/image";
import { Container, FormGroup, Label, Input, Row, Col } from "reactstrap";
import logo from "../public/images/logo.png";

function InnerHeader() {
  return (
    <header className="inner-header">
      <Container>
        <Row>
          <Col md={3} lg={3} xl={3}>
            <div className="inner-header__logo">
              <Image layout="fill" src={logo.src} alt="" />
            </div>
          </Col>
          <Col md={9} lg={9} xl={9}>
            <div className="inner-header__member">
              <FormGroup className="me-0 me-md-3">
                <Label for="Application ID">Application ID</Label>
                <Input
                  id="applicationID"
                  name="applicationID"
                  placeholder="01234567789"
                  type="text"
                  className="inner-header__input"
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleDate">Date of Birth</Label>
                <Input
                  id="dob"
                  name="dob"
                  placeholder="date placeholder"
                  type="date"
                  className="inner-header__input"
                />
              </FormGroup>
            </div>
          </Col>
        </Row>
        {/* <div className="inner-header__flex"></div> */}
      </Container>
    </header>
  );
}

export default InnerHeader;
