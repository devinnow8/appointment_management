import { useFormik } from "formik";
import React from "react";
import { Label, Input, Button } from "reactstrap";

const Visa = ({ handleAddMember }) => {
  const formik = useFormik({
    initialValues: {
      application_id: "",
      dob: new Date().toISOString().split("T")[0],
    },
    onSubmit: (values, onSubmitProps) => {
      handleAddMember(values);
      onSubmitProps.resetForm();
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
      <div className="me-0 me-md-3 mb-md-0">
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
        ) : (
          <div className="no-error-msg"></div>
        )}
      </div>
      <div className="me-0 me-md-3 mb-md-0">
        <Label for="exampleDate">
          Date of Birth <span>(dd/mm/yyyy)</span>
        </Label>
        <Input
          id="dob"
          name="dob"
          placeholder="date placeholder"
          type="date"
          className="inner-header__input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.dob}
          max={new Date().toISOString().split("T")[0]}
        />
        {formik.errors.dob && formik.touched.dob ? (
          <div className="error-msg">{formik.errors.dob}</div>
        ) : (
          <div className="no-error-msg"></div>
        )}
      </div>
      <Button
        className="inner-header__member--btn2"
        onClick={formik.handleSubmit}
      >
        Add Member
      </Button>
    </>
  );
};

export default Visa;
