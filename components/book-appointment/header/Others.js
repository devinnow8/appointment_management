import { useFormik } from "formik";
import React from "react";
import { Label, Input, Button } from "reactstrap";
import Select from "react-select";
import { idType, nationalityOptions } from "../../../constants";

const Others = ({ handleAddMember }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      nationality: "",
      id_type: "",
      id_number: "",
    },
    onSubmit: (values, onSubmitProps) => {
      handleAddMember(values);
      onSubmitProps.resetForm();
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
  return (
    <>
      <div className="me-0 me-md-3 mb-3 mb-md-0">
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
      <div className="me-0 me-md-3 mb-3 mb-md-0">
        <Label for="Nationality">Nationality</Label>
        <Select
          options={nationalityOptions}
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
      <div className="me-0 me-md-3 mb-3 mb-md-0">
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
      <div className="me-0 me-md-3 mb-3 mb-md-0">
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
      <Button
        className="inner-header__member--btn"
        onClick={formik.handleSubmit}
      >
        Add Member
      </Button>
    </>
  );
};

export default Others;
