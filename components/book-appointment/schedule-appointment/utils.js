export const confirm = (
  setLoaderConfirm,
  setIsConfirm,
  selectedService,
  applicantDetail,
  dispatch,
  setVisaMembers,
  toast,
  setMembers,
  setModal,
  setApplicantDetail,
  visaMembers,
  members,
) => {
  setLoaderConfirm(true);
  setIsConfirm(true);
  if (selectedService === "Visa") {
    const obj = {
      name: applicantDetail.name,
      application_id: applicantDetail.application_id,
      dob: applicantDetail.dob,
    };
    dispatch(setVisaMembers([...visaMembers, obj]));
    setLoaderConfirm(false);
    toast.success("Applicant Addedd Successfully");
  } else {
    const obj = {
      name: applicantDetail.name,
      nationality: applicantDetail.nationality,
      id_type: applicantDetail.id_type,
      id_number: applicantDetail.id_number,
    };
    dispatch(setMembers([...members, obj]));
    setLoaderConfirm(false);
    toast.success("Applicant Addedd Successfully");
  }
  setModal(false);
  setApplicantDetail({
    application_id: "",
    dob: "",
    name: "",
    nationality: "",
    id_type: "",
    id_number: "",
  });
};
