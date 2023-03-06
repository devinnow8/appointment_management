export default {
  appointmentBookedPdf: {
    path: (id) => `appointment-pdf/${id}`,
  },
  appointmentBookedChecklist: {
    path: (details) =>
      `center/${details.centreId}/category/${details.serviceType}/checklist-pdf`,
  },
  appointmentBookedDetails: {
    path: (id) => `appointment/${id}`,
  },
  appointmentTypeBookedChecklist: {
    path: (details) =>
      `center/${details.centreId}/category/${details.serviceType}/service/${details.serviceName}/checklist-pdf`,
  },
};
