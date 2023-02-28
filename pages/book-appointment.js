import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  ConfirmModal,
  Header,
  DeleteModal,
  DetailSection,
} from "../components/book-appointment";
import { centerListFetchRequest } from "../redux/reducer/center-list";
import { holidayListFetchRequest } from "../redux/reducer/holiday-list";
import { appointmentSlotListFetchRequest } from "../redux/reducer/appointment-slot";
import { availableSlotListFetchRequest } from "../redux/reducer/available-slot";
import {
  applicationDetailsFetchRequest,
  applicationDetailsFetchMemberSuccess,
  applicationDetailsFetchSuccess,
} from "../redux/reducer/application-detail";
import { appointmentDetailsFetchRequest } from "../redux/reducer/appointment-details";
import moment from "moment";
import { rescheduleAppointmentFetchRequest } from "../redux/reducer/reschedule-appointment";
import { serviceListFetchRequest } from "../redux/reducer/service-list";
import { appointmentScheduleFetchRequest } from "../redux/reducer/appointment";
import { appointmentBookedDetailsRequest } from "../redux/reducer/appointment-booked";
import { appointmentDetailsFetchFailure } from "../redux/reducer/appointment-details";

export default () => {
  const dispatch = useDispatch();
  const { centerList } = useSelector((state) => state.centerList);
  const { applicationDetails, memberDetails } = useSelector(
    (state) => state.applicationDetails,
  );
  const { appointmentSlotList, isLoadingSlot } = useSelector(
    (state) => state.appointmentSlotList,
  );
  const { availableSlotList } = useSelector((state) => state.availableSlotList);
  const { appointmentDetails } = useSelector(
    (state) => state.appointmentDetails,
  );
  const { serviceList } = useSelector((state) => state.serviceList);
  const router = useRouter();
  const [slideToShow, setSlideToShow] = useState(0);
  const [isLoader, setIsLoader] = useState(false);
  const [confirmCalendar, setConfirmCalendar] = useState(false);
  const [applicantDetail, setApplicantDetail] = useState();
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const [deleteMember, setDeleteMember] = useState();
  const [selectedCenter, setSelectedCenter] = useState();
  const [isAddMember, setIsAddMember] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    !!appointmentDetails?.applicantAppointment?.date
      ? new Date(appointmentDetails?.applicantAppointment?.date)
      : !!applicationDetails.appointmentId
      ? new Date(applicationDetails.appointmentDate)
      : new Date(),
  );
  const [selectedCountry, setSelectedCountry] = useState({
    label: "",
    value: "",
  });

  const [arrayTime, setArrayTime] = useState([]);
  const [applicantAppointment, setApplicantAppointment] = useState({
    date: "",
    time: "",
    location: "",
    amount: "",
  });
  const [isAppointmentBooked, setIsAppointmentBooked] = useState(false);
  const [isAppointmentDetail, setIsAppointmentDetail] = useState({});
  const [updatedMembers, setUpdatedMembers] = useState([]);
  const totalAmount = serviceList.reduce((acc, obj) => {
    if (obj.per_person) return acc + obj.price * memberDetails.length;
    else return acc + obj.price;
  }, 0);

  useEffect(() => {
    if (!window.location?.search?.includes("appointmentId")) {
      if (!applicationDetails.applicationId) {
        router.push("/");
      }
    }
  }, [applicationDetails, window.location?.search]);

  useEffect(() => {
    let defaultSelectedCountry = "";
    if (centerList.length > 0) {
      let tmpSelectedCountry = applicationDetails.country;
      if (!!appointmentDetails.applicantAppointment) {
        tmpSelectedCountry = appointmentDetails.country;
      } else if (!!applicationDetails.appointmentId) {
        tmpSelectedCountry = applicationDetails.country;
      }
      const applicantCenter = centerList.find(
        (item) => !!item && item.country === tmpSelectedCountry,
      );
      if (applicantCenter) {
        defaultSelectedCountry = applicantCenter.country;
      } else {
        defaultSelectedCountry = centerList[0].country;
      }
    }
    setSelectedCountry({
      label: defaultSelectedCountry,
      value: defaultSelectedCountry,
    });
    const filteredCenterArray = centerList.filter(
      (centre) => defaultSelectedCountry === centre?.country,
    );
    const newCenterList = filteredCenterArray.map((centre) => {
      return {
        ...centre,
        value: centre?.centerId,
        label: centre?.centerName,
      };
    });

    let selectedCenterTemp = {};
    if (!!appointmentDetails.applicantAppointment) {
      const tmpCenter = newCenterList.find(
        (i) => i.label === appointmentDetails.applicantAppointment.location,
      );

      if (tmpCenter) {
        selectedCenterTemp = tmpCenter;
      }
    } else if (!!applicationDetails.appointmentId) {
      const tmpCenter = newCenterList.find(
        (i) => i.centerId === applicationDetails?.center?.centerId,
      );
      if (tmpCenter) {
        selectedCenterTemp = tmpCenter;
      }
    } else {
      selectedCenterTemp = newCenterList[0];
    }
    setSelectedCenter(selectedCenterTemp);
  }, [
    centerList,
    JSON.stringify(appointmentDetails),
    applicationDetails.appointmentId,
    window?.location?.search,
  ]);

  useEffect(() => {
    if (!applicationDetails.category.toLowerCase().includes("visa")) {
      const obtainedArray = memberDetails.map((member) => {
        return {
          application_id: member.id_number,
          appointment_date:
            applicantAppointment !== undefined &&
            moment(applicantAppointment?.date).format("YYYY-MM-DD"),
          center_id: selectedCenter?.centerId,
          appointment_time:
            applicantAppointment !== undefined && applicantAppointment?.time,
          appointment_day: moment(selectedDate).format("dddd"),
          applicant_fullname: member.name,
          category: member.category,
          service_type: member.category,
          // status: selectedCenter?.status,
          country: selectedCountry.label,
          email: member.email,
          phone_number: member.phone_number,
          price: totalAmount,
          id_number: member.id_number,
          id_type: member.id_type,
          email: member.email,
          nationality: member.nationality,
        };
      });
      setUpdatedMembers(obtainedArray);
    } else {
      const obtainedArray = memberDetails.map((member) => {
        return {
          application_id: member.applicationId,
          dob: member.dob,
          appointment_date:
            applicantAppointment !== undefined &&
            moment(applicantAppointment?.date).format("YYYY-MM-DD"),
          center_id: selectedCenter?.centerId,
          appointment_time:
            applicantAppointment !== undefined && applicantAppointment?.time,
          appointment_day: moment(selectedDate).format("dddd"),
          applicant_fullname: member.name,
          category: member.category,
          service_type: member.category,
          email: member.email,
          phone_number: member.phone_number,
          // status: selectedCenter?.status,
          country: member.country,
          price: totalAmount,
        };
      });
      setUpdatedMembers(obtainedArray);
    }
  }, [
    memberDetails,
    applicationDetails,
    selectedCenter?.centerId,
    applicantAppointment,
  ]);

  useEffect(() => {
    if (window.location?.search?.includes("appointmentId")) {
      const appointmentIdParam = window.location?.search
        .split("/")[0]
        .split("=")[1];
      dispatch(
        appointmentBookedDetailsRequest(
          appointmentIdParam,
          (success) => {
            if (success.data.status === "Cancel") {
              router.push({
                pathname: "/",
              });
            } else {
              const tempArray = [];
              tempArray.push(success.data);
              dispatch(applicationDetailsFetchMemberSuccess(tempArray));
              dispatch(applicationDetailsFetchSuccess(success.data));
              setSelectedDate(new Date(success.data.appointmentDate));
            }
          },
          (error) => {
            router.push({
              pathname: "/",
            });
          },
        ),
      );
    }
  }, [window?.location?.search]);

  const handleAddMember = (values) => {
    if (applicationDetails.category.toLowerCase().includes("visa")) {
      if (memberDetails.length === 5) {
        toast.warn("You can't add more than 4 members ");
      } else if (
        memberDetails.filter((x) => x.applicationId === values.application_id)
          .length > 0
      ) {
        toast.error("This application id is already existing ");
      } else {
        const details = {
          applicationId: values.application_id,
          dob: values.dob,
          serviceType: applicationDetails.category,
        };
        dispatch(
          applicationDetailsFetchRequest(
            details,
            (success) => {
              if (success.data.appointmentId !== undefined) {
                setApplicantDetail(values);
                setIsAppointmentBooked(true);
              } else {
                if (
                  applicationDetails.country === success.data.country &&
                  success.data.category === applicationDetails.category
                ) {
                  setModal(true);
                  setApplicantDetail(values);
                  setIsAppointmentDetail(success.data);
                } else {
                  toast.warn("Application not found");
                }
              }
            },
            (error) => {
              if (error.message.includes("Network Error")) {
                toast.error(error.message);
              } else {
                toast.error("Application not found");
              }
            },
          ),
        );
      }
    } else {
      if (memberDetails.length === 5) {
        toast.warn("You can't add more than 4 members ");
      } else if (applicationDetails.country !== values.nationality.label) {
        toast.error("Application should be of same country");
      } else if (
        memberDetails.filter((x) => x.applicationId === values.id_number)
          .length > 0
      ) {
        toast.error("This application id is already existing ");
      } else {
        const details = {
          name: values.name,
          country: values.nationality.label,
          nationality: values.nationality.label,
          id_type: values.id_type.label,
          applicationId: values.id_number,
          id_number: values.id_number,
          serviceType: applicationDetails.category,
          category: applicationDetails.category,
          email: values.email,
          phone_number: values.phone,
        };
        dispatch(
          applicationDetailsFetchRequest(
            details,
            (success) => {
              setIsAddMember(false);
              if (success.data.appointmentId !== undefined) {
                setApplicantDetail(values);
                setIsAppointmentBooked(true);
              } else {
                setModal(true);
                setApplicantDetail(values);
                setIsAppointmentDetail(success.data);
              }
            },
            (error) => {
              if (error.message.includes("Network Error")) {
                toast.error(error.message);
              } else {
                toast.error("Application not found");
              }
            },
          ),
        );
      }
    }
  };
  const handleConfirm = () => {
    setIsLoader(true);
    setModal(false);
    dispatch(
      applicationDetailsFetchMemberSuccess([
        ...memberDetails,
        isAppointmentDetail,
      ]),
      setIsLoader(false),
    );
    toast.success("Applicant Addedd Successfully");
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
    const details = {
      applicationDetails: applicationDetails,
      applicantAppointment: applicantAppointment,
      center:
        selectedCenter?.centerName.charAt(0).toUpperCase() +
        selectedCenter?.centerName.slice(1),
      centerId: selectedCenter.centerId,
      totalAmount: totalAmount,
      updatedMembers: updatedMembers,
      country: selectedCountry.label,
      currency: serviceList[0]?.currency_type,
    };
    dispatch(appointmentDetailsFetchRequest(details));
    router.push({
      pathname: "/make-payment",
      query: {
        centreId: selectedCenter?.centerId,
        status: selectedCenter?.status,
      },
    });
  };

  console.log(applicationDetails, "applicationDetails=>");
  const handleRescheduleAppointment = () => {
    const details = {
      date: moment(applicantAppointment.date).format("YYYY-MM-DD"),
      time: applicantAppointment?.time,
      appointmentId: applicationDetails.appointmentId,
      updated_by: applicationDetails.updated_date,
      role: "",
      email: applicationDetails.email,
    };
    dispatch(
      rescheduleAppointmentFetchRequest(details, (success) => {
        toast.success("Appointment Rescheduled Successfully");
        router.push({
          pathname: "/appointment-booked",
          query: {
            centreId: selectedCenter?.centerId,
          },
        });
      }),
    );
  };
  const handleFreeBooking = () => {
    dispatch(
      appointmentScheduleFetchRequest(
        updatedMembers,
        (success) => {
          router.push({
            pathname: "/appointment-booked",
            query: {
              centreId: selectedCenter?.centerId,
            },
          });
          dispatch(appointmentDetailsFetchFailure());
        },
        (error) => {
          toast.error("Something Went Wrong");
        },
      ),
    );
  };
  useEffect(() => {
    setApplicantAppointment((prev) => ({
      ...prev,
      time: arrayTime[slideToShow]?.fromTime,
      date: selectedDate,
    }));
  }, [centerList, applicationDetails, slideToShow, arrayTime]);

  useEffect(() => {
    dispatch(centerListFetchRequest());
  }, []);

  useEffect(() => {
    if (
      selectedCenter != undefined &&
      Object.keys(selectedCenter).length !== 0
    ) {
      Object.keys(selectedCenter).length > 0 &&
        dispatch(holidayListFetchRequest(selectedCenter?.centerId));
      dispatch(appointmentSlotListFetchRequest(selectedCenter?.centerId));
    }
  }, [centerList, selectedCenter?.centerId]);

  useEffect(() => {
    if (
      selectedCenter != undefined &&
      Object.keys(selectedCenter).length !== 0
    ) {
      const details = {
        centerId: selectedCenter?.centerId,
        category: applicationDetails.category,
      };
      dispatch(serviceListFetchRequest(details));
    }
  }, [selectedCenter?.centerId, applicationDetails]);

  useEffect(() => {
    if (selectedCenter !== undefined) {
      let day = moment(selectedDate).format("dddd");
      const details = {
        id: selectedCenter?.centerId,
        date: moment(selectedDate).format("YYYY-MM-DD"),
        day: day,
      };
      dispatch(availableSlotListFetchRequest(details));
    }
  }, [centerList, selectedCenter?.centerId, selectedDate]);

  useEffect(() => {
    if (Object.keys(availableSlotList).length > 0) {
      let filderdSlot = availableSlotList?.Total?.filter((item) => {
        console.log(
          "Total Appointments ==>",
          Number(item.numberOfAppointments),
          "Booked Appointments ==>",
          Number(availableSlotList.Booked[item.fromTime]),
          "Total Members ==>",
          memberDetails.length,
        );
        if (
          Number(item.numberOfAppointments) -
            Number(availableSlotList.Booked[item.fromTime] || 0) <
          memberDetails.length
        ) {
        } else {
          // if (item.type === "day") {
          //   console.log(
          //     availableSlotList.Booked[item.fromTime],
          //     "fromTimefromTime",
          //   );
          //   let day = moment(selectedDate).format("dddd");
          //   if (item.day === day && item.centerId === selectedCenter?.centerId) {
          //     return item;
          //   }
          // } else {
          //   console.log(
          //     availableSlotList.Booked[item.fromTime],
          //     "fromTimefromTime 2",
          //   );
          //   let day = moment(selectedDate).format("DD/MM/YYYY");
          //   if (
          //     item.day === moment(selectedDate).format("YYYY-MM-DD") &&
          //     item.centerId === selectedCenter?.centerId
          //   ) {
          //     return item;
          //   }
          // }

          return item;
        }
      });
      setArrayTime(filderdSlot);

      if (filderdSlot?.length) {
        if (
          !Object.keys(appointmentDetails).length &&
          applicationDetails.appointmentId === undefined
        ) {
          setSlideToShow(0);
        } else {
          if (applicationDetails.appointmentId !== undefined) {
            if (
              moment(selectedDate).format("DD/MM/YYYY") ===
              moment(applicationDetails.appointmentDate).format("DD/MM/YYYY")
            ) {
              if (filderdSlot.length > 0) {
                const index = filderdSlot.findIndex(
                  (x) => x.fromTime === applicationDetails.appointmentTime,
                );
                setSlideToShow(index);
              }
            } else {
              setSlideToShow(0);
            }
          } else {
            if (Object.keys(appointmentDetails).length) {
              if (
                moment(selectedDate).format("DD/MM/YYYY") ===
                moment(appointmentDetails.applicantAppointment.date).format(
                  "DD/MM/YYYY",
                )
              ) {
                if (filderdSlot.length > 0) {
                  const index = filderdSlot.findIndex(
                    (x) =>
                      x.fromTime ===
                      appointmentDetails.applicantAppointment?.time,
                  );
                  setSlideToShow(index);
                }
              } else {
                setSlideToShow(0);
              }
            }
          }
        }
      }
    }
  }, [
    selectedDate,
    selectedCenter?.centerId,
    availableSlotList,
    memberDetails,
  ]);

  return (
    <>
      <Header
        handleAddMember={handleAddMember}
        isLoader={isLoader}
        isAddMember={isAddMember}
        setIsAddMember={setIsAddMember}
      />
      <DetailSection
        handleDeleteApplicant={handleDeleteApplicant}
        arrayTime={arrayTime}
        slideToShow={slideToShow}
        setSlideToShow={setSlideToShow}
        isLoader={isLoadingSlot}
        applicantAppointment={applicantAppointment}
        setApplicantAppointment={setApplicantAppointment}
        selectedCenter={selectedCenter}
        setSelectedCenter={setSelectedCenter}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setModal={setModal}
        setConfirmCalendar={setConfirmCalendar}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
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
          handleRescheduleAppointment={handleRescheduleAppointment}
          handleFreeBooking={handleFreeBooking}
          serviceList={serviceList}
          totalAmount={totalAmount}
          selectedCenter={selectedCenter}
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
      {isAppointmentBooked && (
        <ConfirmModal
          modal={isAppointmentBooked}
          setModal={setIsAppointmentBooked}
          setConfirmCalendar={setConfirmCalendar}
          applicantDetail={applicantDetail}
          isAppointmentBooked={isAppointmentBooked}
        />
      )}
    </>
  );
};
