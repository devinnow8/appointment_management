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
import { centerListFetchRequest } from "../redux/reducer/center-list";
import { holidayListFetchRequest } from "../redux/reducer/holiday-list";
import { appointmentSlotListFetchRequest } from "../redux/reducer/appointment-slot";
import { appointmentScheduleFetchRequest } from "../redux/reducer/appointment";
import {
  applicationDetailsFetchRequest,
  applicationDetailsFetchMemberSuccess,
} from "../redux/reducer/application-detail";
import moment from "moment";

export default () => {
  const dispatch = useDispatch();
  const { userAppointmentDetails } = useSelector((state) => state.user);
  const { centerList } = useSelector((state) => state.centerList);
  const { holidayList } = useSelector((state) => state.holidayList);
  const { appointmentSlotList } = useSelector(
    (state) => state.appointmentSlotList,
  );
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
  const [isLoader, setIsLoader] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [arrayTime,setArrayTime]= useState([])
  const [applicantAppointment, setApplicantAppointment] = useState({
    date: "",
    time: "",
    location: "",
    amount: "",
  });

  console.log(selectedCenter, 'selectedCenter==>', arrayTime, 'arrayTime==>', isLoader, 'isLoaderisLoader');

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
      serviceType: applicationDetails.category,
    };
    dispatch(
      applicationDetailsFetchRequest(
        details,
        (success) => {
          if (
            applicationDetails.country === success.data.country &&
            success.data.category === applicationDetails.category
          ) {
            setIsLoader(false);
            dispatch(
              applicationDetailsFetchMemberSuccess([
                ...memberDetails,
                success.data,
              ]),
            );
            toast.success("Applicant Addedd Successfully");
          } else {
            toast.warn("Application not found");
            setIsLoader(false);
          }
        },
        (error) => {
          setIsLoader(false);
          if (error.message.includes("Network Error")) {
            toast.error(error.message);
          } else {
            toast.error("Application not found");
          }
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
      // center_id: centersDetails?.centerId,
      appointment_date: "",
      appointment_time: applicantAppointment.time,
      applicant_fullname:
        userAppointmentDetails.appointmentDetails?.name || "Chris",
      category: "",
      service_type: selectedService,
      // status: centersDetails?.status,
    };
    dispatch(appointmentScheduleFetchRequest(details));
    push("/make-payment");
  };

  useEffect(() => {
    setApplicantAppointment((prev) => ({
      ...prev,
      time: arrayTime[slideToShow]?.fromTime,
    }));
  }, [centerList, applicationDetails]);

  useEffect(() => {
    setApplicantAppointment((prev) => ({
      ...prev,
      time: arrayTime[slideToShow]?.fromTime,
    }));
  }, [slideToShow, applicantAppointment.time]);

  useEffect(() => {
    dispatch(centerListFetchRequest());
  }, []);

  useEffect(() => {
    if(selectedCenter != undefined){
      setIsLoader(true)
      Object.keys(selectedCenter).length > 0 &&
        dispatch(holidayListFetchRequest(selectedCenter?.centerId));
      dispatch(appointmentSlotListFetchRequest(selectedCenter?.centerId, (success) => {
        console.log(success.status, 'success===>>>');
        setIsLoader(false)
      }));
    }
  }, [centerList, selectedCenter?.centerId]);

  useEffect(()=>{
    let day = moment(selectedDate).format('dddd')
    let filderdSlot = appointmentSlotList.filter((item)=> { 
      if(item.day === day && item.centerId === selectedCenter?.centerId){
        return item
      }
      })
    setArrayTime(filderdSlot)
   },[selectedDate,selectedCenter?.centerId, appointmentSlotList])

   console.log(slideToShow, 'slideToShow==>', arrayTime, 'arrayTime==>');
  return (
    <>
      <Header
        handleAddMember={handleAddMember}
        selectedService={applicationDetails.category}
      />
      <div className="applicant-details calendar-time">
        <Container>
          <Applicants
            members={memberDetails}
            handleDeleteApplicant={handleDeleteApplicant}
          />
          <div className="appointment-calender">
            <Row>
              <Col md={10} lg={10} xl={10}>
                <Calendar
                  setApplicantAppointment={setApplicantAppointment}
                  centerList={centerList}
                  applicationDetails={applicationDetails}
                  selectedCenter={selectedCenter}
                  setSelectedCenter={setSelectedCenter}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
                <h2 className="d-block d-md-none sel-time">Select Time</h2>
              </Col>
              <Col md={2} lg={2} xl={2}>
                <TimeSlots
                  slider={slider}
                  arrayTime={arrayTime}
                  slideToShow={slideToShow}
                  setSlideToShow={setSlideToShow}
          isLoader={isLoader}
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
          selectedService={applicationDetails.category}
          applicantAppointment={applicantAppointment}
          confirmCalendar={confirmCalendar}
          handlePaymentProceed={handlePaymentProceed}
          members={memberDetails}
          isLoader={isLoader}
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
