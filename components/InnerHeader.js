import Image from "next/image";
import { Container, Label, Input, Row, Col, Button } from "reactstrap";
import Link from "next/link";
import Select from "react-select";
import { idType, nationalityOptions } from "../constants";

function InnerHeader() {
  return (
    <header className="inner-header">
      <Container>
        <Row className="inner-header__row">
          <Col md={1} lg={1} xl={1}>
            <Image
              className="inner-header__logo"
              width={80}
              height={80}
              src="/images/logo.png"
              alt=""
            />
          </Col>
          <Col md={11} lg={11} xl={11}>
            <div className="inner-header__member">
              {/* <div className="me-0 me-md-3 mb-3 mb-md-0">
                <Label for="Application ID">Application ID</Label>
                <Input
                  id="applicationID"
                  name="applicationID"
                  placeholder="01234567789"
                  type="text"
                  className="inner-header__input"
                />
              </div>
              <div className="me-0 me-md-3 mb-4 mb-md-0">
                <Label for="exampleDate">Date of Birth</Label>
                <Input
                  id="dob"
                  name="dob"
                  placeholder="date placeholder"
                  type="date"
                  className="inner-header__input"
                />
              </div> */}
              <div className="me-0 me-md-3 mb-3 mb-md-0">
                <Label for="Application ID">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  className="inner-header__input"
                />
              </div>
              <div className="me-0 me-md-3 mb-3 mb-md-0">
                <Label for="Nationality">Nationality</Label>
                <Select
                  options={nationalityOptions}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  value=""
                />
              </div>
              <div className="me-0 me-md-3 mb-3 mb-md-0">
                <Label for="Application ID">ID Type</Label>
                <Select
                  options={idType}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  value=""
                />
              </div>
              <div className="me-0 me-md-3 mb-3 mb-md-0">
                <Label for="id_number">ID Number</Label>
                <Input
                  id="id_number"
                  name="id_number"
                  type="text"
                  className="inner-header__input"
                  value=""
                />
              </div>
              <Button className="inner-header__member--btn">Add Member</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default InnerHeader;
