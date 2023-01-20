import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";

function DeleteModal({
  deleteModal,
  deleteId,
  deleteConfirmation,
  deleteToggle,
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
        <h2 className="del-modal__title">Delete Applicant</h2>
        <p className="del-modal__para">Are you sure to delete this</p>
        <Button
          className="del-btn"
          onClick={() => deleteConfirmation(deleteId)}
        >
          Okay
        </Button>
      </ModalBody>
    </Modal>
  );
}

export default DeleteModal;
