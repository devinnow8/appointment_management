import React from "react";
import { Col } from "reactstrap";

const ApplicantPaymentDetails = () => {
  return (
    <Col md={5} lg={4} xl={4}>
      <h3 className="make-payment__title">Make Payment</h3>
      <div className="make-payment__details">
        <h4 className="make-payment__details--title">Payment Details</h4>
        <div className="make-payment__details--flex">
          <div className="make-payment__details--heading">
            <h4>Appointment ID</h4>
          </div>
          <div className="make-payment__details--value">
            <p>EPK4746534</p>
          </div>
        </div>
        <div className="make-payment__details--flex">
          <div className="make-payment__details--heading">
            <h4>
              Appointment Date <span>(dd/mm/yyyy)</span>
            </h4>
          </div>
          <div className="make-payment__details--value">
            <p>11/12/2022</p>
          </div>
        </div>
        <div className="make-payment__details--flex">
          <div className="make-payment__details--heading">
            <h4>Application Fee</h4>
          </div>
          <div className="make-payment__details--value">
            <p>&#163;20</p>
          </div>
        </div>
        <div className="make-payment__details--flex total-fee">
          <div className="make-payment__details--heading">
            <h4>Total Fee</h4>
          </div>
          <div className="make-payment__details--value">
            <p>&#163;20</p>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default ApplicantPaymentDetails;
