import React from "react";
import moment from "moment";

const ApplicantVisa = ({applicantDetail}) => {
  return (
    <>
      <div className="confirm-modal__applicant--flex">
        <div className="confirm-modal__applicant--data">
          <h5 className="confirm-modal__applicant--heading">Passport Number</h5>
        </div>
        <div className="confirm-modal__applicant--value">
          <p className="confirm-modal__applicant-desc">V1156574R57</p>
        </div>
      </div>
      <div className="confirm-modal__applicant--flex">
        <div className="confirm-modal__applicant--data">
          <h5 className="confirm-modal__applicant--heading">Application ID</h5>
        </div>
        <div className="confirm-modal__applicant--value">
          <p className="confirm-modal__applicant-desc">
            {applicantDetail.application_id}
          </p>
        </div>
      </div>
      <div className="confirm-modal__applicant--flex">
        <div className="confirm-modal__applicant--data">
          <h5 className="confirm-modal__applicant--heading">
            Date of Birth <span>(dd/mm/yyyy)</span>
          </h5>
        </div>
        <div className="confirm-modal__applicant--value">
          <p className="confirm-modal__applicant-desc">
            {moment(applicantDetail.dob).format("DD/MM/YYYY")}
          </p>
        </div>
      </div>
    </>
  );
};

export default ApplicantVisa;
