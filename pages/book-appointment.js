import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  ConfirmModal,
  Header,
  DetailSection,
  DeleteModal,
} from "../components/book-appointment";
import { centerListFetchRequest } from "../redux/reducer/center-list";
import { holidayListFetchRequest } from "../redux/reducer/holiday-list";
import { appointmentSlotListFetchRequest } from "../redux/reducer/appointment-slot";
import {
  applicationDetailsFetchRequest,
  applicationDetailsFetchMemberSuccess,
} from "../redux/reducer/application-detail";
import moment from "moment";

export default () => {
  const dispatch = useDispatch();
  const { centerList } = useSelector((state) => state.centerList);
  const { applicationDetails, memberDetails } = useSelector(
    (state) => state.applicationDetails,
  );
  const { holidayList } = useSelector((state) => state.holidayList);
  const { appointmentSlotList } = useSelector(
    (state) => state.appointmentSlotList,
  );
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
  const [arrayTime, setArrayTime] = useState([]);
  const [applicantAppointment, setApplicantAppointment] = useState({
    date: "",
    time: "",
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

  const deleteConfirmation = (i) => {
    const data = [...memberDetails];
    data.splice(i, 1);
    dispatch(applicationDetailsFetchMemberSuccess(data));
    setDeleteModal(false);
    toast.success("Applicant Deleted Successfully");
  };

  const handlePaymentProceed = () => {
    router.push({
      pathname: "/make-payment",
      query: {
        centreId: selectedCenter?.centerId,
        date: moment(applicantAppointment.date).format("DD/MM/YYYY"),
        time: applicantAppointment.time,
      },
    });
  };

  useEffect(() => {
    setApplicantAppointment((prev) => ({
      ...prev,
      time: arrayTime[slideToShow]?.fromTime,
    }));
  }, [centerList, applicationDetails, slideToShow, arrayTime]);

  useEffect(() => {
    dispatch(centerListFetchRequest());
  }, []);

  useEffect(() => {
    if (selectedCenter != undefined) {
      setIsLoader(true);
      Object.keys(selectedCenter).length > 0 &&
        dispatch(holidayListFetchRequest(selectedCenter?.centerId));
      dispatch(
        appointmentSlotListFetchRequest(selectedCenter?.centerId, (success) => {
          if (success.status === 200) {
            setIsLoader(false);
          }
        }),
      );
    }
  }, [centerList, selectedCenter?.centerId]);

  useEffect(() => {
    let day = moment(selectedDate).format("dddd");
    let filderdSlot = appointmentSlotList.filter((item) => {
      if (item.day === day && item.centerId === selectedCenter?.centerId) {
        return item;
      }
    });
    setArrayTime(filderdSlot);
  }, [selectedDate, selectedCenter?.centerId, appointmentSlotList]);
  return (
    <>
      <Header
        handleAddMember={handleAddMember}
      />
      <DetailSection
        handleDeleteApplicant={handleDeleteApplicant}
        arrayTime={arrayTime}
        slideToShow={slideToShow}
        setSlideToShow={setSlideToShow}
        isLoader={isLoader}
        applicantAppointment={applicantAppointment}
        setApplicantAppointment={setApplicantAppointment}
        selectedCenter={selectedCenter}
        setSelectedCenter={setSelectedCenter}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setModal={setModal}
        setConfirmCalendar={setConfirmCalendar}
      />
      {modal && (
        <ConfirmModal
          modal={modal}
          setModal={setModal}
          setConfirmCalendar={setConfirmCalendar}
          applicantDetail={applicantDetail}
          handleConfirm={handleConfirm}
          applicantAppointment={applicantAppointment}
          confirmCalendar={confirmCalendar}
          handlePaymentProceed={handlePaymentProceed}
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
        />
      )}
    </>
  );
};
