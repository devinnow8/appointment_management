import React from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import Loader from "../../loader";
import { useSelector } from "react-redux";
import AppointmentDetails from "./appointment-details";
import ApplicantVisa from "./applicant-visa";
import ApplicantOthers from "./applicant-others";

function ConfirmModal({
  modal,
  handleConfirm,
  applicantDetail,
  applicantAppointment,
  confirmCalendar,
  handlePaymentProceed,
  isLoader,
  setModal,
  setConfirmCalendar,
  isAppointmentBooked,
  handleRescheduleAppointment
}) {
  const { applicationDetails } = useSelector(
    (state) => state.applicationDetails,
  );
  const { isLoading } = useSelector((state) => state.rescheduleAppointment);

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
              {isAppointmentBooked
                ? "This applicant id has already been booked with us"
                : "Please confirm applicant details"}
            </h3>
          )}
          {confirmCalendar ? (
            <AppointmentDetails applicantAppointment={applicantAppointment} />
          ) : (
            <div className="confirm-modal__applicant--info">
              {applicationDetails.category === "Visa" ? (
                <ApplicantVisa applicantDetail={applicantDetail} />
              ) : (
                <ApplicantOthers applicantDetail={applicantDetail} />
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
                  onClick={applicationDetails.appointmentId ? handleRescheduleAppointment :handlePaymentProceed}
                >
                  {applicationDetails.appointmentId ? "Reschedule" : "Confirm & Proceed for Payment"}

                 {applicationDetails.appointmentId && <Loader isLoader={isLoading} />}
                </Button>
              </>
            ) : (
              <>
                {!isAppointmentBooked && (
                  <Button className="confirm" onClick={handleConfirm}>
                    Confirm
                    <Loader isLoader={isLoader} />
                  </Button>
                )}
              </>
            )}
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ConfirmModal;
