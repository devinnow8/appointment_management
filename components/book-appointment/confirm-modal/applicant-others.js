import React from "react";

const ApplicantOthers = ({ applicantDetail }) => {
  return (
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
          <h5 className="confirm-modal__applicant--heading">Nationality</h5>
        </div>
        <div className="confirm-modal__applicant--value">
          <p className="confirm-modal__applicant-desc">
            {applicantDetail.nationality.label}
          </p>
        </div>
      </div>
      <div className="confirm-modal__applicant--flex">
        <div className="confirm-modal__applicant--data">
          <h5 className="confirm-modal__applicant--heading">ID Type</h5>
        </div>
        <div className="confirm-modal__applicant--value">
          <p className="confirm-modal__applicant-desc">
            {applicantDetail.id_type.label}
          </p>
        </div>
      </div>

      <div className="confirm-modal__applicant--flex">
        <div className="confirm-modal__applicant--data">
          <h5 className="confirm-modal__applicant--heading">ID Number</h5>
        </div>
        <div className="confirm-modal__applicant--value">
          <p className="confirm-modal__applicant-desc">
            {applicantDetail.id_number}
          </p>
        </div>
      </div>

      <div className="confirm-modal__applicant--flex">
        <div className="confirm-modal__applicant--data">
          <h5 className="confirm-modal__applicant--heading">Email</h5>
        </div>
        <div className="confirm-modal__applicant--value">
          <p className="confirm-modal__applicant-desc email-add">
            {applicantDetail.email}
          </p>
        </div>
      </div>

      <div className="confirm-modal__applicant--flex">
        <div className="confirm-modal__applicant--data">
          <h5 className="confirm-modal__applicant--heading">Phone No</h5>
        </div>
        <div className="confirm-modal__applicant--value">
          <p className="confirm-modal__applicant-desc">
            {applicantDetail.phone}
          </p>
        </div>
      </div>
    </>
  );
};

export default ApplicantOthers;
