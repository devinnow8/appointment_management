import { useFormik } from "formik";
import React from "react";
import { Label, Input, Button } from "reactstrap";

const Visa = ({ handleAddMember }) => {
  const formik = useFormik({
    initialValues: {
      application_id: "",
      dob: "",
    },
    onSubmit: (values) => {
      handleAddMember(values);
    },
    validate: (values, props) => {
      const errors = {};

      if (values.application_id == "") {
        errors.application_id = "Required";
      } /*  */
      if (values.dob == "") {
        errors.dob = "Required";
      }
      return errors;
    },
  });
  return (
    <>
      <div className="me-0 me-md-3 mb-3 mb-md-0">
        <Label for="Application ID">Application ID</Label>
        <Input
          id="application_id"
          name="application_id"
          placeholder="01234567789"
          type="text"
          className="inner-header__input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.application_id}
        />
        {formik.errors.application_id && formik.touched.application_id ? (
          <div className="error-msg">{formik.errors.application_id}</div>
        ) : null}
      </div>
      <div className="me-0 me-md-3 mb-4 mb-md-0">
        <Label for="exampleDate">Date of Birth</Label>
        <Input
          id="dob"
          name="dob"
          placeholder="date placeholder"
          type="date"
          className="inner-header__input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.dob}
        />
        {formik.errors.dob && formik.touched.dob ? (
          <div className="error-msg">{formik.errors.dob}</div>
        ) : null}
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

export default Visa;
