import React from "react";
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
  return (
    <div className="appointment-calender__center">
      <div className="appointment-calender__center--country">
        <div>
          <label htmlFor="" className="label">
            Country
          </label>
          <Select
            options={countries}
            isDisabled={applicationDetails.category === "Visa"}
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
        <p className="service-name mb-0">{applicationDetails.category}</p>
      </div>
    </div>
  );
};

export default SelectDropdowns;
