import { useFormik } from "formik";
import React from "react";
import {
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Col,
  Row,
} from "reactstrap";
import Select from "react-select";
import { countries } from "../../../constants";
import Loader from "../../loader";
import { useSelector } from "react-redux";

const AddMember = ({
  handleAddMember,
  details,
  setIsAddMember,
  isAddMember,
  isLoader,
  idType,
}) => {
  const { applicationDetails, memberDetails } = useSelector(
    (state) => state.applicationDetails,
  );

  const formik = useFormik({
    initialValues: {
      name: details.name,
      nationality: details.nationality,
      id_type: details.id_type,
      id_number: details.id_number,
      phone: "",
      email: "",
    },
    onSubmit: (values, onSubmitProps) => {
      if (
        !(memberDetails.length === 5) &&
        !(applicationDetails.country !== values.nationality.label) &&
        !(
          memberDetails.filter((x) => x.applicationId === values.id_number)
            .length > 0
        )
      ) {
        handleAddMember(values);
        onSubmitProps.resetForm();
      } else {
        handleAddMember(values);
      }
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
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.phone) {
        errors.phone = "Required";
      } else if (!/^\+?[0-9](?:[- ]?[0-9]){6,15}$/.test(values.phone)) {
        errors.phone = "Enter correct number with country code";
      }
      return errors;
    },
  });
  return (
    <>
      <Modal
        centered
        isOpen={isAddMember}
        toggle={() => setIsAddMember(!isAddMember)}
        className="add-member__modal"
      >
        <ModalHeader toggle={() => setIsAddMember(!isAddMember)}>
          Add Member
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col lg={6} xl={6}>
              <div>
                <Label for="Application ID">
                  Name <span className="star">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  className="member-input"
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
            </Col>
            <Col lg={6} xl={6}>
              <div>
                <Label for="Nationality">
                  Nationality <span className="star">*</span>
                </Label>
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
            </Col>
            <Col lg={6} xl={6}>
              <div>
                <Label for="Application ID">
                  ID Type <span className="star">*</span>
                </Label>
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
            </Col>
            <Col lg={6} xl={6}>
              <div>
                <Label for="id_number">
                  ID Number <span className="star">*</span>
                </Label>
                <Input
                  id="id_number"
                  name="id_number"
                  type="text"
                  value={formik.values.id_number}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="member-input"
                />
                {formik.errors.id_number && formik.touched.id_number ? (
                  <div className="error-msg">{formik.errors.id_number}</div>
                ) : (
                  <div className="no-error-msg"></div>
                )}
              </div>
            </Col>
            <Col lg={6} xl={6}>
              <div>
                <Label for="email">
                  Email <span className="star">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="eg: @gmail.com"
                  className="member-input"
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
              <div>
                <Label for="phone">
                  Phone No. <span className="star">*</span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="eg: 646454104"
                  className="member-input"
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
            <Col sm={12} className="text-center">
              <div className="mt-0 mt-sm-4">
                <Button
                  className="save-btn mb-5 mt-4 mt-md-0 mb-md-0"
                  onClick={formik.handleSubmit}
                >
                  Save Changes
                  <Loader isLoader={isLoader} />
                </Button>
              </div>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};

export default AddMember;
