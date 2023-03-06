export default {
  appointmentBookedPdf: {
    path: (id) => `appointment-pdf/${id}`,
  },
  appointmentBookedChecklist: {
    path: (details) =>
      `center/${details.centreId}/category/${details.serviceType}/service/${details.serviceName}/checklist-pdf`,
  },
  appointmentBookedDetails: {
    path: (id) => `appointment/${id}`,
  },
};
