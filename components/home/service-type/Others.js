import React from "react";
import { useFormik } from "formik";
import { Col, FormGroup, Label, Input } from "reactstrap";
import Select from "react-select";
import { nationalityOptions, idType } from "../../../constants/index";

const Others = ({ handleContinue }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      nationality: "",
      id_type: "",
      id_number: "",
    },
    onSubmit: (values) => {
      handleContinue(values);
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
      <Col lg={6} xl={6}>
        <FormGroup>
          <Label for="name">
            Name <span className="star">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="eg: Jhone Doe"
            className="appointment-form__input"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="error-msg">{formik.errors.name}</div>
          ) : null}
        </FormGroup>
      </Col>
      <Col lg={6} xl={6}>
        <FormGroup>
          <Label for="nationality">
            Nationality <span className="star">*</span>
          </Label>
          <Select
            // onChange={(e) => handle_select(e, "nationality")}
            options={nationalityOptions}
            className="react-select-container"
            name="nationality"
            classNamePrefix="react-select"
            value={formik.values.nationality}
            onBlur={formik.handleBlur}
            onChange={(e) => {
              formik.setFieldValue("nationality", e);
            }}
          />
          {formik.errors.nationality && formik.touched.nationality ? (
            <div className="error-msg">{formik.errors.nationality}</div>
          ) : null}
        </FormGroup>
      </Col>
      <Col lg={6} xl={6}>
        <FormGroup>
          <Label for="id_type">
            ID Type
            <span className="star"> *</span>
          </Label>
          <Select
            // onChange={(e) => handle_select(e, "id_type")}
            options={idType}
            className="react-select-container"
            classNamePrefix="react-select"
            name="id_type"
            value={formik.values.id_type}
            onChange={(e) => {
              formik.setFieldValue("id_type", e);
            }}
            onBlur={formik.handleBlur}
          />
          {formik.errors.id_type && formik.touched.id_type ? (
            <div className="error-msg">{formik.errors.id_type}</div>
          ) : null}
        </FormGroup>
      </Col>
      <Col lg={6} xl={6}>
        <FormGroup>
          <Label for="id_number">
            ID Number
            <span className="star"> *</span>
          </Label>
          <Input
            id="id_number"
            name="id_number"
            type="text"
            className="appointment-form__input"
            value={formik.values.id_number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.id_type && formik.touched.id_type ? (
            <div className="error-msg">{formik.errors.id_type}</div>
          ) : null}
        </FormGroup>
        <FormGroup className="text-md-start text-center ">
          <div className="cont-btn" onClick={formik.handleSubmit}>
            Continue
          </div>
        </FormGroup>
      </Col>
    </>
  );
};

export default Others;
