import React from "react";
import { Col } from "reactstrap";
import { useSelector } from "react-redux";
import moment from "moment";

const ApplicantPaymentDetails = () => {
  const { appointmentDetails } = useSelector(
    (state) => state.appointmentDetails,
  );
  const { memberDetails } = useSelector((state) => state.applicationDetails);
  const totalMember = memberDetails && memberDetails.length;
  const totalValue = 350 * totalMember;

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
            <p>{appointmentDetails.applicationDetails.applicationId}</p>
          </div>
        </div>
        <div className="make-payment__details--flex">
          <div className="make-payment__details--heading">
            <h4>
              Appointment Date <span>(dd/mm/yyyy)</span>
            </h4>
          </div>
          <div className="make-payment__details--value">
            <p>
              {moment(appointmentDetails.applicantAppointment.date).format(
                "DD/MM/YYYY",
              )}
            </p>
          </div>
        </div>
        <div className="make-payment__details--flex">
          <div className="make-payment__details--heading">
            <h4>Application Fee</h4>
          </div>
          <div className="make-payment__details--value">
            <p>
              {appointmentDetails.applicantAppointment.amount || "350"} / member
            </p>
          </div>
        </div>
        <div className="make-payment__details--flex total-fee">
          <div className="make-payment__details--heading">
            <h4>Total Fee</h4>
          </div>
          <div className="make-payment__details--value">
            <p>{totalValue}</p>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default ApplicantPaymentDetails;
