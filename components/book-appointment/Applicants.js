import React from "react";
import { Col, Row } from "reactstrap";
import Image from "next/image";

function Applicants({
  userAppointmentDetails,
  selectedService,
  members = [],
  handleDeleteApplicant,
}) {
  console.log(
    userAppointmentDetails,
    "userAppointmentDetailsuserAppointmentDetails",
  );
  return (
    <Row>
      <Col xs={12} sm={12}>
        <h2 className="applicant-details__title">Applicant Details</h2>
        <div className="applicant-details__card--wrapper">
          <div className="applicant-details__card me-0 me-sm-3">
            <div className="applicant-details__card--flex">
              <div className="applicant-details__card--info w-100">
                {
                  <h4 className="applicant-details__card--title">
                    {userAppointmentDetails.appointmentDetails.name || "Chris"}
                  </h4>
                }
                {selectedService === "Visa" ? (
                  <>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="applicant-details__card--text">
                        Application ID
                      </p>
                      <span className="applicant-details__card--id">
                        {" "}
                        {
                          userAppointmentDetails.appointmentDetails
                            .application_id
                        }{" "}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="applicant-details__card--text">
                        Nationality
                      </p>
                      <span className="applicant-details__card--id">
                        {" "}
                        {
                          userAppointmentDetails.appointmentDetails.nationality
                            .label
                        }{" "}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <>
            {members &&
              members.length > 0 &&
              members.map((data, index) => (
                <>
                  <div
                    className="applicant-details__card me-0 me-sm-3"
                    key={index}
                  >
                    <div className="applicant-details__card--flex">
                      <div className="applicant-details__card--info">
                        {selectedService !== "Visa" && (
                          <h4 className="applicant-details__card--title">
                            {data?.name}
                          </h4>
                        )}
                        <p className="applicant-details__card--text">
                          Application ID
                        </p>
                        {selectedService == "Visa" ? (
                          <p className="applicant-details__card--id">
                            {data?.application_id}
                          </p>
                        ) : (
                          <p className="applicant-details__card--id">
                            {data?.id_number}
                          </p>
                        )}
                      </div>
                      <Image
                        src="/images/delete.png"
                        alt=""
                        width={14}
                        height={14}
                        onClick={() => handleDeleteApplicant(index)}
                      />
                    </div>
                  </div>
                </>
              ))}
          </>
        </div>
      </Col>
    </Row>
  );
}

export default Applicants;
