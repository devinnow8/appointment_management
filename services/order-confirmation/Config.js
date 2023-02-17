export default {
  appointmentOrder: {
    path: (details) => `center/${details.centerId}/appointment/order`,
  },
  confirmOrder: {
    path: (details) => `appointment/confirm-order`,
  },
};
