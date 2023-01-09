import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function ConfirmModal({
  modal,
  modalToggle,
  handleConfirm,
  applicantDetail,
  selectedService,
}) {
  return (
    <div>
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
            {selectedService === "Visa" ? (
              <>
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
                    <p className="confirm-modal__applicant-desc">
                      {applicantDetail.application_id}
                    </p>
                  </div>
                </div>
                <div className="confirm-modal__applicant--flex">
                  <div className="confirm-modal__applicant--data">
                    <h5 className="confirm-modal__applicant--heading">DOB</h5>
                  </div>
                  <div className="confirm-modal__applicant--value">
                    <p className="confirm-modal__applicant-desc">
                      {applicantDetail.dob}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="confirm-modal__applicant--flex">
                  <div className="confirm-modal__applicant--data">
                    <h5 className="confirm-modal__applicant--heading">Name</h5>
                  </div>
                  <div className="confirm-modal__applicant--value">
                    <p className="confirm-modal__applicant-desc">
                      {applicantDetail.name}
                    </p>
                  </div>
                </div>

                <div className="confirm-modal__applicant--flex">
                  <div className="confirm-modal__applicant--data">
                    <h5 className="confirm-modal__applicant--heading">
                      Nationality
                    </h5>
                  </div>
                  <div className="confirm-modal__applicant--value">
                    <p className="confirm-modal__applicant-desc">
                      {applicantDetail.nationality.label}
                    </p>
                  </div>
                </div>
                <div className="confirm-modal__applicant--flex">
                  <div className="confirm-modal__applicant--data">
                    <h5 className="confirm-modal__applicant--heading">
                      ID Type
                    </h5>
                  </div>
                  <div className="confirm-modal__applicant--value">
                    <p className="confirm-modal__applicant-desc">
                      {applicantDetail.id_type.label}
                    </p>
                  </div>
                </div>

                <div className="confirm-modal__applicant--flex">
                  <div className="confirm-modal__applicant--data">
                    <h5 className="confirm-modal__applicant--heading">
                      ID Number
                    </h5>
                  </div>
                  <div className="confirm-modal__applicant--value">
                    <p className="confirm-modal__applicant-desc">
                      {applicantDetail.id_number}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="confirm-modal__btn">
            <Button className="cancel" onClick={modalToggle}>
              Cancel
            </Button>
            <Button className="confirm" onClick={handleConfirm}>
              Confirm
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ConfirmModal;
