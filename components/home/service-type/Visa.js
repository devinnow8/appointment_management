import React from "react";
import { useFormik } from "formik";
import { Col, FormGroup, Label, Input } from "reactstrap";

const Visa = ({ handleContinue, isLoader }) => {
  const formik = useFormik({
    initialValues: {
      application_id: "",
      dob: new Date().toISOString().split("T")[0],
    },
    onSubmit: (values) => {
      handleContinue(values);
    },
    validate: (values, props) => {
      const errors = {};

      if (values.application_id == "") {
        errors.application_id = "Required";
      }
      if (values.dob == "") {
        errors.dob = "Required";
      }
      return errors;
    },
  });

  return (
    <>
      <Col lg={6} xl={6}>
        <div>
          <Label for="application_id">
            Application ID
            <span className="star">*</span>
          </Label>
          <Input
            id="application_id"
            name="application_id"
            placeholder="01234567789"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.application_id}
            className="appointment-form__input"
          />
          {formik.errors.application_id && formik.touched.application_id ? (
            <div className="error-msg">{formik.errors.application_id}</div>
          ) : (
            <div className="no-error-msg"></div>
          )}
        </div>
      </Col>
      <Col lg={6} xl={6}>
        <div>
          <Label for="exampleDate">
            Date of Birth <span>(dd/mm/yyyy)</span>
            <span className="star">*</span>
          </Label>
          <Input
            id="dob"
            name="dob"
            placeholder="date placeholder"
            type="date"
            className="appointment-form__input"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dob}
            max={new Date().toISOString().split("T")[0]}
          />
          {formik.errors.dob && formik.touched.dob ? (
            <div className="error-msg">{formik.errors.dob}</div>
          ) : null}
        </div>
      </Col>
      <Col>
        <FormGroup className="text-md-start text-center ">
          <button
            className={isLoader ? "cont-btn-disabled cont-btn" : "cont-btn"}
            onClick={formik.handleSubmit}
            disabled={isLoader}
          >
            Continue
          </button>
        </FormGroup>
      </Col>
    </>
  );
};

export default Visa;
