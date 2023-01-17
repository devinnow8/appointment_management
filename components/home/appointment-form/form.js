import React from "react";
import Select from "react-select";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";

function FormFields({
  selectedService,
  setSelectedService,
  setIsValidation,
  setValidationsError,
  serviceOptions,
  handle_change,
  inputFields,
  validationsError,
  handle_date_change,
  handle_select,
  handleContinue,
  nationalityOptions,
  idType,
}) {
  return (
    <form className="appointment-form__fields">
      <FormGroup>
        <Label for="exampleSelect">Select Service</Label>
        <Select
          defaultValue={selectedService}
          onChange={(selected) => {
            setSelectedService(selected);
            setIsValidation(false);
            setValidationsError({
              application_id: "",
              dob: "",
              name: "",
              nationality: "",
              id_type: "",
              id_number: "",
            });
          }}
          options={serviceOptions}
          className="react-select-container"
          classNamePrefix="react-select"
        />
      </FormGroup>
      <Row>
        {selectedService.label == "Visa" ? (
          <>
            <Col lg={6} xl={6}>
              <FormGroup>
                <Label for="application_id">
                  Application ID
                  <span className="star">*</span>
                </Label>
                <Input
                  id="application_id"
                  name="application_id"
                  placeholder="01234567789"
                  type="text"
                  onChange={handle_change}
                  value={inputFields.application_id}
                  className="appointment-form__input"
                />
                <div className="error-msg">
                  {validationsError.application_id}
                </div>
              </FormGroup>
            </Col>
            <Col lg={6} xl={6}>
              <FormGroup>
                <Label for="exampleDate">
                  Date of Birth
                  <span className="star">*</span>
                </Label>
                <Input
                  id="dob"
                  name="dob"
                  placeholder="date placeholder"
                  type="date"
                  className="appointment-form__input"
                  onChange={handle_date_change}
                  value={inputFields.dob}
                />
                <div className="error-msg">{validationsError.dob}</div>
              </FormGroup>
            </Col>
          </>
        ) : (
          <>
            <Col lg={6} xl={6}>
              <FormGroup>
                <Label for="name">
                  Name <span className="star">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="eg: Jhone Doe"
                  className="appointment-form__input"
                  value={inputFields.name}
                  onChange={handle_change}
                />
                <div className="error-msg">{validationsError.name}</div>
              </FormGroup>
            </Col>
            <Col lg={6} xl={6}>
              <FormGroup>
                <Label for="Nationality">
                  Nationality <span className="star">*</span>
                </Label>
                <Select
                  onChange={(e) => handle_select(e, "nationality")}
                  options={nationalityOptions}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  value={inputFields.nationality}
                />
                <div className="error-msg">{validationsError.nationality}</div>
              </FormGroup>
            </Col>
            <Col lg={6} xl={6}>
              <FormGroup>
                <Label for="id_type">
                  ID Type
                  <span className="star"> *</span>
                </Label>
                <Select
                  onChange={(e) => handle_select(e, "id_type")}
                  options={idType}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  value={inputFields.id_type}
                />
                <div className="error-msg">{validationsError.id_type}</div>
              </FormGroup>
            </Col>
            <Col lg={6} xl={6}>
              <FormGroup>
                <Label for="id_number">
                  ID Number
                  <span className="star"> *</span>
                </Label>
                <Input
                  id="id_number"
                  name="id_number"
                  type="text"
                  className="appointment-form__input"
                  onChange={handle_change}
                  value={inputFields.id_number}
                />
                <div className="error-msg">{validationsError.id_number}</div>
              </FormGroup>
            </Col>
          </>
        )}
      </Row>
      <FormGroup className="text-md-start text-center ">
        <div className="cont-btn" onClick={handleContinue}>
          Continue
        </div>
      </FormGroup>
    </form>
  );
}

export default FormFields;
