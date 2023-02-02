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
import { centerListFetchRequest } from "../redux/reducer/center-list";
import { holidayListFetchRequest } from "../redux/reducer/holiday-list";
import { appointmentScheduleFetchRequest } from "../redux/reducer/appointment";
import {
  applicationDetailsFetchRequest,
  applicationDetailsFetchMemberSuccess,
} from "../redux/reducer/application-detail";
// import { setMembers } from "../redux/action/index";
import loaderImg from "../public/images/loader-new.gif";

export default () => {
  const dispatch = useDispatch();
  const {
    userAppointmentDetails,
    //  members
  } = useSelector((state) => state.user);
  const { centerList } = useSelector((state) => state.centerList);
  const { holidayList } = useSelector((state) => state.holidayList);
  const { applicationDetails, memberDetails } = useSelector(
    (state) => state.applicationDetails,
  );
  const slider = useRef();
  const {
    push,
    query: { selectedService },
  } = useRouter();
  const router = useRouter();
  const [slideToShow, setSlideToShow] = useState(0);
  const [confirmCalendar, setConfirmCalendar] = useState(false);
  const [applicantDetail, setApplicantDetail] = useState();
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const [familyMember, setFamilyMember] = useState([]);
  const [deleteMember, setDeleteMember] = useState();
  const [members, setMembers] = useState([]);
  const [centersDetails, setCentersDetails] = useState({});
  const [isLoader, setIsLoader] = useState(false);
  const [applicantAppointment, setApplicantAppointment] = useState({
    date: "",
    time: arrayTime[slideToShow].time,
    location: "",
    amount: "",
  });

  const handleAddMember = (values) => {
    if (familyMember.length === 4) {
      toast.warn("You can't add more than 4 members ");
    } else {
      setApplicantDetail(values);
      setFamilyMember([...familyMember, { ...values }]);
      setModal(true);
    }
  };

  const modalToggle = () => {
    setModal(!modal);
    setConfirmCalendar(false);
  };

  const handleConfirm = () => {
    setIsLoader(true);
    setModal(false);
    const details = {
      applicationId: applicantDetail.application_id,
      dob: applicantDetail.dob,
      serviceType: selectedService,
    };
    dispatch(
      applicationDetailsFetchRequest(
        details,
        (success) => {
          if (applicationDetails.country === success.data.country) {
            setIsLoader(false);
            dispatch(
              applicationDetailsFetchMemberSuccess([
                ...memberDetails,
                success.data,
              ]),
            );
            toast.success("Applicant Addedd Successfully");
          } else {
            toast.warn("Member not same");
            setIsLoader(false);
          }
        },
        (error) => {
          setIsLoader(false);
          toast.error(error.message);
        },
      ),
    );
  };

  const handleDeleteApplicant = (data, i) => {
    setDeleteMember(data);
    setDeleteModal(true);
    setDeleteId(i);
  };

  const deleteToggle = () => {
    setDeleteModal(!deleteModal);
  };

  const deleteConfirmation = (i) => {
    const data = [...memberDetails];
    data.splice(i, 1);
    dispatch(applicationDetailsFetchMemberSuccess(data));
    setDeleteModal(false);
    toast.success("Applicant Deleted Successfully");
  };

  const handleAppointment = () => {
    setModal(true);
    setConfirmCalendar(true);
  };

  const handlePaymentProceed = () => {
    const details = {
      application_id:
        selectedService === "Visa"
          ? userAppointmentDetails.appointmentDetails?.application_id
          : userAppointmentDetails.appointmentDetails?.id_number,
      center_id: centersDetails?.centerId,
      appointment_date: "",
      appointment_time: applicantAppointment.time,
      applicant_fullname:
        userAppointmentDetails.appointmentDetails?.name || "Chris",
      category: "",
      service_type: selectedService,
      status: centersDetails?.status,
    };
    dispatch(appointmentScheduleFetchRequest(details));
    push("/make-payment");
  };

  useEffect(() => {
    setApplicantAppointment((prev) => ({
      ...prev,
      time: arrayTime[slideToShow].time,
    }));
  }, [slideToShow, applicantAppointment.time]);

  useEffect(() => {
    dispatch(centerListFetchRequest());
  }, []);

  useEffect(() => {
    Object.keys(centersDetails).length > 0 &&
      dispatch(holidayListFetchRequest(centersDetails?.centerId));
  }, [centersDetails?.centerId]);

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
            applicationDetails={applicationDetails}
            members={memberDetails}
            handleDeleteApplicant={handleDeleteApplicant}
          />
          <div className="appointment-calender">
            <Row className="align-items-center">
              <Col md={10} lg={10} xl={10}>
                <Calendar
                  setApplicantAppointment={setApplicantAppointment}
                  applicantAppointment={applicantAppointment}
                  centerList={centerList}
                  setCentersDetails={setCentersDetails}
                  defaultCountry={applicationDetails.country}
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
                <div className="appointment-calender__buttons">
                  <Button
                    className="cancel-btn me-3"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                  <Button className="continue" onClick={handleAppointment}>
                    Continue
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <div className={isLoader && "loader"}>
        {isLoader && <img className="loader-img" src={loaderImg.src} alt="" />}
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
          members={members}
        />
      )}

      {deleteModal && (
        <DeleteModal
          deleteModal={deleteModal}
          setDeleteModal={setDeleteModal}
          deleteMember={deleteMember}
          deleteId={deleteId}
          deleteConfirmation={deleteConfirmation}
          deleteToggle={deleteToggle}
        />
      )}
    </>
  );
};
