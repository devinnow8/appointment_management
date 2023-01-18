import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Col, Container, Row } from "reactstrap";
import {
  Applicants,
  Calendar,
  ConfirmModal,
  Header,
  TimeSlots,
} from "../components/book-appointment";
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
  const [loaderConfirm, setLoaderConfirm] = useState(false);
  const [applicantDetail, setApplicantDetail] = useState({
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

  const handleAddMember = (values) => {
    setApplicantDetail(values);
    setModal(true);
  };
  const [modal, setModal] = useState(false);

  const modalToggle = () => {
    setModal(!modal);
    setConfirmCalendar(false);
  };

  const handleConfirm = () => {
    setLoaderConfirm(true);
    if (selectedService === "Visa") {
      const obj = {
        name: applicantDetail.name,
        application_id: applicantDetail.application_id,
        dob: applicantDetail.dob,
      };
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
        handleAddMember={handleAddMember}
        selectedService={selectedService}
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

                <h2 className="d-block d-md-none sel-time">Select Time</h2>
              </Col>
              <Col md={2} lg={2} xl={2}>
                <TimeSlots
                  slider={slider}
                  arrayTime={arrayTime}
                  slideToShow={slideToShow}
                  setSlideToShow={setSlideToShow}
                />
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
    </>
  );
};
