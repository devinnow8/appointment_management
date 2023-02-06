import React from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
// import Loader from "../../loader";
import { useSelector } from "react-redux";
// import AppointmentDetails from "./appointment-details";
// import ApplicantVisa from "./applicant-visa";
// import ApplicantOthers from "./applicant-others";

function CancelModal({
  isCancel,
  setIsCancel
}) {
  // const { applicationDetails } = useSelector(
  //   (state) => state.applicationDetails,
  // );
  return (
    <div>
      <Modal
        centered
        isOpen={isCancel}
        toggle={() => {
          setIsCancel(!isCancel);
        }}
        className="confirm-modal"
      >
        <ModalHeader
          toggle={() => {
            setIsCancel(!isCancel);
          }}
        >
          <img
            src="/images/cancel-modal.png"
            className="img-fluid confirm-modal__img"
            alt=""
          />
        </ModalHeader>
        <ModalBody className="text-center">
        <h3 class="confirm-modal__title">Cancel Appointment</h3>
       <p>Are you sure you want to cancel this appointment?</p>
          <div className="confirm-modal__btn">
            <button
              className="primary-btn me-2"
              onClick={() => {
                setIsCancel(!isCancel);
                // setConfirmCalendar(false);
              }}
            >
              Ok
            </button>
            <button
              className="primary-outline-btn"
              onClick={() => {
                setIsCancel(!isCancel);
                // setConfirmCalendar(false);
              }}
            >
              Cancel
            </button>
            {/* {confirmCalendar ? (
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
            )} */}
          </div>
         
        </ModalBody>
      </Modal>
    </div>
  );
}

export default CancelModal;
