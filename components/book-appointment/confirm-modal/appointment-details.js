import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";

const AppointmentDetails = ({
  applicantAppointment,
  serviceList,
  totalAmount,
  selectedCenter,
}) => {
  const { applicationDetails } = useSelector(
    (state) => state.applicationDetails,
  );
  return (
    <>
      <div
        className={
          applicationDetails.appointmentId
            ? "confirm-modal__applicant--info reschedule-case"
            : "confirm-modal__applicant--info"
        }
      >
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
                {applicantAppointment.time} {""}{" "}
                {selectedCenter?.timeZone && (
                  <span>
                    {!!selectedCenter && `${selectedCenter?.timeZone}`}
                  </span>
                )}
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

          {!applicationDetails.appointmentId &&
            serviceList.length > 0 &&
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
                          ? `${list.price} / Applicant`
                          : list.price}
                      </p>
                    </div>
                  </div>
                </>
              );
            })}

          {!applicationDetails.appointmentId ||
            (totalAmount === 0 && (
              <div className="confirm-modal__applicant--flex">
                <div className="confirm-modal__applicant--data">
                  <h5 className="confirm-modal__applicant--heading">
                    <div className="img-box">
                      <img
                        src="/images/currency2.png"
                        className="curr-img"
                        alt=""
                      />
                    </div>{" "}
                    Total Amount
                  </h5>
                </div>
                <div className="confirm-modal__applicant--value">
                  <p className="confirm-modal__applicant-desc">
                    {serviceList[0]?.currency_type} {""}
                    {totalAmount}
                  </p>
                </div>
              </div>
            ))}
        </>
      </div>
    </>
  );
};

export default AppointmentDetails;
