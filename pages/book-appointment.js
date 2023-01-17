import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Col, Container, Row } from "reactstrap";
import {
  Header,
  Applicants,
  Calendar,
  ConfirmModal,
  TimeSlots,
} from "../components/book-appointment";
import { confirm } from "../components/book-appointment/schedule-appointment/utils";
import { arrayTime } from "../constants/index";
import loader from "../public/images/loader.gif";
import { setMembers, setVisaMembers } from "../redux/action";

export default () => {
  const { userAppointmentDetails, members, visaMembers } = useSelector(
    (state) => state,
  );
  const dispatch = useDispatch();
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

  const modalToggle = () => {
    setModal(!modal);
    setConfirmCalendar(false);
  };

  const handleConfirm = () => {
    confirm(
      setLoaderConfirm,
      setIsConfirm,
      selectedService,
      applicantDetail,
      dispatch,
      setVisaMembers,
      toast,
      setMembers,
      setModal,
      setApplicantDetail,
      visaMembers,
      members,
    );
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
    toast.success("Applicant Deleted Successfully");
  };

  const handleAppointment = () => {
    setModal(true);
    setConfirmCalendar(true);
  };

  const handlePaymentProceed = () => {
    push("/make-payment");
  };

  useEffect(() => {
    setApplicantAppointment((prev) => ({
      ...prev,
      time: arrayTime[slideToShow].time,
    }));
  }, [slideToShow, applicantAppointment.time]);

  return (
    <>
      <Header
        setApplicantDetail={setApplicantDetail}
        applicantDetail={applicantDetail}
        modalToggle={handleAddMember}
        selectedService={selectedService}
        validationsError={validationsError}
      />
      <div className="applicant-details calendar-time">
        <Container>
          {loaderConfirm && (
            <div className="loader">
              <img src={loader.src} className="loader-img" alt="" />
            </div>
          )}
          <Applicants
            userAppointmentDetails={userAppointmentDetails}
            selectedService={selectedService}
            visaMembers={visaMembers}
            members={members}
            handleDeleteApplicant={handleDeleteApplicant}
          />
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
                      onClick={() => slider.current.slickPrev()}
                    >
                      <Image
                        src="/images/up-arrow.png"
                        alt=""
                        width={12}
                        height={9}
                      />
                    </Button>
                    <TimeSlots
                      slider={slider}
                      arrayTime={arrayTime}
                      slideToShow={slideToShow}
                      setSlideToShow={setSlideToShow}
                    />
                    <Button
                      className="appointment-calender__time--arrow"
                      onClick={() => slider.current.slickNext()}
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
