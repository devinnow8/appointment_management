import { Container } from "reactstrap";
import InnerHeader from "../components/InnerHeader";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import loader from "../public/images/loader.gif";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setMembers, setVisaMembers } from "../components/redux/action";
import ApplicantDetails from "../components/applicant-details";
import ScheduleAppointment from "../components/schedule-appointment";
import { arrayTime } from "../constants/index";
import { confirm } from "../components/schedule-appointment/utils";

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
      <InnerHeader
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
          <ApplicantDetails
            userAppointmentDetails={userAppointmentDetails}
            selectedService={selectedService}
            visaMembers={visaMembers}
            members={members}
            handleDeleteApplicant={handleDeleteApplicant}
          />
          <ScheduleAppointment
            setApplicantAppointment={setApplicantAppointment}
            applicantAppointment={applicantAppointment}
            modal={modal}
            modalToggle={modalToggle}
            applicantDetail={applicantDetail}
            handleConfirm={handleConfirm}
            selectedService={selectedService}
            confirmCalendar={confirmCalendar}
            handlePaymentProceed={handlePaymentProceed}
            slider={slider}
            arrayTime={arrayTime}
            setSlideToShow={setSlideToShow}
            slideToShow={slideToShow}
            handleAppointment={handleAppointment}
          />
        </Container>
      </div>
    </>
  );
};
