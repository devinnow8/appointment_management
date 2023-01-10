import Image from "next/image";
import { Button, Col, Container, Row } from "reactstrap";
import ConfirmModal from "../components/ConfirmModal";
import InnerHeader from "../components/InnerHeader";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import loader from "../public/images/loader.gif";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default () => {
  const slider = useRef();
  const {
    query: { selectedService },
  } = useRouter();
  const [slideToShow, setSlideToShow] = useState(0);

  const [isValidation, setIsValidation] = useState(false);
  const [loaderConfirm, setLoaderConfirm] = useState(false);
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
  const [applicantAppointment, setApplicantAppointment] = useState({
    date: "",
    time: "",
    location: "",
    amount: "",
  });
  const [applicantsData, setApplicantsData] = useState([]);

  const [modal, setModal] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  const settings = {
    dots: false,
    vertical: true,
    verticalSwiping: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    fade: false,
    afterChange: (currentSlide) => setSlideToShow(currentSlide),

    // responsive: [
    //   {
    //     breakpoint: 1366,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 1,
    //     },
    //   },
    //   {
    //     breakpoint: 992,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //       dots: true,
    //     },
    //   },
    // ],
  };

  const modalToggle = () => setModal(!modal);

  const handleConfirm = () => {
    setLoaderConfirm(true);
    setIsConfirm(true);
    if (selectedService === "Visa") {
      const obj = {
        name: applicantDetail.name,
        application_id: applicantDetail.application_id,
        dob: applicantDetail.dob,
      };
      setApplicantsData([...applicantsData, obj]);
      setLoaderConfirm(false);
      toast.success("Applicant Addedd Successfully");
    } else {
      const obj = {
        name: applicantDetail.name,
        nationality: applicantDetail.nationality,
        id_type: applicantDetail.id_type,
        id_number: applicantDetail.id_number,
      };
      setApplicantsData([...applicantsData, obj]);
      setLoaderConfirm(false);
      toast.success("Applicant Addedd Successfully");
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
    toast.success("Applicant Deleted Successfully");
  };

  const previousClick = () => {
    slider.current.slickPrev();
  };

  const nextClick = () => {
    slider.current.slickNext();
  };

  const arrayTime = [
    { id: 1, time: "09:00 AM" },
    { id: 2, time: "10:00 AM" },
    { id: 3, time: "11:00 AM" },
    { id: 4, time: "12:00 PM" },
    { id: 5, time: "13:00 PM" },
    { id: 6, time: "14:00 PM" },
  ];

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
          {loaderConfirm && (
            <div className="loader">
              <img src={loader.src} className="loader-img" alt="" />
            </div>
          )}
          <Row>
            <Col xs={12} sm={12}>
              <h2 className="applicant-details__title">Applicant Details</h2>
              <div className="applicant-details__card--wrapper">
                <div className="applicant-details__card me-0 me-sm-3">
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
                  </div>
                </div>
                {applicantsData.length > 0 &&
                  applicantsData.map((data, index) => {
                    return (
                      <>
                        <div className="applicant-details__card me-0 me-sm-3">
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
                  applicantAppointment={applicantAppointment}
                />
                <h2 className="d-block d-md-none sel-time">Select Time</h2>
              </Col>
              <Col md={2} lg={2} xl={2}>
                <div className="appointment-calender__time">
                  <div className="appointment-calender__time--flex">
                    <Button
                      className="appointment-calender__time--arrow"
                      onClick={previousClick}
                    >
                      <Image
                        src="/images/up-arrow.png"
                        alt=""
                        width={12}
                        height={9}
                      />
                    </Button>
                    <Slider ref={slider} {...settings}>
                      {arrayTime.map((item, index) => {
                        return (
                          <div
                            className="appointment-calender__time--box"
                            key={item.id}
                          >
                            <p
                              className={`time ${
                                index === slideToShow && "active"
                              }`}
                            >
                              {item.time}
                            </p>
                          </div>
                        );
                      })}
                    </Slider>
                    <Button
                      className="appointment-calender__time--arrow"
                      onClick={nextClick}
                    >
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
