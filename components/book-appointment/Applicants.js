import React from "react";
import { Col, Row } from "reactstrap";
import Image from "next/image";
import { useSelector } from "react-redux";

function Applicants({ handleDeleteApplicant }) {
  const { memberDetails, applicationDetails } = useSelector(
    (state) => state.applicationDetails,
  );

  console.log(applicationDetails, "applicationDetails==>");
  return (
    <Row>
      <Col xs={12} sm={12}>
        <h2 className="applicant-details__title">Applicant Details</h2>
        <div className="applicant-details__card--wrapper">
          <>
            {memberDetails &&
              memberDetails.length > 0 &&
              memberDetails.map((data, index) => {
                return (
                  <>
                    <div
                      className={`applicant-details__card me-0 me-sm-3 ${
                        data?.name?.length < 15 ? "width15" : "width-greater"
                      }`}
                      key={index}
                    >
                      <div className="applicant-details__card--flex">
                        <div className="applicant-details__card--info">
                          {!applicationDetails.applicantFullName ? (
                            <h4 className="applicant-details__card--title">
                              {data?.name?.charAt(0).toUpperCase() +
                                data?.name?.slice(1)}
                            </h4>
                          ) : (
                            <h4 className="applicant-details__card--title">
                              {applicationDetails?.applicantFullName
                                ?.charAt(0)
                                .toUpperCase() +
                                applicationDetails?.applicantFullName?.slice(1)}
                            </h4>
                          )}
                          {applicationDetails.category === "Visa" ? (
                            <div className="applicant-details__card--div">
                              <p className="applicant-details__card--text">
                                Application ID
                              </p>
                              <p className="applicant-details__card--id">
                                {data?.applicationId}
                              </p>
                            </div>
                          ) : (
                            <>
                              <div className="applicant-details__card--div">
                                <p className="applicant-details__card--text">
                                  {data?.id_type}
                                </p>
                                <p className="applicant-details__card--id">
                                  {data?.id_number}
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                        {memberDetails.length > 1 && (
                          <Image
                            src="/images/delete.png"
                            alt=""
                            width={14}
                            height={14}
                            onClick={() => handleDeleteApplicant(data, index)}
                          />
                        )}
                      </div>
                    </div>
                  </>
                );
              })}
          </>
        </div>
      </Col>
    </Row>
  );
}

export default Applicants;
