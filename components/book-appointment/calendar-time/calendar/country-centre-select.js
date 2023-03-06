import React from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";

const SelectDropdowns = ({
  countries,
  selectedCountry,
  setSelectedCountry,
  newCenterList,
  selectedCenter,
  formatOptionLabel,
  setSelectedCenter,
  setApplicantAppointment,
  applicationDetails,
}) => {
  const handleType = () => {
    if (applicationDetails.category?.toLowerCase().includes("visa")) {
      return (
        <p className="service-name mb-0">
          {applicationDetails.category}{" "}
          {!applicationDetails.appointmentId
            ? `(${applicationDetails.service_type})`
            : `(${applicationDetails.serviceType})`}
        </p>
      );
    } else {
      return <p className="service-name mb-0">{applicationDetails.category}</p>;
    }
  };
  return (
    <div className="appointment-calender__center">
      <div className="appointment-calender__center--country">
        <div>
          <label htmlFor="" className="label">
            Country
          </label>
          <Select
            options={countries}
            isDisabled={
              applicationDetails.category?.toLowerCase().includes("visa") ||
              !!applicationDetails.appointmentId
            }
            isSearchable={false}
            className="location-select"
            name="location"
            classNamePrefix="react-select"
            value={selectedCountry}
            onChange={(selected) => {
              setSelectedCountry(selected);
            }}
          />
        </div>

        {selectedCountry !== "" && (
          <div>
            <label htmlFor="" className="label">
              Center
            </label>
            <Select
              options={newCenterList}
              className="location-select"
              name="location"
              classNamePrefix="react-select"
              value={selectedCenter}
              formatOptionLabel={formatOptionLabel}
              isSearchable={false}
              isDisabled={!!applicationDetails.appointmentId}
              onChange={(selected) => {
                setSelectedCenter(selected);
                setApplicantAppointment((prev) => ({
                  ...prev,
                  location: selected.centerName,
                }));
              }}
            />
          </div>
        )}
      </div>
      <div>
        <label htmlFor="" className="service-label p-0">
          Service
        </label>
        {handleType()}
      </div>
    </div>
  );
};

export default SelectDropdowns;
