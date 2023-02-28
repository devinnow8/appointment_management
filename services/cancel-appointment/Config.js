export const Config = (details) => {
  return {
    cancelAppointment: {
      path: `appointment/${details.appointmentId}`,
    },
  };
};
