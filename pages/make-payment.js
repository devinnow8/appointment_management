import React, { useState } from "react";
import moment from "moment";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Header from "../components/header";
import PaymentApplication from "../components/make-payment";
import { appointmentScheduleFetchRequest } from "../redux/reducer/appointment";
import { appointmentDetailsFetchFailure } from "../redux/reducer/appointment-details";

const MakePayment = () => {
  const dispatch = useDispatch();
  const { applicationDetails } = useSelector(
    (state) => state.applicationDetails,
  );
  const { appointmentDetails } = useSelector(
    (state) => state.appointmentDetails,
  );

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
    const details = {};
    if (applicationDetails.category !== "Visa") {
      details.application_id = applicationDetails.id_number;
      details.appointment_date =
        appointmentDetails !== undefined &&
        moment(appointmentDetails.applicantAppointment?.date).format(
          "YYYY-MM-DD",
        );
      details.center_id = centreId;
      details.appointment_time =
        appointmentDetails !== undefined &&
        appointmentDetails.applicantAppointment?.time;
      details.applicant_fullname = applicationDetails.name;
      details.category = applicationDetails.category;
      details.service_type = applicationDetails.category;
      // status: selectedCenter?.status,
      details.country = applicationDetails.country;
      details.email = applicationDetails.email;
      details.phone_number = applicationDetails.phone_number;
      details.price = totalValue;
    } else {
      details.application_id = applicationDetails.applicationId;
      details.appointment_date =
        appointmentDetails !== undefined &&
        moment(appointmentDetails.applicantAppointment?.date).format(
          "YYYY-MM-DD",
        );
      details.center_id = centreId;
      details.appointment_time =
        appointmentDetails !== undefined &&
        appointmentDetails.applicantAppointment?.time;
      details.applicant_fullname = applicationDetails.name;
      details.category = applicationDetails.category;
      details.service_type = applicationDetails.category;
      // status: selectedCenter?.status,
      details.country = applicationDetails.country;
      details.price = appointmentDetails?.totalAmount;
    }
    dispatch(
      appointmentScheduleFetchRequest(
        [details],
        (success) => {
          push({
            pathname: "/appointment-booked",
            query: {
              centreId: centreId,
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
