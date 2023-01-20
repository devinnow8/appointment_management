import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';

function DeleteModal() {
  const [modal, setModal] = useState(true);

  const toggle = () => setModal(!modal);
  return (
    <Modal centered className="del-modal" isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}></ModalHeader>
      <ModalBody>
        <h2 className="del-modal__title">Delete Applicant</h2>
        <p className="del-modal__para">Are you sure to delete this</p>
        <Button className="del-btn">Okay</Button>
      </ModalBody>
    </Modal>
  );
}

export default DeleteModal;
