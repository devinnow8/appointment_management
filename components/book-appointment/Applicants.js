import React, { useEffect } from "react";
import { Col, Row } from "reactstrap";
import Image from "next/image";

function Applicants({
  applicationDetails,
  members = [],
  handleDeleteApplicant,
}) {
  useEffect(() => {
    if (members.length < 1) {
      members.push({
        application_id: applicationDetails.applicationId,
        country_name: applicationDetails.countryName,
        name: applicationDetails.name,
        service_type: applicationDetails.serviceType,
      });
    }
  }, []);

  return (
    <Row>
      <Col xs={12} sm={12}>
        <h2 className="applicant-details__title">Applicant Detail</h2>
        <div className="applicant-details__card--wrapper">
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
                        <h4 className="applicant-details__card--title">
                          {data?.name}
                        </h4>
                        <div className="applicant-details__card--div">
                          <p className="applicant-details__card--text">
                            Application ID
                          </p>
                          <p className="applicant-details__card--id">
                            {data?.application_id}
                          </p>
                        </div>
                        <div className="applicant-details__card--div">
                          <p className="applicant-details__card--text">
                            Service Type
                          </p>
                          <p className="applicant-details__card--id">
                            {data?.service_type}
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
              ))}
          </>
        </div>
      </Col>
    </Row>
  );
}

export default Applicants;
