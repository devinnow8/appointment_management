import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";

const AppointmentDetails = ({
  applicantAppointment,
  serviceList,
  totalAmount,
}) => {
  const { memberDetails, applicationDetails } = useSelector(
    (state) => state.applicationDetails,
  );

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
                {applicantAppointment.location?.charAt(0).toUpperCase() +
                  applicantAppointment.location?.slice(1) || "-"}
              </p>
            </div>
          </div>

          {serviceList.length > 0 &&
            serviceList.map((list) => {
              return (
                <>
                  <div className="confirm-modal__applicant--flex">
                    <div className="confirm-modal__applicant--data">
                      <h5 className="confirm-modal__applicant--heading">
                        <div className="img-box">
                          <img src="/images/s-name.png" alt="" />
                        </div>{" "}
                        {list.serviceName}
                      </h5>
                    </div>
                    <div className="confirm-modal__applicant--value">
                      <p className="confirm-modal__applicant-desc">
                        {list.per_person === true
                          ? `${list.price} / member`
                          : list.price}
                      </p>
                    </div>
                  </div>
                </>
              );
            })}

          {/* <div className="confirm-modal__applicant--flex">
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
                {applicationDetails?.price || "350"} / member
              </p>
            </div>
          </div> */}
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
              <p className="confirm-modal__applicant-desc">{totalAmount}</p>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default AppointmentDetails;
