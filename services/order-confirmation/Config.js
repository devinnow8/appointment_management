export default {
  appointmentOrder: {
    path: (details) => `center/${details.centreId}/appointment/order`,
  },
  confirmOrder: {
    path: (details) => `appointment/confirm-order`,
  },
};
