import React from "react";
import Image from "next/image";
import Select from "react-select";
import { Col, Container, FormGroup, Label, Row } from "reactstrap";
import Visa from "../service-type/Visa";
import Others from "../service-type/Others";

function ApplicationForm({
  selectedService,
  setSelectedService,
  categoryServiceOptions,
  handleContinue,
  isLoader,
}) {
  console.log(selectedService,'selectedServiceselectedService');
  return (
    <Container>
      <Row className="appointment-form__row">
        <Col md={6} lg={6} xl={6}>
          <div className="appointment-form__img--wrapper">
            <div className="appointment-form__img">
              <Image
                alt="img"
                src="/images/appoint-img.png"
                className="appointment-form__img img-fluid"
                height={380}
                width={490}
              />
            </div>
          </div>
        </Col>
        <Col md={6} lg={6} xl={6}>
          <div className="appointment-form__content">
            <h1 className="appointment-form__title">
              Welcome to <mark>OIS</mark> Appointment Booking System
            </h1>
            <p className="appointment-form__info">
              {" "}
              New Appointment / Reschedule Appointment / Cancel Appointment{" "}
            </p>

            <div className="appointment-form__fields">
              <FormGroup>
                <Label for="exampleSelect">Select Service</Label>
                <Select
                  value={selectedService}
                  onChange={(selected) => {
                    setSelectedService(selected);
                  }}
                  options={categoryServiceOptions}
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </FormGroup>
              <Row>
                {selectedService?.label == "Visa" ? (
                  <Visa handleContinue={handleContinue} isLoader={isLoader} />
                ) : (
                  <Others handleContinue={handleContinue} isLoader={isLoader} />
                )}
              </Row>
            </div>
            <p className="appointment-form_desc">
              If you have not completed your visa application, please{" "}
              <a href="https://portal.immigration.gov.ng/visa/freshVisa">
                visit
              </a>{" "}
              to complete your application, before returning to OIS to book your
              appointment.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ApplicationForm;
