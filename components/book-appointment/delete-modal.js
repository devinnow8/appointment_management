import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import moment from "moment";
import { useSelector } from "react-redux";

function DeleteModal({
  deleteMember,
  deleteModal,
  deleteId,
  deleteConfirmation,
  setDeleteModal,
}) {
  const { applicationDetails } = useSelector(
    (state) => state.applicationDetails,
  );
  return (
    <Modal
      centered
      className="confirm-modal del-modal"
      isOpen={deleteModal}
      toggle={() => setDeleteModal(false)}
    >
      <ModalHeader toggle={() => setDeleteModal(false)}>
        <img
          src="/images/modal-img.png"
          className="img-fluid confirm-modal__img"
          alt=""
        />
      </ModalHeader>
      <ModalBody>
        <h3 className="del-modal__title">Are you sure to delete this?</h3>
        <div className="confirm-modal__applicant--info">
          <>
            <div className="confirm-modal__applicant--flex">
              <div className="confirm-modal__applicant--data">
                <h5 className="confirm-modal__applicant--heading">Name</h5>
              </div>
              <div className="confirm-modal__applicant--value">
                <p className="confirm-modal__applicant-desc">
                  {deleteMember.name}
                </p>
              </div>
            </div>

            <div className="confirm-modal__applicant--flex">
              <div className="confirm-modal__applicant--data">
                <h5 className="confirm-modal__applicant--heading">
                  {applicationDetails.category === "Visa"
                    ? "Application ID"
                    : "ID Number"}
                </h5>
              </div>
              <div className="confirm-modal__applicant--value">
                <p className="confirm-modal__applicant-desc">
                  {applicationDetails.category === "Visa"
                    ? deleteMember.applicationId
                    : deleteMember.id_number}
                </p>
              </div>
            </div>
            <div className="confirm-modal__applicant--flex">
              <div className="confirm-modal__applicant--data">
                <h5 className="confirm-modal__applicant--heading">
                  {applicationDetails.category === "Visa"
                    ? "Date of Birth (dd/mm/yyyy)"
                    : "Id Type"}
                </h5>
              </div>
              <div className="confirm-modal__applicant--value">
                <p className="confirm-modal__applicant-desc">
                  {applicationDetails.category === "Visa"
                    ? moment(deleteMember.dob).format("DD/MM/YYYY")
                    : deleteMember.id_type}
                </p>
              </div>
            </div>
          </>
        </div>

        <div className="confirm-modal__btn">
          <Button className="cancel" onClick={() => setDeleteModal(false)}>
            Cancel
          </Button>

          <Button
            className="confirm"
            onClick={() => deleteConfirmation(deleteId)}
          >
            Delete
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default DeleteModal;
