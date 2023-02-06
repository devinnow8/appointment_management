import React, { useState } from "react";
import Header from "../components/header";
import { useRouter } from "next/router";
import PaymentApplication from "../components/make-payment";
import { appointmentScheduleFetchRequest } from "../redux/reducer/appointment";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const MakePayment = () => {
  const dispatch = useDispatch();
  const { applicationDetails } = useSelector(
    (state) => state.applicationDetails,
  );
  const {
    push,
    query: { centreId, date, time },
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
      center_id: centreId,
      appointment_date: date,
      appointment_time: time,
      applicant_fullname: applicationDetails.name || "Chris",
      category: applicationDetails.category,
      service_type: applicationDetails.category,
      status: selectedCenter?.status,
    };
    dispatch(appointmentScheduleFetchRequest(details));
    push("/appointment-booked");
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
