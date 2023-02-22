import React from "react";
import { Col } from "reactstrap";
import { useSelector } from "react-redux";
import moment from "moment";

const ApplicantPaymentDetails = () => {
  const { appointmentDetails } = useSelector(
    (state) => state.appointmentDetails,
  );
  const { serviceList } = useSelector((state) => state.serviceList);
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
            <p>{appointmentDetails.applicationDetails?.applicationId}</p>
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
              {moment(appointmentDetails.applicantAppointment?.date).format(
                "DD/MM/YYYY",
              )}
            </p>
          </div>
        </div>
        <div className="make-payment__details--flex">
          <div className="make-payment__details--heading">
            <h4>Appointment Time</h4>
          </div>
          <div className="make-payment__details--value">
            <p>{appointmentDetails.applicantAppointment?.time}</p>
          </div>
        </div>
        {serviceList.length > 0 &&
          serviceList.map((list) => {
            return (
              <>
                <div className="make-payment__details--flex">
                  <div className="make-payment__details--heading">
                    <h4>{list.serviceName}</h4>
                  </div>
                  <div className="make-payment__details--value">
                    <p>
                      {list.per_person === true
                        ? `${list.price} / Applicant`
                        : list.price}
                    </p>
                  </div>
                </div>
              </>
            );
          })}
        <div className="make-payment__details--flex total-fee">
          <div className="make-payment__details--heading">
            <h4>Total Fee</h4>
          </div>
          <div className="make-payment__details--value">
            <p>
              {serviceList[0]?.currency_type} {""}
              {appointmentDetails?.totalAmount}
            </p>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default ApplicantPaymentDetails;
