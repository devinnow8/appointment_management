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
            previousClick={previousClick}
            slider={slider}
            arrayTime={arrayTime}
            handleTime={handleTime}
            setSlideToShow={setSlideToShow}
            slideToShow={slideToShow}
            nextClick={nextClick}
            handleAppointment={handleAppointment}
          />
        </Container>
      </div>
    </>
  );
};
