import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Header from "../components/header";
import PaymentApplication from "../components/make-payment";
import { appointmentScheduleFetchRequest } from "../redux/reducer/appointment";
import { appointmentDetailsFetchFailure } from "../redux/reducer/appointment-details";

const MakePayment = () => {
  const { applicationDetails } = useSelector(
    (state) => state.applicationDetails,
  );
  const dispatch = useDispatch();
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
    dispatch(
      appointmentScheduleFetchRequest(
        appointmentDetails.updatedMembers,
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

  useEffect(() => {
    if (!applicationDetails.applicationId) {
      push("/");
    }
  }, [applicationDetails]);

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
