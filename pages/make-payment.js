import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {  useSelector } from "react-redux";
import Header from "../components/header";
import PaymentApplication from "../components/make-payment";

const MakePayment = () => {
  const { applicationDetails } = useSelector(
    (state) => state.applicationDetails,
  );
  const {
    push,
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
        />
      </section>
    </>
  );
};

export default MakePayment;
