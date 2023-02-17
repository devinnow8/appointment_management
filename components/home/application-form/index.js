import React, { useState, useEffect } from "react";
import Image from "next/image";
import Select from "react-select";
import { Col, Container, FormGroup, Input, Label, Row } from "reactstrap";
import Visa from "../service-type/Visa";
import Others from "../service-type/Others";
import Loader from "../../loader";
import { arrayTabs } from "../../../constants";

function ApplicationForm({
  selectedService,
  setSelectedService,
  categoryServiceOptions,
  handleContinue,
  isLoader,
  setAppointment,
  appointment,
  errorMsg,
  setErrorMsg,
}) {
  console.log(isLoader, "isLoader=>");
  const [isTrackingId, setIsTrackingId] = useState("");

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
              {arrayTabs.map((tab) => {
                return (
                  <button
                    className={`tab-btn ${appointment === tab && "active"}`}
                    onClick={() => {
                      setAppointment(tab);
                    }}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {appointment === "New Appointment" && (
              <>
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
                  <Row className="anim-row">
                    {!selectedService?.label ||
                    selectedService?.label?.toLowerCase() === "visa" ? (
                      <Visa
                        handleContinue={handleContinue}
                        isLoader={isLoader}
                      />
                    ) : (
                      <Others
                        handleContinue={handleContinue}
                        isLoader={isLoader}
                      />
                    )}
                  </Row>
                </div>
              </>
            )}

            {appointment !== "New Appointment" && (
              <>
                <div className="appointment-form__fields">
                  <div className="mb-3">
                    <Label for="application_id">
                      Tracking ID
                      <span className="star">*</span>
                    </Label>
                    <Input
                      id="application_id"
                      name="application_id"
                      placeholder="01234567789"
                      type="text"
                      onChange={(e) => {
                        setIsTrackingId(e.target.value);
                        setErrorMsg("");
                      }}
                      value={isTrackingId}
                      className="appointment-form__input"
                    />
                    <div className="error-msg">{errorMsg}</div>
                  </div>

                  <div className="text-md-start text-center ">
                    <button
                      className="cont-btn"
                      onClick={() => handleContinue(isTrackingId)}
                    >
                      Continue
                      <Loader isLoader={isLoader} />
                    </button>
                  </div>
                </div>
              </>
            )}

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
