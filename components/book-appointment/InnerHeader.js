import Image from "next/image";
import { Container, Label, Input, Row, Col, Button } from "reactstrap";
import Select from "react-select";
import { idType, nationalityOptions } from "../../constants";

function InnerHeader({
  setApplicantDetail,
  applicantDetail,
  modalToggle,
  selectedService,
  validationsError,
}) {
  const handle_change = (e) => {
    const key = e.target.id;
    const temp = { ...applicantDetail };
    temp[key] = e.target.value;
    setApplicantDetail(temp);
  };

  const handle_date_change = (e) => {
    const temp = { ...applicantDetail };
    temp["dob"] = e.target.value;
    setApplicantDetail(temp);
  };

  const handle_select = (value, id) => {
    const temp = { ...applicantDetail };
    temp[id] = value;
    setApplicantDetail(temp);
  };

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
              {selectedService === "Visa" ? (
                <>
                  <div className="me-0 me-md-3 mb-3 mb-md-0">
                    <Label for="Application ID">Application ID</Label>
                    <Input
                      id="application_id"
                      name="application_id"
                      placeholder="01234567789"
                      type="text"
                      className="inner-header__input"
                      onChange={handle_change}
                      value={applicantDetail.application_id}
                    />
                    <div className="error-msg">
                      {validationsError.application_id}
                    </div>
                  </div>
                  <div className="me-0 me-md-3 mb-4 mb-md-0">
                    <Label for="exampleDate">Date of Birth</Label>
                    <Input
                      id="dob"
                      name="dob"
                      placeholder="date placeholder"
                      type="date"
                      className="inner-header__input"
                      onChange={handle_date_change}
                      value={applicantDetail.dob}
                    />
                    <div className="error-msg">{validationsError.dob}</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="me-0 me-md-3 mb-3 mb-md-0">
                    <Label for="Application ID">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      className="inner-header__input"
                      placeholder="eg: Jhone Doe"
                      value={applicantDetail.name}
                      onChange={handle_change}
                    />
                    <div className="error-msg">{validationsError.name}</div>
                  </div>
                  <div className="me-0 me-md-3 mb-3 mb-md-0">
                    <Label for="Nationality">Nationality</Label>
                    <Select
                      options={nationalityOptions}
                      className="react-select-container"
                      classNamePrefix="react-select"
                      onChange={(e) => handle_select(e, "nationality")}
                      value={applicantDetail.nationality}
                    />
                    <div className="error-msg">
                      {validationsError.nationality}
                    </div>
                  </div>
                  <div className="me-0 me-md-3 mb-3 mb-md-0">
                    <Label for="Application ID">ID Type</Label>
                    <Select
                      onChange={(e) => handle_select(e, "id_type")}
                      options={idType}
                      className="react-select-container"
                      classNamePrefix="react-select"
                      value={applicantDetail.id_type}
                    />
                    <div className="error-msg">{validationsError.id_type}</div>
                  </div>
                  <div className="me-0 me-md-3 mb-3 mb-md-0">
                    <Label for="id_number">ID Number</Label>
                    <Input
                      id="id_number"
                      name="id_number"
                      type="text"
                      onChange={handle_change}
                      value={applicantDetail.id_number}
                      className="inner-header__input"
                    />
                    <div className="error-msg">
                      {validationsError.id_number}
                    </div>
                  </div>
                </>
              )}

              <Button
                className="inner-header__member--btn"
                onClick={modalToggle}
              >
                Add Member
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default InnerHeader;
