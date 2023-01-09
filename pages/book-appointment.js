import Image from "next/image";
import { Button, Col, Container, Row } from "reactstrap";
import ConfirmModal from "../components/ConfirmModal";
import InnerHeader from "../components/InnerHeader";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default () => {
  const {
    query: { selectedService },
  } = useRouter();

  const [isValidation, setIsValidation] = useState(false);

  const [applicantDetail, setApplicantDetail] = useState({
    application_id: "",
    dob: "",
    name: "",
    nationality: "",
    id_type: "",
    id_number: "",
  });
  const [validationsError, setValidationsError] = useState({
    application_id: "",
    dob: "",
    name: "",
    nationality: "",
    id_type: "",
    id_number: "",
  });

  const [applicantsData, setApplicantsData] = useState([]);

  const [modal, setModal] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  const modalToggle = () => setModal(!modal);

  const handleConfirm = () => {
    setIsConfirm(true);
    if (selectedService === "Visa") {
      const obj = {
        name: applicantDetail.name,
        application_id: applicantDetail.application_id,
        dob: applicantDetail.dob,
      };
      setApplicantsData([...applicantsData, obj]);
    } else {
      const obj = {
        name: applicantDetail.name,
        nationality: applicantDetail.nationality,
        id_type: applicantDetail.id_type,
        id_number: applicantDetail.id_number,
      };
      setApplicantsData([...applicantsData, obj]);
    }

    setModal(false);
    setApplicantDetail({
      application_id: "",
      dob: "",
      name: "",
      nationality: "",
      id_type: "",
      id_number: "",
    });
  };

  const handleAddMember = () => {
    setIsValidation(true);
    if (selectedService !== "Visa") {
      if (
        applicantDetail.name.trim() !== "" &&
        applicantDetail.nationality.label?.trim() !== "" &&
        applicantDetail.id_type.label?.trim() !== "" &&
        applicantDetail.id_number.trim() !== ""
      ) {
        setModal(true);
      } else {
        let errors = { ...validationsError };

        if (!applicantDetail.name.trim())
          errors.name = "This Field is required";
        else errors.name = "";

        if (!applicantDetail.nationality.label?.trim())
          errors.nationality = "This Field is required";
        else errors.nationality = "";

        if (!applicantDetail.id_type.label?.trim())
          errors.id_type = "This Field is required";
        else errors.id_type = "";

        if (!applicantDetail.id_number.trim())
          errors.id_number = "This Field is required";
        else errors.id_number = "";

        setValidationsError(errors);
      }
    } else {
      if (
        applicantDetail.application_id.trim() !== "" &&
        applicantDetail.dob.trim() !== ""
      ) {
        setModal(true);
      } else {
        let errors = { ...validationsError };

        if (!applicantDetail.application_id.trim())
          errors.application_id = "This Field is required";
        else errors.application_id = "";

        if (!applicantDetail.dob.trim()) errors.dob = "This Field is required";
        else errors.dob = "";

        setValidationsError(errors);
      }
    }
  };

  useEffect(() => {
    if (isValidation && !isConfirm) {
      if (selectedService !== "Visa") {
        let errors = { ...validationsError };

        if (!applicantDetail.name.trim())
          errors.name = "This Field is required";
        else errors.name = "";

        if (!applicantDetail.nationality.label?.trim())
          errors.nationality = "This Field is required";
        else errors.nationality = "";

        if (!applicantDetail.id_type.label?.trim())
          errors.id_type = "This Field is required";
        else errors.id_type = "";

        if (!applicantDetail.id_number.trim())
          errors.id_number = "This Field is required";
        else errors.id_number = "";

        setValidationsError(errors);
      } else {
        let errors = { ...validationsError };

        if (!applicantDetail.application_id.trim())
          errors.application_id = "This Field is required";
        else errors.application_id = "";

        if (!applicantDetail.dob.trim()) errors.dob = "This Field is required";
        else errors.dob = "";

        setValidationsError(errors);
      }
    }
  }, [
    isValidation,
    applicantDetail.application_id,
    applicantDetail.dob,
    applicantDetail.id_number,
    applicantDetail.id_type,
    applicantDetail.name,
    applicantDetail.nationality,
    isConfirm,
    selectedService,
  ]);

  const handleDeleteApplicant = (i) => {
    const data = [...applicantsData];
    data.splice(i, 1);
    setApplicantsData(data);
  };

  return (
    <>
      <InnerHeader
        setApplicantDetail={setApplicantDetail}
        applicantDetail={applicantDetail}
        modalToggle={handleAddMember}
        selectedService={selectedService}
        validationsError={validationsError}
      />
      <div className="applicant-details">
        <Container>
          <Row>
            <Col xs={12} sm={12}>
              <h2 className="applicant-details__title">Applicant Details</h2>
              <div className="applicant-details__card--wrapper">
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
                    <Image
                      src="/images/delete.png"
                      alt=""
                      width={14}
                      height={14}
                    />
                  </div>
                </div>
                {applicantsData.length > 0 &&
                  applicantsData.map((data, index) => {
                    return (
                      <>
                        <div className="applicant-details__card">
                          <div className="applicant-details__card--flex">
                            <div className="applicant-details__card--info">
                              <h4 className="applicant-details__card--title">
                                {selectedService === "Visa" ? "" : data.name}
                              </h4>
                              <p className="applicant-details__card--text">
                                Application ID
                              </p>
                              {selectedService === "Visa" ? (
                                <p className="applicant-details__card--id">
                                  {data.application_id}
                                </p>
                              ) : (
                                <p className="applicant-details__card--id">
                                  {data.id_number}
                                </p>
                              )}
                            </div>
                            <Image
                              src="/images/delete.png"
                              alt=""
                              width={14}
                              height={14}
                              onClick={() => handleDeleteApplicant(index)}
                            />
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
            </Col>
          </Row>
          <div className="appointment-calender">
            <Row>
              <Col md={10} lg={10} xl={10}>
                <h1>Calender Here</h1>
                <ConfirmModal
                  modal={modal}
                  modalToggle={modalToggle}
                  applicantDetail={applicantDetail}
                  handleConfirm={handleConfirm}
                  selectedService={selectedService}
                />
                <h2 className="d-block d-md-none sel-time">Select Time</h2>
              </Col>
              <Col md={2} lg={2} xl={2}>
                <div className="appointment-calender__time">
                  <div className="appointment-calender__time--flex">
                    <Button className="appointment-calender__time--arrow">
                      <Image
                        src="/images/up-arrow.png"
                        alt=""
                        width={12}
                        height={9}
                      />
                    </Button>
                    <div className="appointment-calender__time--box">
                      <p className="time">09:00 AM</p>
                    </div>
                    <div className="appointment-calender__time--box">
                      <p className="time">09:00 AM</p>
                    </div>
                    <div className="appointment-calender__time--box selected">
                      <p className="time active">12:00 PM</p>
                    </div>
                    <div className="appointment-calender__time--box">
                      <p className="time">01:30 PM</p>
                    </div>
                    <div className="appointment-calender__time--box">
                      <p className="time">02:00 PM</p>
                    </div>
                    <div className="appointment-calender__time--box">
                      <p className="time">03:30 PM</p>
                    </div>
                    <Button className="appointment-calender__time--arrow">
                      <Image
                        src="/images/down-arrow.png"
                        alt=""
                        width={12}
                        height={9}
                      />
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};
