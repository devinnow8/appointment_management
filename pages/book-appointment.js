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
import { useSelector, useDispatch } from "react-redux";
import { setMembers, setVisaMembers } from "../components/redux/action";

import Calendar from "../components/Calendar";

export default () => {
  const { userAppointmentDetails, members, visaMembers } = useSelector(
    (state) => state,
  );
  const dispatch = useDispatch();

  const arrayTime = [
    { id: 1, time: "09:00 AM" },
    { id: 2, time: "10:00 AM" },
    { id: 3, time: "11:00 AM" },
    { id: 4, time: "12:00 PM" },
    { id: 5, time: "13:00 PM" },
    { id: 6, time: "14:00 PM" },
  ];
  const slider = useRef();
  const {
    push,
    query: { selectedService },
  } = useRouter();
  const [slideToShow, setSlideToShow] = useState(0);

  const [confirmCalendar, setConfirmCalendar] = useState(false);
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
    time: arrayTime[slideToShow].time,
    location: "",
    amount: "",
  });
  const [modal, setModal] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          vertical: false,
          verticalSwiping: false,
        },
      },
    ],
    beforeChange: function (currentSlide, nextSlide) {
      // setSlideToShow(nextSlide);
    },
    afterChange: function (currentSlide) {
      setSlideToShow(currentSlide);
    },
  };

  const modalToggle = () => {
    setModal(!modal);
    setConfirmCalendar(false);
  };

  const handleConfirm = () => {
    setLoaderConfirm(true);
    setIsConfirm(true);
    if (selectedService === "Visa") {
      const obj = {
        name: applicantDetail.name,
        application_id: applicantDetail.application_id,
        dob: applicantDetail.dob,
      };
      // setApplicantsData([...applicantsData, obj]);
      dispatch(setVisaMembers([...visaMembers, obj]));
      setLoaderConfirm(false);
      toast.success("Applicant Addedd Successfully");
    } else {
      const obj = {
        name: applicantDetail.name,
        nationality: applicantDetail.nationality,
        id_type: applicantDetail.id_type,
        id_number: applicantDetail.id_number,
      };
      dispatch(setMembers([...members, obj]));

      // setApplicantsData([...applicantsData, obj]);
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
    if (selectedService === "Visa") {
      const data = [...visaMembers];
      data.splice(i, 1);
      dispatch(setVisaMembers(data));
    } else {
      const data = [...members];
      data.splice(i, 1);
      dispatch(setMembers(data));
    }
    // setApplicantsData(data);
    toast.success("Applicant Deleted Successfully");
  };

  const previousClick = () => {
    slider.current.slickPrev();
  };

  const nextClick = () => {
    slider.current.slickNext();
  };

  const handleAppointment = () => {
    setModal(true);
    setConfirmCalendar(true);
  };

  const handlePaymentProceed = () => {
    push("/make-payment");
    // push({
    //   pathname: "/make-payment",
    //   query: {
    //     appointmentId:
    //       selectedService === "Visa"
    //         ? applicantDetail.application_id
    //         : applicantDetail.id_number,
    //     appointmentDate: applicantAppointment.date,
    //   },
    // });
  };

  useEffect(() => {
    setApplicantAppointment((prev) => ({
      ...prev,
      time: arrayTime[slideToShow].time,
    }));
  }, [slideToShow]);

  const handleTime = (index) => {
    setSlideToShow(index);
    slider.current.slickGoTo(index);
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
                        {userAppointmentDetails.appointmentDetails.name}
                      </h4>
                      <p className="applicant-details__card--text">
                        Application ID
                      </p>
                      <p className="applicant-details__card--id">
                        {selectedService === "Visa"
                          ? userAppointmentDetails.appointmentDetails
                              .application_id
                          : userAppointmentDetails.appointmentDetails.id_number}
                      </p>
                    </div>
                  </div>
                </div>
                {selectedService === "Visa" ? (
                  <>
                    {visaMembers.length > 0 &&
                      visaMembers.map((data, index) => (
                        <>
                          <div className="applicant-details__card me-0 me-sm-3">
                            <div className="applicant-details__card--flex">
                              <div className="applicant-details__card--info">
                                <p className="applicant-details__card--text">
                                  Application ID
                                </p>
                                <p className="applicant-details__card--id">
                                  {data.application_id}
                                </p>
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
                      ))}
                  </>
                ) : (
                  <>
                    {members.length > 0 &&
                      members.map((data, index) => (
                        <>
                          <div className="applicant-details__card me-0 me-sm-3">
                            <div className="applicant-details__card--flex">
                              <div className="applicant-details__card--info">
                                <h4 className="applicant-details__card--title">
                                  {data.name}
                                </h4>
                                <p className="applicant-details__card--text">
                                  Application ID
                                </p>
                                <p className="applicant-details__card--id">
                                  {data.id_number}
                                </p>
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
                      ))}
                  </>
                )}
              </div>
            </Col>
          </Row>
          <div className="appointment-calender">
            <Row>
              <Col md={10} lg={10} xl={10}>
                <Calendar
                  setApplicantAppointment={setApplicantAppointment}
                  applicantAppointment={applicantAppointment}
                />
                <ConfirmModal
                  modal={modal}
                  modalToggle={modalToggle}
                  applicantDetail={applicantDetail}
                  handleConfirm={handleConfirm}
                  selectedService={selectedService}
                  applicantAppointment={applicantAppointment}
                  confirmCalendar={confirmCalendar}
                  handlePaymentProceed={handlePaymentProceed}
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
                            onClick={() => handleTime(index)}
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
              <Col sm={12} md={12} className="text-end">
                <div className="appointment-calender__buttons mt-4">
                  <Button className="cancel me-3">Cancel</Button>
                  <Button className="continue" onClick={handleAppointment}>
                    Continue
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};
