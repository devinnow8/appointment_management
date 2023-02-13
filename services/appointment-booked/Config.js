export default {
  appointmentBookedPdf: {
    path: (id) => `appointment-pdf/${id}`,
  },
  appointmentBookedChecklist: {
    path: (details) =>
      `center/${details.centreId}/service/${details.serviceType}/checklist`,
  },
};
