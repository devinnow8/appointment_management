import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";

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
      className="del-modal"
      isOpen={deleteModal}
      toggle={deleteToggle}
    >
      <ModalHeader toggle={deleteToggle}></ModalHeader>
      <ModalBody>
        <h3 className="confirm-modal__title">Delete Applicant</h3>
        <p>{deleteMember.application_id}</p>
        <p>{deleteMember.dob}</p>
        <Button className="del-btn" onClick={() => setDeleteModal(false)}>
          Cancel
        </Button>
        <Button
          className="del-btn"
          onClick={() => deleteConfirmation(deleteId)}
        >
          Confirm
        </Button>
      </ModalBody>
    </Modal>
  );
}

export default DeleteModal;
