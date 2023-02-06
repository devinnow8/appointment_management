import React, { useState } from "react";
import Header from "../components/header";
import { useRouter } from "next/router";
import PaymentApplication from "../components/make-payment";
import { appointmentScheduleFetchRequest } from "../redux/reducer/appointment";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";

const MakePayment = () => {
  const dispatch = useDispatch();
  const { applicationDetails } = useSelector(
    (state) => state.applicationDetails,
  );
  const { appointmentDetails } = useSelector(
    (state) => state.appointmentDetails,
  );
  const { appointment } = useSelector((state) => state.appointmentSchedule);

  const {
    push,
    query: { centreId, status },
  } = useRouter();
  const [paymentType, setPaymentType] = useState({
    paymentMode: "Stripe",
  });

  const handleType = (event) => {
    setPaymentType((prev) => ({
      ...prev,
      paymentMode: event.target.value,
    }));
  };

  const handlePayNow = () => {
    const details = {
      application_id:
        applicationDetails.category === "Visa"
          ? applicationDetails.applicationId
          : applicationDetails.appointmentDetails?.id_number,
      appointment_date:
        appointmentDetails !== undefined &&
        moment(appointmentDetails.applicantAppointment.date).format(
          "YYYY-MM-DD",
        ),
      center_id: centreId,
      appointment_time:
        appointmentDetails !== undefined &&
        appointmentDetails.applicantAppointment.time,
      applicant_fullname: applicationDetails.name,
      category: applicationDetails.category,
      service_type: applicationDetails.category,
      status: status,
    };
    dispatch(
      appointmentScheduleFetchRequest(
        details,
        (success) => {
          push("/appointment-booked");
        },
        (error) => {
          toast.error("Something Went Wrong");
        },
      ),
    );
  };

  return (
    <>
      <Header />
      <section className="make-payment">
        <PaymentApplication
          paymentType={paymentType}
          handleType={handleType}
          handlePayNow={handlePayNow}
        />
      </section>
    </>
  );
};

export default MakePayment;
