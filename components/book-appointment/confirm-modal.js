import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import moment from "moment";
import Loader from "../loader";
import { useSelector } from "react-redux";

function ConfirmModal({
  modal,
  handleConfirm,
  applicantDetail,
  applicantAppointment,
  selectedService,
  confirmCalendar,
  handlePaymentProceed,
  isLoader,
  setModal,
  setConfirmCalendar,
}) {
  const { memberDetails } = useSelector(
    (state) => state.applicationDetails,
  );
  const totalMember = memberDetails && memberDetails.length;
  const totalValue = 350 * totalMember;
  return (
    <div>
      <Modal
        centered
        isOpen={modal}
        toggle={() => {
          setModal(!modal);
          setConfirmCalendar(false);
        }}
        className="confirm-modal"
      >
        <ModalHeader
          toggle={() => {
            setModal(!modal);
            setConfirmCalendar(false);
          }}
        >
          <img
            src="/images/modal-img.png"
            className="img-fluid confirm-modal__img"
            alt=""
          />
        </ModalHeader>
        <ModalBody>
          {confirmCalendar ? (
            <>
              <h3 className="confirm-modal__title">Confirm your appointment</h3>
              <p className="confirm-modal__subtitle">
                Please confirm the details below
              </p>
            </>
          ) : (
            <h3 className="confirm-modal__title">
              Please confirm applicant details
            </h3>
          )}
          {confirmCalendar ? (
            <>
              <div className="confirm-modal__applicant--info">
                <>
                  <div className="confirm-modal__applicant--flex">
                    <div className="confirm-modal__applicant--data">
                      <h5 className="confirm-modal__applicant--heading">
                        <div className="img-box">
                          <img
                            src="/images/calender.png"
                            className="me-2"
                            alt=""
                          />
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
                      <p className="confirm-modal__applicant-desc">
                        {selectedService}
                      </p>
                    </div>
                  </div>

                  <div className="confirm-modal__applicant--flex">
                    <div className="confirm-modal__applicant--data">
                      <h5 className="confirm-modal__applicant--heading">
                        <div className="img-box">
                          <img
                            src="/images/currency.png"
                            className="curr-img"
                            alt=""
                          />
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
                          <img
                            src="/images/currency.png"
                            className="curr-img"
                            alt=""
                          />
                        </div>{" "}
                        Total Amount
                      </h5>
                    </div>
                    <div className="confirm-modal__applicant--value">
                      <p className="confirm-modal__applicant-desc">
                        {totalValue}
                      </p>
                    </div>
                  </div>
                </>
              </div>
            </>
          ) : (
            <div className="confirm-modal__applicant--info">
              {selectedService === "Visa" ? (
                <>
                  <div className="confirm-modal__applicant--flex">
                    <div className="confirm-modal__applicant--data">
                      <h5 className="confirm-modal__applicant--heading">
                        Passport Number
                      </h5>
                    </div>
                    <div className="confirm-modal__applicant--value">
                      <p className="confirm-modal__applicant-desc">
                        V1156574R57
                      </p>
                    </div>
                  </div>
                  <div className="confirm-modal__applicant--flex">
                    <div className="confirm-modal__applicant--data">
                      <h5 className="confirm-modal__applicant--heading">
                        Application ID
                      </h5>
                    </div>
                    <div className="confirm-modal__applicant--value">
                      <p className="confirm-modal__applicant-desc">
                        {applicantDetail.application_id}
                      </p>
                    </div>
                  </div>
                  <div className="confirm-modal__applicant--flex">
                    <div className="confirm-modal__applicant--data">
                      <h5 className="confirm-modal__applicant--heading">
                        Date of Birth <span>(dd/mm/yyyy)</span>
                      </h5>
                    </div>
                    <div className="confirm-modal__applicant--value">
                      <p className="confirm-modal__applicant-desc">
                        {moment(applicantDetail.dob).format("DD/MM/YYYY")}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="confirm-modal__applicant--flex">
                    <div className="confirm-modal__applicant--data">
                      <h5 className="confirm-modal__applicant--heading">
                        Name
                      </h5>
                    </div>
                    <div className="confirm-modal__applicant--value">
                      <p className="confirm-modal__applicant-desc">
                        {applicantDetail.name}
                      </p>
                    </div>
                  </div>

                  <div className="confirm-modal__applicant--flex">
                    <div className="confirm-modal__applicant--data">
                      <h5 className="confirm-modal__applicant--heading">
                        Nationality
                      </h5>
                    </div>
                    <div className="confirm-modal__applicant--value">
                      <p className="confirm-modal__applicant-desc">
                        {applicantDetail.nationality.label}
                      </p>
                    </div>
                  </div>
                  <div className="confirm-modal__applicant--flex">
                    <div className="confirm-modal__applicant--data">
                      <h5 className="confirm-modal__applicant--heading">
                        ID Type
                      </h5>
                    </div>
                    <div className="confirm-modal__applicant--value">
                      <p className="confirm-modal__applicant-desc">
                        {applicantDetail.id_type.label}
                      </p>
                    </div>
                  </div>

                  <div className="confirm-modal__applicant--flex">
                    <div className="confirm-modal__applicant--data">
                      <h5 className="confirm-modal__applicant--heading">
                        ID Number
                      </h5>
                    </div>
                    <div className="confirm-modal__applicant--value">
                      <p className="confirm-modal__applicant-desc">
                        {applicantDetail.id_number}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
          <div className="confirm-modal__btn">
            <Button
              className="cancel"
              onClick={() => {
                setModal(!modal);
                setConfirmCalendar(false);
              }}
            >
              Cancel
            </Button>
            {confirmCalendar ? (
              <>
                <Button
                  className="confirm payment-btn"
                  onClick={handlePaymentProceed}
                >
                  Confirm & Proceed for Payment
                </Button>
              </>
            ) : (
              <Button className="confirm" onClick={handleConfirm}>
                Confirm
                <Loader isLoader={isLoader} />
              </Button>
            )}
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ConfirmModal;
