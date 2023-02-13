import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { cancelAppointmentFetchRequest } from "../../redux/reducer/cancel-appointment";
import { useSelector, useDispatch } from "react-redux";

function CancelModal({ isCancel, setIsCancel }) {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const { applicationDetails } = useSelector(
    (state) => state.applicationDetails,
  );

  const handleCancel = () => {
    const details = {
      centerId: applicationDetails?.centerId,
      appointmentId: applicationDetails?.appointmentId,
    };
    dispatch(
      cancelAppointmentFetchRequest(details, (success) => {
        toast.success("Appointment Cancelled Successfully");
        setIsCancel(!isCancel);
        push("/");
      }),
    );
  };

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
            <button className="primary-btn me-2" onClick={handleCancel}>
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
