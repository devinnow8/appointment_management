import React from "react";
import Image from "next/image";
import { Container, Row, Col } from "reactstrap";
import FormFields from "./form";

function AppointmentForm({
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
    <section className="appointment-form">
      <Container>
        <Row className="appointment-form__row">
          <Col md={6} lg={6} xl={6}>
            <div className="appointment-form__img--wrapper">
              <div className="appointment-form__img">
                <Image
                  alt="img"
                  src="/images/appoint-img.png"
                  className="appointment-form__img"
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

              <FormFields
                selectedService={selectedService}
                setSelectedService={setSelectedService}
                setIsValidation={setIsValidation}
                setValidationsError={setValidationsError}
                serviceOptions={serviceOptions}
                handle_change={handle_change}
                inputFields={inputFields}
                validationsError={validationsError}
                handle_date_change={handle_date_change}
                handle_select={handle_select}
                handleContinue={handleContinue}
                nationalityOptions={nationalityOptions}
                idType={idType}
              />
              <p className="appointment-form_desc">
                If you have not yet completed your application, then you can
                <a href="#"> click here </a> and complete it.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default AppointmentForm;
