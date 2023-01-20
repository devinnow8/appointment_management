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
import DeleteModal from "../components/book-appointment/DeleteModal";
import { arrayTime } from "../constants/index";

export default () => {
  const { userAppointmentDetails } = useSelector((state) => state.user);
  const slider = useRef();
  const {
    push,
    query: { selectedService },
  } = useRouter();

  const [slideToShow, setSlideToShow] = useState(0);
  const [confirmCalendar, setConfirmCalendar] = useState(false);
  const [applicantDetail, setApplicantDetail] = useState();
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(false);

  const [members, setMembers] = useState([]);

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

  const modalToggle = () => {
    setModal(!modal);
    setConfirmCalendar(false);
  };

  const handleConfirm = () => {
    setMembers([...members, { ...applicantDetail }]);
    setModal(false);
    toast.success("Applicant Addedd Successfully");
  };

  const handleDeleteApplicant = (i) => {
    setDeleteModal(true);
    setDeleteId(i);
  };

  const deleteConfirmation = () => {
    const data = [...members];
    data.splice(i, 1);
    setMembers(data);
    setDeleteModal(false);
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
          <Applicants
            userAppointmentDetails={userAppointmentDetails}
            selectedService={selectedService}
            members={members}
            handleDeleteApplicant={handleDeleteApplicant}
          />
          <div className="appointment-calender">
            <Row className="align-items-center">
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
                  <Button className="cancel-btn me-3">Cancel</Button>
                  <Button className="continue" onClick={handleAppointment}>
                    Continue
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      {modal && (
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
      )}

      {deleteModal && <DeleteModal />}
    </>
  );
};
