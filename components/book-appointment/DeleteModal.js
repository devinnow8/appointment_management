import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import moment from "moment";

function DeleteModal({
  deleteMember,
  deleteModal,
  deleteId,
  deleteConfirmation,
  deleteToggle,
  setDeleteModal,
}) {
  return (
    <Modal
      centered
      className="confirm-modal del-modal"
      isOpen={deleteModal}
      toggle={deleteToggle}
    >
      <ModalHeader toggle={deleteToggle}>
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
                  Application ID
                </h5>
              </div>
              <div className="confirm-modal__applicant--value">
                <p className="confirm-modal__applicant-desc">
                  {deleteMember.applicationId}
                </p>
              </div>
            </div>
            <div className="confirm-modal__applicant--flex">
              <div className="confirm-modal__applicant--data">
                <h5 className="confirm-modal__applicant--heading">
                  Date of Birth (dd/mm/yyyy)
                </h5>
              </div>
              <div className="confirm-modal__applicant--value">
                <p className="confirm-modal__applicant-desc">
                  {moment(deleteMember.dob).format("DD/MM/YYYY")}
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
