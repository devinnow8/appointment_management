import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { Label, Input, Button } from "reactstrap";
import Select from "react-select";
import { countries } from "../../../constants";
import AddMember from "../add-member";
import { useSelector } from "react-redux";

const Others = ({ handleAddMember, isLoader, isAddMember, setIsAddMember }) => {
  const { categoryServiceList } = useSelector(
    (state) => state.categoryServiceList,
  );
  const { applicationDetails } = useSelector(
    (state) => state.applicationDetails,
  );
  const [idType, setIdType] = useState({});
  const [details, setDetails] = useState({});

  const formik = useFormik({
    initialValues: {
      name: "",
      nationality: "",
      id_type: "",
      id_number: "",
    },
    onSubmit: (values, onSubmitProps) => {
      // handleAddMember(values);
      onSubmitProps.resetForm();
      setIsAddMember(true);
      setDetails(values);
    },
    validate: (values, props) => {
      const errors = {};
      if (values.name == "") {
        errors.name = "Required";
      }
      if (values.id_number == "") {
        errors.id_number = "Required";
      }
      if (values.nationality == "") {
        errors.nationality = "Required";
      }
      if (values.id_type == "") {
        errors.id_type = "Required";
      }
      return errors;
    },
  });

  const resultService = applicationDetails.category
    .split(" ")
    ?.filter((item) => item.toLowerCase() === "bvn");

  useEffect(() => {
    if (
      categoryServiceList.length > 0 &&
      resultService &&
      resultService.length > 0
    ) {
      const selectedService = categoryServiceList.find(
        (list) =>
          list.categoryName === applicationDetails.category?.toLowerCase(),
      );
      if (formik.values.nationality.label === "Nigeria") {
        const idTypeObtained = selectedService?.idTypes?.map((type) => {
          return {
            label: type.name,
            value: type.id,
          };
        });
        setIdType(idTypeObtained);
      } else {
        const idTypeObtained = selectedService.idTypes.map((type) => {
          return {
            label: type.name,
            value: type.id,
          };
        });
        const idTypeObtained1 = idTypeObtained.filter(
          (type) => type.label === "Passport",
        );
        setIdType(idTypeObtained1);
      }
    } else {
      formik.values.id_type = "";
      const idTypeObtained = selectedService.idTypes.map((type) => {
        return {
          label: type.name,
          value: type.id,
        };
      });
      setIdType(idTypeObtained);
    }
  }, [
    categoryServiceList,
    applicationDetails,
    formik.values.nationality.label,
  ]);

  return (
    <>
      <div className="me-0 me-md-3 mb-0 mb-md-3">
        <Label for="Application ID">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          className="inner-header__input"
          placeholder="eg: Jhone Doe"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.name && formik.touched.name ? (
          <div className="error-msg">{formik.errors.name}</div>
        ) : (
          <div className="no-error-msg"></div>
        )}
      </div>
      <div className="me-0 me-md-3 mb-0 mb-md-3">
        <Label for="Nationality">Nationality</Label>
        <Select
          options={countries}
          className="react-select-container"
          classNamePrefix="react-select"
          value={formik.values.nationality}
          onBlur={formik.handleBlur}
          onChange={(e) => {
            formik.setFieldValue("nationality", e);
          }}
        />
        {formik.errors.nationality && formik.touched.nationality ? (
          <div className="error-msg">{formik.errors.nationality}</div>
        ) : (
          <div className="no-error-msg"></div>
        )}
      </div>
      <div className="me-0 me-md-3 mb-0 mb-md-3">
        <Label for="Application ID">ID Type</Label>
        <Select
          options={idType}
          className="react-select-container"
          classNamePrefix="react-select"
          value={formik.values.id_type}
          onChange={(e) => {
            formik.setFieldValue("id_type", e);
          }}
          onBlur={formik.handleBlur}
        />
        {formik.errors.id_type && formik.touched.id_type ? (
          <div className="error-msg">{formik.errors.id_type}</div>
        ) : (
          <div className="no-error-msg"></div>
        )}
      </div>
      <div className="me-0 me-md-3 mb-0 mb-md-3">
        <Label for="id_number">ID Number</Label>
        <Input
          id="id_number"
          name="id_number"
          type="text"
          value={formik.values.id_number}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="inner-header__input"
        />
        {formik.errors.id_number && formik.touched.id_number ? (
          <div className="error-msg">{formik.errors.id_number}</div>
        ) : (
          <div className="no-error-msg"></div>
        )}
      </div>
      <div className="me-0 me-md-3 mb-0 mb-md-3">
        <Button
          className="inner-header__member--btn2 mt-md-0 mb-md-0"
          onClick={formik.handleSubmit}
        >
          Add Member
        </Button>
      </div>

      {isAddMember && (
        <>
          <AddMember
            handleAddMember={handleAddMember}
            isAddMember={isAddMember}
            setIsAddMember={setIsAddMember}
            details={details}
            isLoader={isLoader}
            idType={idType}
          />
        </>
      )}
    </>
  );
};

export default Others;
