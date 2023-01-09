import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Link from "next/link";
import Select from "react-select";
import {
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const serviceOptions = [
    { value: "Visa", label: "Visa" },
    { value: "BVN Enrollment", label: "BVN Enrollment" },
    { value: "Passport Services", label: "Passport Services" },
    { value: "Premium Lounge(DLA)", label: "Premium Lounge(DLA)" },
    { value: "NIN Enrollment", label: "NIN Enrollment" },
  ];
  const nationalityOptions = [
    { value: "Nigeria", label: "Nigeria" },
    { value: "India", label: "India" },
    { value: "Japan", label: "Japan" },
    { value: "Singapore", label: "Singapore" },
    { value: "Switzerland", label: "Switzerland" },
  ];
  const idType = [
    { value: "Driving Licence", label: "Driving Licence" },
    { value: "Passport", label: "Passport" },
  ];
  const { push } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(serviceOptions[1]);
  const [isValidation, setIsValidation] = useState(false);
  const [validationsError, setValidationsError] = useState({
    application_id: "",
    dob: "",
    name: "",
    nationality: "",
    id_type: "",
    id_number: "",
  });
  const [inputFields, setInputFields] = useState({
    application_id: "",
    dob: "",
    name: "",
    nationality: "",
    id_type: "",
    id_number: "",
  });

  const handle_change = (e) => {
    const key = e.target.id;
    const temp = { ...inputFields };
    temp[key] = e.target.value;
    setInputFields(temp);
  };

  const handle_select = (value, id) => {
    const temp = { ...inputFields };
    temp[id] = value;
    setInputFields(temp);
  };
  const handle_date_change = (e) => {
    const temp = { ...inputFields };
    temp["dob"] = e.target.value;
    setInputFields(temp);
  };

  const navbarToggle = () => setIsOpen(!isOpen);

  const handleContinue = () => {
    setIsValidation(true);
    if (selectedService.label !== "Visa") {
      if (
        inputFields.name.trim() !== "" &&
        inputFields.nationality.label.trim() !== "" &&
        inputFields.id_type.label.trim() !== "" &&
        inputFields.id_number.trim() !== ""
      ) {
        push({
          pathname: "/book-appointment",
          query: { selectedService: selectedService.label },
        });
      } else {
        let errors = { ...validationsError };

        if (!inputFields.name.trim()) errors.name = "This Field is required";
        else errors.name = "";

        if (!inputFields.nationality.label?.trim())
          errors.nationality = "This Field is required";
        else errors.nationality = "";

        if (!inputFields.id_type.label?.trim())
          errors.id_type = "This Field is required";
        else errors.id_type = "";

        if (!inputFields.id_number.trim())
          errors.id_number = "This Field is required";
        else errors.id_number = "";

        setValidationsError(errors);
      }
    } else {
      if (
        inputFields.application_id.trim() !== "" &&
        inputFields.dob.trim() !== ""
      ) {
        push({
          pathname: "/book-appointment",
          query: { selectedService: selectedService.label },
        });
      } else {
        let errors = { ...validationsError };

        if (!inputFields.application_id.trim())
          errors.application_id = "This Field is required";
        else errors.application_id = "";

        if (!inputFields.dob.trim()) errors.dob = "This Field is required";
        else errors.dob = "";

        setValidationsError(errors);
      }
    }
  };

  useEffect(() => {
    if (isValidation) {
      if (selectedService.label !== "Visa") {
        let errors = { ...validationsError };

        if (!inputFields.name.trim()) errors.name = "This Field is required";
        else errors.name = "";

        if (!inputFields.nationality.label?.trim())
          errors.nationality = "This Field is required";
        else errors.nationality = "";

        if (!inputFields.id_type.label?.trim())
          errors.id_type = "This Field is required";
        else errors.id_type = "";

        if (!inputFields.id_number.trim())
          errors.id_number = "This Field is required";
        else errors.id_number = "";

        setValidationsError(errors);
      } else {
        let errors = { ...validationsError };

        if (!inputFields.application_id.trim())
          errors.application_id = "This Field is required";
        else errors.application_id = "";

        if (!inputFields.dob.trim()) errors.dob = "This Field is required";
        else errors.dob = "";

        setValidationsError(errors);
      }
    }
  }, [
    isValidation,
    inputFields.application_id,
    inputFields.dob,
    inputFields.id_number,
    inputFields.id_type,
    inputFields.name,
    inputFields.nationality,
  ]);

  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="header">
        <Container>
          <Navbar>
            <NavbarBrand href="/">
              <Image
                src="/images/logo.png"
                className="header-img"
                alt=""
                width={80}
                height={80}
              />
            </NavbarBrand>
            <NavbarToggler onClick={navbarToggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="me-auto" navbar></Nav>
            </Collapse>
          </Navbar>
        </Container>
      </header>
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
                            <div className="error-msg">
                              {validationsError.dob}
                            </div>
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
                            <div className="error-msg">
                              {validationsError.name}
                            </div>
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
                            <div className="error-msg">
                              {validationsError.nationality}
                            </div>
                          </FormGroup>
                        </Col>
                        <Col lg={6} xl={6}>
                          <FormGroup>
                            <Label for="id_type">
                              ID Type
                              <span className="star">*</span>
                            </Label>
                            <Select
                              onChange={(e) => handle_select(e, "id_type")}
                              options={idType}
                              className="react-select-container"
                              classNamePrefix="react-select"
                              value={inputFields.id_type}
                            />
                            <div className="error-msg">
                              {validationsError.id_type}
                            </div>
                          </FormGroup>
                        </Col>
                        <Col lg={6} xl={6}>
                          <FormGroup>
                            <Label for="id_number">
                              ID Number
                              <span className="star">*</span>
                            </Label>
                            <Input
                              id="id_number"
                              name="id_number"
                              type="text"
                              className="appointment-form__input"
                              onChange={handle_change}
                              value={inputFields.id_number}
                            />
                            <div className="error-msg">
                              {validationsError.id_number}
                            </div>
                          </FormGroup>
                        </Col>
                      </>
                    )}
                  </Row>
                  <FormGroup className="text-md-start text-center ">
                    <div
                      className="cont-btn"
                      // href="/book-appointment"
                      onClick={handleContinue}
                    >
                      Continue
                    </div>
                  </FormGroup>
                </form>
                <p className="appointment-form_desc">
                  If you have not yet completed your application, then you can
                  <a href="#"> click here </a> and complete it.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
