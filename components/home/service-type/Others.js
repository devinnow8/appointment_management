import React from "react";
import { useFormik } from "formik";
import { Col, Label, Input } from "reactstrap";
import Select from "react-select";
import { idType, countries } from "../../../constants/index";
import Loader from "../../loader";

const Others = ({ handleContinue, isLoader }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
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
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.phone) {
        errors.phone = "Required";
      } else if (/^[6-9]\d{9}$/.test(values.phone)) {
        errors.phone = "Invalid Phone Number";
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
        <div className="mb-0">
          <Label for="name">
            Name <span className="star">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="eg: John Doe"
            className="appointment-form__input"
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
      </Col>
      <Col lg={6} xl={6}>
        <div>
          <Label for="nationality">
            Nationality <span className="star">*</span>
          </Label>
          <Select
            options={countries}
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
          ) : (
            <div className="no-error-msg"></div>
          )}
        </div>
      </Col>
      <Col lg={6} xl={6}>
        <div>
          <Label for="id_type">
            ID Type
            <span className="star"> *</span>
          </Label>
          <Select
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
          ) : (
            <div className="no-error-msg"></div>
          )}
        </div>
      </Col>

      <Col lg={6} xl={6}>
        <div>
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
          {formik.errors.id_number && formik.touched.id_number ? (
            <div className="error-msg">{formik.errors.id_number}</div>
          ) : (
            <div className="no-error-msg"></div>
          )}
        </div>
      </Col>
      <Col lg={6} xl={6}>
        <div className="mb-0">
          <Label for="email">
            Email <span className="star">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="text"
            placeholder="eg: @gmail.com"
            className="appointment-form__input"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="error-msg">{formik.errors.email}</div>
          ) : (
            <div className="no-error-msg"></div>
          )}
        </div>
      </Col>
      <Col lg={6} xl={6}>
        <div className="mb-0">
          <Label for="phone">
            Phone No. <span className="star">*</span>
          </Label>
          <Input
            id="phone"
            name="phone"
            type="text"
            placeholder="eg: 646454104"
            className="appointment-form__input"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="error-msg">{formik.errors.phone}</div>
          ) : (
            <div className="no-error-msg"></div>
          )}
        </div>
      </Col>
      <Col>
        <div className="text-md-start text-center ">
          <button
            className={isLoader ? "cont-btn-disabled cont-btn" : "cont-btn"}
            onClick={formik.handleSubmit}
            disabled={isLoader}
          >
            Continue
            <Loader isLoader={isLoader} />
          </button>
        </div>
      </Col>
    </>
  );
};

export default Others;
