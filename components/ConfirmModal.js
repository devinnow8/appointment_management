import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function ConfirmModal() {
  const [modal, setModal] = useState(false);

  const modalToggle = () => setModal(!modal);
  return (
    <div>
      <Button color="danger" onClick={modalToggle}>
        Open Modal
      </Button>
      <Modal
        centered
        isOpen={modal}
        toggle={modalToggle}
        className="confirm-modal"
      >
        <ModalHeader toggle={modalToggle}>
          <img src="/images/modal-img.png" className="img-fluid" alt="" />
        </ModalHeader>
        <ModalBody>
          <h3 className="confirm-modal__title">
            Please confirm applicant details
          </h3>
          <div className="confirm-modal__applicant--info">
            <div className="confirm-modal__applicant--flex">
              <div className="confirm-modal__applicant--data">
                <h5 className="confirm-modal__applicant--heading">Name</h5>
              </div>
              <div className="confirm-modal__applicant--value">
                <p className="confirm-modal__applicant-desc">John Smith Doe</p>
              </div>
            </div>
            <div className="confirm-modal__applicant--flex">
              <div className="confirm-modal__applicant--data">
                <h5 className="confirm-modal__applicant--heading">
                  Passport Number
                </h5>
              </div>
              <div className="confirm-modal__applicant--value">
                <p className="confirm-modal__applicant-desc">V1156574R57</p>
              </div>
            </div>
            <div className="confirm-modal__applicant--flex">
              <div className="confirm-modal__applicant--data">
                <h5 className="confirm-modal__applicant--heading">
                  Application ID
                </h5>
              </div>
              <div className="confirm-modal__applicant--value">
                <p className="confirm-modal__applicant-desc">12367HG23</p>
              </div>
            </div>
          </div>
          <div className="confirm-modal__btn">
            <Button className="cancel">Cancel</Button>
            <Button className="confirm">Confirm</Button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ConfirmModal;
