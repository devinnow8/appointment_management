import React from "react";
import Image from "next/image";
import Select from "react-select";
import { Col, Container, FormGroup, Input, Label, Row } from "reactstrap";
import Visa from "../service-type/Visa";
import Others from "../service-type/Others";

function ApplicationForm({
  selectedService,
  setSelectedService,
  categoryServiceOptions,
  handleContinue,
  isLoader,
}) {
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
            <div className="appointment-form__tabs">
              <button className="tab-btn active">New Appointment</button>
              <button className="tab-btn">Reschedule Appointment</button>
              <button className="tab-btn"> Cancel Appointment</button>
            </div>

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
                {!selectedService?.label ||
                selectedService?.label?.toLowerCase() === "visa" ? (
                  <Visa handleContinue={handleContinue} isLoader={isLoader} />
                ) : (
                  <Others handleContinue={handleContinue} isLoader={isLoader} />
                )}
              </Row>
            </div>

            <div>
              <Label for="application_id">
                Tracking ID
                <span className="star">*</span>
              </Label>
              <Input
                id="application_id"
                name="application_id"
                placeholder="01234567789"
                type="text"
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                // value={formik.values.application_id}
                className="appointment-form__input"
              />
              {/* {formik.errors.application_id && formik.touched.application_id ? (
                <div className="error-msg">{formik.errors.application_id}</div>
              ) : (
                <div className="no-error-msg"></div>
              )} */}
            </div>
            <p className="appointment-form_desc">
              If you have not completed your visa application, please{" "}
              <a
                href="https://portal.immigration.gov.ng/visa/freshVisa"
                target="_blank"
              >
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
