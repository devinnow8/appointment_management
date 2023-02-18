import React from "react";
import { Container, Row } from "reactstrap";
import ApplicantPaymentDetails from "./applicant-payment-details";
import PaymentMode from "./payment-mode";

const PaymentApplication = ({ paymentType, handleType }) => {
  return (
    <Container>
      <Row>
        <ApplicantPaymentDetails />
        <PaymentMode
          paymentType={paymentType}
          handleType={handleType}
        />
      </Row>
    </Container>
  );
};

export default PaymentApplication;
