import React, { useEffect } from "react";
import { Col, Row } from "reactstrap";
import Image from "next/image";

function Applicants({ members = [], handleDeleteApplicant }) {
  return (
    <Row>
      <Col xs={12} sm={12}>
        <h2 className="applicant-details__title">Applicant Details</h2>
        <div className="applicant-details__card--wrapper">
          <>
            {members &&
              members.length > 0 &&
              members.map((data, index) => {
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
                          <h4 className="applicant-details__card--title">
                            {data?.name}
                          </h4>
                          <div className="applicant-details__card--div">
                            <p className="applicant-details__card--text">
                              Application ID
                            </p>
                            <p className="applicant-details__card--id">
                              {data?.applicationId}
                            </p>
                          </div>
                        </div>
                        {members.length > 1 && (
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
