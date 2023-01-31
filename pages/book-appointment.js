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

export default () => {
  const dispatch = useDispatch();
  const { userAppointmentDetails } = useSelector((state) => state.user);
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
  const [countriesCenterList, setCountriesCenterList] = useState([]);
  const [members, setMembers] = useState([]);
  const [centersDetails, setCentersDetails] = useState({});
  const [applicantAppointment, setApplicantAppointment] = useState({
    date: "",
    time: arrayTime[slideToShow].time,
    location: "",
    amount: "",
  });

  console.log(
    applicationDetails,
    "applicationDetailsapplicationDetails",
    memberDetails,
  );

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
    setModal(false);
    const details = {
      applicationId: applicantDetail.application_id,
      dob: applicantDetail.dob,
      serviceType: selectedService,
    };
    dispatch(
      applicationDetailsFetchRequest(details, (success) => {
        if (applicationDetails.countryName === success.data.countryName) {
          dispatch(applicationDetailsFetchMemberSuccess(success.data));
          setMembers([...members, { ...memberDetails }]);
          toast.success("Applicant Addedd Successfully");
        } else {
          toast.warn("Member not same");
        }
      }),
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
  }, [centersDetails.centerId]);

  useEffect(() => {
    const updatedCenterList = centerList.map((centers) => {
      return {
        value: centers?.centerName,
        label: centers?.centerName,
      };
    });
    setCountriesCenterList(updatedCenterList);
  }, [centerList]);

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
            members={members}
            handleDeleteApplicant={handleDeleteApplicant}
          />
          <div className="appointment-calender">
            <Row className="align-items-center">
              <Col md={10} lg={10} xl={10}>
                <Calendar
                  setApplicantAppointment={setApplicantAppointment}
                  applicantAppointment={applicantAppointment}
                  countriesCenterList={countriesCenterList}
                  centerList={centerList}
                  setCentersDetails={setCentersDetails}
                  defaultCountry={applicationDetails.countryName}
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
