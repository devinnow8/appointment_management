import React from "react";
import { useSelector } from "react-redux";

const AppointmentDetails = ({ applicantAppointment }) => {
  const { memberDetails, applicationDetails } = useSelector(
    (state) => state.applicationDetails,
  );
  const totalMember = memberDetails && memberDetails.length;
  const totalValue = 350 * totalMember;
  return (
    <>
      <div className="confirm-modal__applicant--info">
        <>
          <div className="confirm-modal__applicant--flex">
            <div className="confirm-modal__applicant--data">
              <h5 className="confirm-modal__applicant--heading">
                <div className="img-box">
                  <img src="/images/calender.png" className="me-2" alt="" />
                </div>{" "}
                Date <span>(dd/mm/yyyy)</span>
              </h5>
            </div>
            <div className="confirm-modal__applicant--value">
              <p className="confirm-modal__applicant-desc">
                {moment(applicantAppointment.date).format("DD/MM/YYYY")}
              </p>
            </div>
          </div>

          <div className="confirm-modal__applicant--flex">
            <div className="confirm-modal__applicant--data">
              <h5 className="confirm-modal__applicant--heading">
                <div className="img-box">
                  <img src="/images/time.png" alt="" />
                </div>{" "}
                Time
              </h5>
            </div>
            <div className="confirm-modal__applicant--value">
              <p className="confirm-modal__applicant-desc">
                {applicantAppointment.time || "12:00 PM"}
              </p>
            </div>
          </div>
          <div className="confirm-modal__applicant--flex">
            <div className="confirm-modal__applicant--data">
              <h5 className="confirm-modal__applicant--heading">
                <div className="img-box">
                  <img src="/images/location.png" alt="" />
                </div>{" "}
                Location
              </h5>
            </div>
            <div className="confirm-modal__applicant--value">
              <p className="confirm-modal__applicant-desc">
                {applicantAppointment.location || "-"}
              </p>
            </div>
          </div>

          <div className="confirm-modal__applicant--flex">
            <div className="confirm-modal__applicant--data">
              <h5 className="confirm-modal__applicant--heading">
                <div className="img-box">
                  <img src="/images/s-name.png" alt="" />
                </div>{" "}
                Service Name
              </h5>
            </div>
            <div className="confirm-modal__applicant--value">
              <p className="confirm-modal__applicant-desc">{applicationDetails.category}</p>
            </div>
          </div>

          <div className="confirm-modal__applicant--flex">
            <div className="confirm-modal__applicant--data">
              <h5 className="confirm-modal__applicant--heading">
                <div className="img-box">
                  <img src="/images/currency.png" className="curr-img" alt="" />
                </div>{" "}
                Amount
              </h5>
            </div>
            <div className="confirm-modal__applicant--value">
              <p className="confirm-modal__applicant-desc">
                {applicantAppointment.amount || "350"} / member
              </p>
            </div>
          </div>
          <div className="confirm-modal__applicant--flex">
            <div className="confirm-modal__applicant--data">
              <h5 className="confirm-modal__applicant--heading">
                <div className="img-box">
                  <img src="/images/currency.png" className="curr-img" alt="" />
                </div>{" "}
                Total Amount
              </h5>
            </div>
            <div className="confirm-modal__applicant--value">
              <p className="confirm-modal__applicant-desc">{totalValue}</p>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default AppointmentDetails;
