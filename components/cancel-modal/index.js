import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

function CancelModal({ isCancel, setIsCancel }) {
  const { push } = useRouter();
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
                toast.success("Appointment Cancelled Suucessfully");
                setIsCancel(!isCancel);
                push("/");
              }}
            >
              Ok
            </button>
            <button
              className="primary-outline-btn"
              onClick={() => {
                setIsCancel(!isCancel);
              }}
            >
              Cancel
            </button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default CancelModal;
